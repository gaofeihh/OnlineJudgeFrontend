module.exports = {
  "devServer": {
    "proxy": {
      "/api": {
        "target": "http://127.0.0.1:8080/api/",
        "ws": true,
        "changeOrigin": true,
        "pathRewrite": {
          "^/api": ""
        }
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: (config) => {
    config
        .plugin('html')
        .tap((args) => {
            args[0].title = '山东工商学院ACM';
            return args;
        });
}
}