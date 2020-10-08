module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
    "airbnb-base"
  ],
  "plugins": [
    "vue",
    "jest"
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "indent": ["error", 2],
    "comma-dangle": 0,
    "template-curly-spacing": 0,
    "arrow-parens": 0,
    "linebreak-style": 0,
    "semi": [2, "never"],
    "vue/max-attributes-per-line": "off",
    "vue/component-name-in-template-casing": 0,
    "import/no-extraneous-dependencies": 0,
    "no-underscore-dangle": 0,
    "vue/no-v-html": 0,
    "no-param-reassign": 0,
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "no-debugger": 0
  },
};