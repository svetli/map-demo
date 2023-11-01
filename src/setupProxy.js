const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://services.speedy.bg/officesmap_v2/classBuilder.php',
      changeOrigin: true,
    })
  );
};