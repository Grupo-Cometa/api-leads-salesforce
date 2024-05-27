export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  isGlobal: true,
  envFilePath: '.env',
});
