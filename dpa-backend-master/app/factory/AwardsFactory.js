const Awards = require('../models/entities/Awards');
const Users = require('../models/entities/Users');
const Transactions = require('../models/entities/Transactions');

const fileContentToObject = (file) => {
  let headers = [];

  let lines = file.data.toString().split('\r').join('').split('\n');
  lines = lines.map((row, i) => {
    if (i === 0) {
      headers = row.split(';');
      return null;
    }

    const obj = Object();
    row.split(';').forEach((value, index) => {
      obj[headers[index]] = value;
    });
    return obj;
  });

  return lines.filter((v) => v !== null);
};

const groupLinesByUser = (lines, filename) => {
  const lineByUser = {};
  lines.forEach((line) => {
    if (!line.email) { return; }
    if (!(line.email in lineByUser)) {
      lineByUser[line.email] = {
        awards: [],
        profit: 0,
      };
    }

    lineByUser[line.email].awards.push({
      filename,
      email: line.email,
      name: line.name,
      description: line.description,
      expected: line.expected,
      accomplished: line.accomplished,
      related: line.related,
      profit: Number(line.profit),
    });

    lineByUser[line.email].profit += Number(line.profit);
  });
  return lineByUser;
};

const executeTransaction = async (userEmail, data) => {
  try {
    const user = await Users.findOne({ where: { email: userEmail } });
    const wallet = await user.getWallet();

    data.awards.map(async (awardData) => {
      const award = await Awards.create(awardData);
      const transaction = Transactions.build(awardData);
      transaction.walletId = wallet.id;
      transaction.awardId = award.id;
      transaction.totalAmount = 1;
      transaction.totalPrice = awardData.profit;
      await transaction.save();
    });

    wallet.balance += Number(data.profit);
    await wallet.save();
    return true;
  } catch (error) {
    console.error('Failure to process user awards:', data, error);
    return false;
  }
};

module.exports = {
  fileContentToObject,
  groupLinesByUser,
  executeTransaction,
};
