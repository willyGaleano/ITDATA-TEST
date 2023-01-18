export const EnvConfiguration = () => ({
  MONGO_URI: process.env.MONGODB_URL,
  JWT_SECRET: process.env.SECRET_KEY,
});
