export const getEnv = () => ({
  JWT_SECRET: process.env.JWT_SECRET! ?? "some secret",
  DATA_BASE_URL: process.env.DATA_BASE_URL! ?? "mongodb://localhost:27017/grocery_app",
  ClOUD_NAME: process.env.CLOUD_NAME ?? "duqmb1rjh",
  API_KEY: process.env.API_KEY ?? "155312536733783",
  API_SECRET: process.env.API_SECRET ?? "TW2OHvIrKw5hCkpqY85GeLN9Tkc",
});
