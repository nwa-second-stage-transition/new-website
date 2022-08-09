const { DateTime } = require("luxon");


module.exports = function (eleventyConfig) {

    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy({ "src/_assets": "assets" });
    eleventyConfig.addPassthroughCopy("./src/robot.txt");
    eleventyConfig.addPassthroughCopy("./src/admin/config.yml");
    eleventyConfig.addPassthroughCopy("./src/sitemap.xsl");
    
    eleventyConfig.addFilter("unSlugify", (str) => {
      const arr = str.split("-");

      for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

      } return arr.join(" ");
    });
    eleventyConfig.addFilter("postDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });
    return {
      "dataTemplateEngine": "njk",
      "markdownTemplateEngine": "njk",
      dir: {
        input: "src",
        output: "docs",
        // ⚠️ These values are both relative to your input directory.
        includes: "_includes",
        layouts: "_layouts"
      },
    };
  };
// new addition
const Purgecss = require('purgecss')
const { JSDOM } = require('jsdom')
const CleanCSS = require("clean-css");

//array of css files to combine
const cssFiles = ['./src/_includes/custom.css','./src/css/bootstrap51.css']

// cleanCSSOptions for minification and inlining css, will fix duplicate media queries
const cleanCSSOptions = {
  level: {
    2: {
      all: true, 
      removeDuplicateRules: true 
    }
  }
}

//function to insert css into the DOM
const insertCss = (html, css) => {
  const dom = new JSDOM(html)
  const { document } = dom.window

  let head = document.getElementsByTagName('head')[0];
  let style = document.createElement("style");
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);

  return dom.serialize()
}

module.exports = function (eleventyConfig) {  
  eleventyConfig.addTransform("purgeCSS", function(content, outputPath){
    if( outputPath.endsWith(".html") ) {
      console.log(outputPath)
      const purgecss = new Purgecss({
        content: [outputPath],
        css: cssFiles
      })
      const purgecssResult = purgecss.purge()
      let cssMerge = ''
      if(purgecssResult.length>0){
        for (let i = 0; i < purgecssResult.length; i++){
          cssMerge= cssMerge.concat(purgecssResult[i].css)
        }
        const cssMin = new CleanCSS(cleanCSSOptions).minify(cssMerge).styles
        return insertCss(content, cssMin)
      }
    }
    return content

  })
}