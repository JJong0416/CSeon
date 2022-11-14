const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://k7a606.p.ssafy.io",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/ws-stomp",
  //   createProxyMiddleware({ target: "http://localhost:7070", ws: true })
  // );
};
