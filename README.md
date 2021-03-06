# compile-ejs-loader for webpack

[webpack](https://webpack.js.org/) loader use to compile [ejs](https://github.com/mde/ejs) templates.

## Installation

`npm install compile-ejs-loader`

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

``` javascript
var template = require("compile-ejs-loader!./file.ejs");
// => returns the template function compiled with ejs templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data

// Child Templates
// path is relative to where webpack is being run
<%- include templates/child -%>
```

## Options

besides [ejs compile options](https://github.com/mde/ejs#options), you can add these addtion options:

`beautify` — enable or disable uglify-js beautify of template ast

`compileDebug` — see ejs compileDebug option

`htmlmin` — see [htmlminify section](#htmlminify)

`htmlminOptions` - See [all htmlminify options reference](https://github.com/kangax/html-minifier#options-quick-reference)

## webpack config example

```javascript
module: {
  rules: [{
    test: /\.ejs$/,
    loader: 'compile-ejs-loader',
    options: {
      'htmlmin': true,
      'htmlminOptions': {
        removeComments: true
      }
    }
  }]
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
