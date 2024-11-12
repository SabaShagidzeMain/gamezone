// next-intl.config.js
module.exports = {
  locales: ["en", "ge"], // List of supported locales
  defaultLocale: "en", // Default locale
  // Update the path to point to the locales folder inside src
  messages: {
    en: "./messages/en.json",
    ge: "./messages/ge.json",
  },
};
