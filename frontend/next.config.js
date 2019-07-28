const withGraphql = require('next-plugin-graphql');
const withCSS = require('@zeit/next-css');
const path = require('path');
const webpack = require('webpack');
const { parsed: localEnv } = require('dotenv').config();

module.exports = withCSS(
  withGraphql({
    webpack: function(config, options) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
      return config;
    },
    target: 'serverless'
  })
);
