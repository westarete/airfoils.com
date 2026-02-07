module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/css/style.css");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
  };
};
