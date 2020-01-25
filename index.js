/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Long Wei
*/
const loaderUtils = require('loader-utils');
const ejs = require('ejs');
const UglifyJS = require('uglify-js');
const htmlmin = require('html-minifier');
const path = require('path');
const packageJson = require('./package.json');
const loaderName = packageJson.name || "compile-ejs-loader";
const babel = require("@babel/core");

function throwError(message) {
  const error = new Error()
  error.name = loaderName;
  error.message = error.name + '\n\n' + message + '\n';
  error.stack = false;
  console.error(error);
}

module.exports = function(source) {
  const options = loaderUtils.getOptions(this) || {};

  if (!this.webpack) {
    throwError('This loader is only usable with webpack');
  }

  this.cacheable(true);

  options.client = true;
  options.filename = path.relative(process.cwd(), this.resourcePath);

  if(options.htmlmin) {
    source = htmlmin.minify(source, options['htmlminOptions'] || {});
  }
  if (options.babelOptions != null) {
    console.log("[WARNING] be force strict=true when use babelOptions.")
    options.strict = true;
  }
  var template = ejs.compile(source, options);
  var minimize = this._compiler.options.optimization.minimize;
  if (options.babelOptions != null) {
    template = babel.transformSync(template.toString(), options.babelOptions).code;
  }

  if (!minimize && options.beautify !== false) {
    var ast = UglifyJS.parse(template.toString());
    ast.figure_out_scope();
    template = ast.print_to_string({beautify: true});
  }

  return 'module.exports = ' + template;
}
