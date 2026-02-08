module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/pdf");
  eleventyConfig.addPassthroughCopy("src/css/style.css");

  // Add pathPrefix as a global data variable for templates
  eleventyConfig.addGlobalData("pathPrefix", process.env.PATH_PREFIX || "/");

  // Current year for copyright notices (computed at build time — stays
  // current as long as the site is rebuilt at least once per year, which
  // CI/CD handles on every push to main)
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
};
