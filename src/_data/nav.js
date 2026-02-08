// Single source of truth for all page URLs.
// main:         items shown in the header navigation bar
// footerGroups: categorized groups shown in the fat footer
// all:          flat list of every page (for sitemaps, etc.)

const pages = {
  home:              { title: "Home",               url: "/" },
  why:               { title: "Why?",               url: "/why/" },
  airfoilDesign:     { title: "Airfoil Design",     url: "/airfoil-design/" },
  applications:      { title: "Applications",       url: "/applications/" },
  clients:           { title: "Clients",            url: "/clients/" },
  contact:           { title: "Contact",            url: "/contact/" },
  designIntegration: { title: "Design Integration", url: "/design-integration/" },
  epplerCode:        { title: "Eppler Code",        url: "/eppler-code/" },
  links:             { title: "Links",              url: "/links/" },
  publications:      { title: "Publications",       url: "/publications/" },
  resume:            { title: "Resume",             url: "/resume/" },
  specifications:    { title: "Specifications",     url: "/specifications/" },
  windTunnels:       { title: "Wind Tunnels",       url: "/wind-tunnels/" },
};

module.exports = {
  // Header nav — maps to the buyer's journey:
  // Awareness (Home) → Interest (Why?) → Evaluation (services,
  // expertise, credentials) → Decision (Contact)
  main: [
    pages.home,
    pages.why,
    pages.airfoilDesign,
    pages.applications,
    pages.windTunnels,
    pages.epplerCode,
    pages.resume,
    pages.publications,
    pages.contact,
  ],

  // Footer nav — all pages organized by category
  footerGroups: [
    {
      heading: "About",
      items: [pages.why, pages.resume, pages.clients],
    },
    {
      heading: "Services",
      items: [
        pages.airfoilDesign,
        pages.applications,
        pages.windTunnels,
      ],
    },
    {
      heading: "Resources",
      items: [
        pages.epplerCode,
        pages.designIntegration,
        pages.specifications,
        pages.publications,
        pages.links,
      ],
    },
  ],

  // Flat list of every page (for sitemaps, mobile menu, etc.)
  all: Object.values(pages),
};
