import path from 'path';
import webpack from 'webpack';
import { createFsFromVolume, Volume } from 'memfs';

/**
 * @param {string} fixture fullpath
 */
export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: fixture,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.ejs$/,
        use: {
          loader: path.resolve(__dirname, '../../index.js'),
          options,
        }
      }]
    }
  });

  compiler.outputFileSystem = createFsFromVolume(new Volume());
  compiler.outputFileSystem.join = path.join.bind(path);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) reject(err);
      if (stats.hasErrors()) reject(stats.toJson().errors);

      resolve(stats);
    });
  });
};
