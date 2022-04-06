const path = require('path');
const webpack = require('webpack');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-i18n/register.js',
    'storybook-addon-apollo-client',
    'storybook-addon-next-router',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (baseConfig, { configType }) => {
    // Modify or replace config. Mutating the original reference object can cause unexpected bugs.
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    newConfig.resolve.modules = [path.resolve(__dirname, '..'), 'node_modules'];
    newConfig.resolve.alias = {
      ...newConfig.resolve.alias,
    };

    // CSS Modules
    // Many thanks to https://github.com/storybookjs/storybook/issues/6055#issuecomment-521046352
    //

    // First we prevent webpack from using Storybook CSS rules to process CSS modules
    newConfig.module.rules.find(
      (rule) => rule.test.toString() === '/\\.css$/',
    ).exclude = /\.module\.css$/;

    // Then we tell webpack what to do with CSS modules
    newConfig.module.rules.push({
      test: /\.module\.css$/,
      include: path.resolve(__dirname, '../src/components'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              sourceMap: true,
              config: path.resolve(__dirname, '../postcss.config.js'),
            },
          },
        },
      ],
    });

    newConfig.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser',
      }),
    );

    newConfig.resolve.fallback = {
      ...newConfig.resolve.fallback,
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url'),
      assert: require.resolve('assert'),
    };

    return newConfig;
  },
  typescript: {
    reactDocgen: false,
  },
};
