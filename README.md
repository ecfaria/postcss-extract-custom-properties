# PostCSS Custom Properties Extractor

[PostCSS] plugin to extract custom css properites into a JS file.

[postcss]: https://github.com/postcss/postcss

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-extract-custom-properties
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-custom-properties-extractor'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
