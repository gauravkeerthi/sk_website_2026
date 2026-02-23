module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/public": "/" });

  eleventyConfig.addFilter("activeNav", function (navPath, currentUrl) {
    if (!navPath || !currentUrl) return "";
    if (navPath === "/") return currentUrl === "/" ? "active" : "";
    return currentUrl.startsWith(navPath) ? "active" : "";
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input:   "src",
      output:  "output",
      includes: "_includes",
      layouts:  "_includes/layouts",
    },
    htmlTemplateEngine: "njk",
  };
};
