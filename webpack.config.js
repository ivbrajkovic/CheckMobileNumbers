const { resolve, join } = require('path');

const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = env => {
  const { NODE_ENV = 'development', analyze = false, devtools = 'eval' } =
    env || {};

  /**
   * Envoirement mode
   */
  const devMode = NODE_ENV === 'development';

  console.log('Mode:', NODE_ENV);
  console.log('Devtools:', (devMode && devtools) || false);
  console.log('Boundle analyze:', analyze);

  /**
   * Minimizer
   */
  const minimizer = devMode
    ? []
    : [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})];

  /**
   * Plugins
   */
  const plugins = [
    new HtmlWebpackPlugin({
      // template: './client/src/index.html',
      // filename: '.dist/index.html',
      template: resolve('.', 'client/src', 'template.html'),
      filename: join('.', 'index.html'), // ATTENTION
      minify: devMode
        ? {}
        : {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true
          }
    })
  ];
  !devMode && plugins.unshift(new CleanWebpackPlugin());
  !devMode &&
    plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        // filename: "[name].[contenthash].css",
        filename: 'style.[contenthash].css',
        chunkFilename: '[id].[contenthash].css'
      })
    );
  analyze && plugins.push(new BundleAnalyzerPlugin());

  /**
   * Autoprefixer
   */
  const autoprefixer = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [require('autoprefixer')]
    }
  };

  return {
    mode: devMode ? 'development' : 'production',

    entry: {
      main: resolve(__dirname, 'client/src', 'index.js')
      // fa: './src/vendor/fa.js'
    },

    output: {
      filename: devMode ? '[name].bundle.js' : '[name].[contentHash].js',
      // path: resolve(__dirname, 'dist')
      path: resolve(__dirname, '.', 'client/dist') // ATTENTION
    },

    devtool: (devMode && devtools) || false,

    optimization: {
      usedExports: true,
      minimizer: minimizer,
      splitChunks: {
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
            name: 'react',
            chunks: 'all'
          },
          commons: {
            test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/,
            name: 'common',
            chunks: 'all'
          }
        }
      }
    },

    plugins: plugins,

    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          include: resolve(__dirname, 'client/src'),
          use: ['html-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: resolve(__dirname, 'client/src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true
              }
            }
          ]
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          // exclude: /node_modules/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            autoprefixer
          ]
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'imgs'
            }
          }
        }
      ]
    },

    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat'
        // Must be below test-utils
      }
    }
  };
};
