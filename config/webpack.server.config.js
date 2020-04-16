const paths = require('./paths');
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const nodeExternals = require('webpack-node-externals');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  mode: 'production',

  entry: paths.ssrIndexJs,

  target: 'node',

  output: {
    path: paths.ssrBuild,
    filename: 'server.js',
    chunkFilename: 'js/[name].chunk.js',
    publicPath: paths.publicUrlOrPath,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.mjs', '.jsx'],
  },

  externals: [nodeExternals()],

  plugins: [
    new webpack.DefinePlugin(env.stringified),
  ],

  module: {
    rules: [{
      oneOf: [{
        test: /\.(js|mjs|jsx)$/,
        include: paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
          customize: require.resolve(
            'babel-preset-react-app/webpack-overrides',
          ),
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent:
                      '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                  },
                },
              },
            ],
          ],
          cacheDirectory: true,
          cacheCompression: false,
          compact: false,
        },
      }, {
        test: cssRegex,
        exclude: cssModuleRegex,
        loader: require.resolve('css-loader'),
        options: {
          onlyLocals: true,
        },
      }, {
        test: cssModuleRegex,
        loader: require.resolve('css-loader'),
        options: {
          onlyLocals: true,
          modules: true,
          getLocalIdent: getCSSModuleLocalIdent,
        },
      }, {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [{
          loader: require.resolve('css-loader'),
          options: {
            onlyLocals: true,
          },
        }, 'sass-loader'],
      }, {
        test: sassModuleRegex,
        use: [{
          loader: require.resolve('css-loader'),
          options: {
            onlyLocals: true,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent,
          },
        }, 'sass-loader'],
      }, {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          emitFile: false,
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }, {
        loader: require.resolve('file-loader'),
        exclude: [/\.(js|mjs|jsx)$/, /\.html$/, /\.json$/],
        options: {
          emitFile: false,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }],
    }],
  },
};