const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3000",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/ws-stomp",
  //   createProxyMiddleware({ target: "http://localhost:7070", ws: true })
  // );
};
