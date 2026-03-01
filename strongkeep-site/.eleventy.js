module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/public": "/" });
  eleventyConfig.addPassthroughCopy({ "game": "game" });

  // Create a collection for news articles, sorted by date (newest first)
  eleventyConfig.addCollection("news", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/news/*.njk")
      .filter(item => item.data.type === "article")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Create a collection for case studies, sorted by date (newest first)
  eleventyConfig.addCollection("caseStudies", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/case-studies/*.njk")
      .filter(item => item.data.type === "case-study")
      .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

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
