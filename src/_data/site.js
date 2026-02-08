// Site-wide metadata for SEO, structured data, and social sharing.
//
// SITE_URL should be the full base URL of the deployed site (no trailing
// slash). When going live on the custom domain, change the default to
// "https://airfoils.com" and remove the PATH_PREFIX env var from CI.

const pathPrefix = process.env.PATH_PREFIX || "/";
const origin = "https://westarete.github.io";
const siteUrl =
  process.env.SITE_URL ||
  (pathPrefix === "/" ? origin : `${origin}${pathPrefix.replace(/\/$/, "")}`);

module.exports = {
  name: "Airfoils, Incorporated",
  url: siteUrl,
  tagline: "Only The Best Is Good Enough",
  description:
    "Airfoils, Incorporated specializes in airfoil design, analysis, " +
    "and wind-tunnel testing for wind turbines, fans, and aircraft.",
  author: {
    name: "Dan M. Somers",
    email: "dan@airfoils.com",
    jobTitle: "President",
    url: siteUrl + "/resume/",
  },
  address: {
    street: "122 Rose Drive",
    city: "Port Matilda",
    state: "PA",
    zip: "16870-7535",
    country: "US",
  },
  phone: "+1-814-357-0500",
  fax: "+1-814-357-0357",
};
