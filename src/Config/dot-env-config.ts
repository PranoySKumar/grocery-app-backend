export const getEnv = () => ({
  JWT_SECRET: process.env.JWT_SECRET! ?? "some secret",
  DATA_BASE_URL: /* process.env.DATA_BASE_URL!  ?? */ "mongodb://localhost:27017/grocery_app",
});
