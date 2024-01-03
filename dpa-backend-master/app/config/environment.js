module.exports = {
  app: {
    env: process.env.NODE_ENV || 'production',
    url: process.env.APP_URL,
    port: Number(process.env.PORT) || 3000,
  },
  auth: {
    secret: process.env.AUTH_SECRET,
  },
  storage: {
    name: process.env.STORAGE_NAME,
    container: process.env.STORAGE_CONTAINER,
    accessKey: process.env.STORAGE_ACCESS_KEY,
    connectionString: process.env.STORAGE_CONNECTION_STRING,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    dialect: process.env.DATABASE_DIALECT,
    ssl: (process.env.DATABASE_SSL === 'true'),
    cloudsql: (process.env.DATABASE_CLOUDSQL === 'true'),
  },
  sendEmail: {
    apiKey: process.env.EMAIL_API_KEY,
    from: process.env.EMAIL_FROM,
  },
  azure: {
    host: process.env.AZURE_HOST,
    username: process.env.AZURE_USERNAME,
    password: process.env.AZURE_PASSWORD,
    clientId: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
  },
  powerbi: {
    host: process.env.POWERBI_HOST,
  },
};
