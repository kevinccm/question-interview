const proxy = require("http-proxy-middleware");

// reference -> https://www.youtube.com/watch?v=hxyp_LkKDdk&feature=youtu.be
module.exports = function(app) {
    // Lists
    app.use(
        proxy("/api/v1/hk/ios-apps/top-free/all/100/explicit.json", {
            target: "https://rss.itunes.apple.com",
            changeOrigin: true
        })
    );
    // recommendation
    app.use(
        proxy("/api/v1/hk/ios-apps/top-grossing/all/10/explicit.json", {
            target: "https://rss.itunes.apple.com",
            changeOrigin: true
        })
    );
    // get star + review
    app.use(
        proxy("/hk/lookup", {
            target: "https://itunes.apple.com",
            changeOrigin: true
        })
    );
};
