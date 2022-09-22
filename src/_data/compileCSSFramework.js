const fs = require("fs");
const MinifyCSS = require("clean-css");
const postCSS = require('postcss');
const purgeCSS = require('@fullhuman/postcss-purgecss');

module.exports = async function() {
  // You must create the folder structure first.
  // WriteFile does not create files if parent folders are missing
  if (!fs.existsSync('docs')){fs.mkdirSync('docs');}
  if (!fs.existsSync('docs/css')){fs.mkdirSync('docs/css');}

  // Create a custom, purged, version of Bootstrap
  const sourceCSS = "src/css/_bootstrap.css";
  const destinationCSS = "docs/css/custom_bootstrap.css";
  // Add in your file types here
  const sourceContent = [
    'src/**/*.njk',
    'src/**/*.html',
    'src/**/*.md',
    'src/**/*.liquid',
    'src/**/*.js'
  ];

  fs.readFile(sourceCSS, (err, css) => {
    postCSS([
      // Purge CSS will scan through and remove the styles 
      // that aren't in your project
      purgeCSS({
        content: sourceContent,
        variables: true,
        keyframes: true
      })
    ])
    .process(css, {
      from: sourceCSS,
      to: destinationCSS
    })
    .then(result => {
      // Combine with Reboot
      let newCSS = result.css;
      let rebootCSS = fs.readFileSync('src/css/_reboot.css');
      let allCSS = newCSS + rebootCSS;

      // Minify
      let compiledCSS = new MinifyCSS().minify(allCSS)['styles'];

      // Save
      fs.writeFileSync(destinationCSS, compiledCSS, {encoding:"utf8"})
    })
    .catch(error => {
      console.log(error)
    });
  })
};
