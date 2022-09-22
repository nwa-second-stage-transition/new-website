const { DateTime } = require("luxon");


module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ 
    "src/css/bootstrap.css": "css/bootstrap.css",
    "src/css/custom.css": "css/custom.css",
  });
    eleventyConfig.addPassthroughCopy({ "src/img": "img" });
    eleventyConfig.addPassthroughCopy({ "src/js": "js" });
    eleventyConfig.addPassthroughCopy({ "src/zohoverify": "zohoverify" });
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