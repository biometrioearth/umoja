// eslint-disable-next-line import/no-import-module-exports
import { theme } from './src/config/theme/themeVariables';

const { ModuleFederationPlugin } = require('webpack').container;

const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: false,
        },
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: 'umoja',
          remotes: {
            pufferfishclient: 'pufferfishclient@http://localhost:3001/remoteEntry.js',
          },
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
          },
        }),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...theme,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
