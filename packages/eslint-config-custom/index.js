module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react-hooks/exhaustive-deps": "warn",
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ["*.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    babelOptions: {
      // eslint-disable-next-line no-undef
      presets: [require.resolve("next/babel")],
    },
  },
};
