export const getEnv = () => ({
  JWT_SECRET: process.env.JWT_SECRET!,
  RUN_TEST_ON_MODELS: process.env.RUN_TEST_ON_MODELS === "true" ? true : false,
  DATA_BASE_URL: process.env.DATA_BASE_URL!,
});
