const { BlockBlobClient } = require('@azure/storage-blob');
const getStream = require('into-stream');
const env = require('../config/environment');

const getBlobName = (originalName) => {
  const identifier = Math.random().toString().replace(/0\./, '');
  return `${identifier}-${originalName}`;
};

const uploadFile = async (file) => {
  const url = `https://${env.storage.name}.blob.core.windows.net/${env.storage.container}`;
  const blobName = getBlobName(file.name);
  const blobService = new BlockBlobClient(
    env.storage.connectionString,
    env.storage.container,
    blobName,
  );
  const stream = getStream(file.data);
  const streamLength = file.size;

  await blobService.uploadStream(stream, streamLength);

  return `${url}/${blobName}`;
};

module.exports = {
  uploadFile,
};
