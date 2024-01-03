const responseFormat = {
  status: true,
  message: 'OK',
};

const defaultFailure = (res, optional, httpcode, httpname) => {
  const responseData = JSON.parse(JSON.stringify(responseFormat));
  responseData.status = false;
  responseData.message = optional.message || httpname;
  responseData.error = optional.errors || [];
  if (responseData.error.length > 0 && responseData.error[0].includes(',\n')) {
    responseData.error = responseData.error[0].split(',\n');
  }
  return res.status(httpcode).json(responseData);
};

// HTTP Code 200
const OK = (res, optional = {}) => {
  const responseData = JSON.parse(JSON.stringify(responseFormat));
  responseData.message = optional.message || 'OK';
  responseData.data = optional.data || null;
  return res.status(200).json(responseData);
};

// HTTP Code 400
const BadRequest = (res, optional = {}) => defaultFailure(res, optional, 400, 'BadRequest');

// HTTP Code 401
const Unauthorized = (res, optional = {}) => defaultFailure(res, optional, 401, 'Unauthorized');

// HTTP Code 404
const NotFound = (res, optional = {}) => defaultFailure(res, optional, 404, 'Not Found');

// HTTP Code 500
const InternalServerError = (res, optional = {}) => defaultFailure(res, optional, 500, 'Internal Server Error');

module.exports = {
  OK,
  BadRequest,
  Unauthorized,
  NotFound,
  InternalServerError,
};
