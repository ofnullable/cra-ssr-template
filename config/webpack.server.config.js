const paths = require('./paths');
const webpack = require('webpack');
const getClientEnvironment = require('./env');
const nodeExternals = require('webpack-node-externals');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

// const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
// const fs = require('fs');
// const path = require('path');
// const resolve = require('resolve');
// const PnpWebpackPlugin = require('pnp-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
// const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const safePostCssParser = require('postcss-safe-parser');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
// const modules = require('./modules');
// const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
// const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
// const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
//
// const postcssNormalize = require('postcss-normalize');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

const styleRules = {
  css(isModule) {
    return isModule ? {
      test: cssModuleRegex,
      use: [{
        loader: require.resolve('css-loader'),
        options: {
          onlyLocals: true,
          modules: true,
          getLocalIdent: getCSSModuleLocalIdent,
        },
      }],
    } : {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: [{
        loader: require.resolve('css-loader'),
        options: {
          onlyLocals: true,
        },
      }],
    };
  },
  scss(isModule) {
    return isModule ? {
      test: sassModuleRegex,
      use: [{
        loader: require.resolve('css-loader'),
        options: {
          onlyLocals: true,
          modules: true,
          getLocalIdent: getCSSModuleLocalIdent,
        },
      }, 'sass-loader'],
    } : {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: [{
        loader: require.resolve('css-loader'),
        options: {
          onlyLocals: true,
        },
      }, 'sass-loader'],
    };
  },
};

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