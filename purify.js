// purify.js
const purify = require("purify-css")
const htmlFiles = ['./src/index.njk'];
const cssFiles = ['./src/css/bootstrap.css'];
const opts = {
    output: 'purified.css'
};
purify(htmlFiles, cssFiles, opts, function (res) {
    log(res);
});