module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            ie: "11"
          },
          useBuiltIns: false,
          modules: false,
          loose: true
        }
      ]
    ]
  };
};
