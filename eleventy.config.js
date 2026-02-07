module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css/style.css");

  // Add pathPrefix as a global data variable for templates
  eleventyConfig.addGlobalData("pathPrefix", process.env.PATH_PREFIX || "/");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
};
