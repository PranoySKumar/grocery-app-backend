export const getEnv = () => ({
  JWT_SECRET: process.env.JWT_SECRET!,
  DATA_BASE_URL: process.env.DATA_BASE_URL!,
});
