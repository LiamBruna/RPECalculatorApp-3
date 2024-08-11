const CopyWebpackPlugin = require('copy-webpack-plugin');
const { override, addWebpackPlugin } = require('customize-cra');

module.exports = override(
  addWebpackPlugin(
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/manifest.json', to: '/dist' },
        { from: 'src/sw.js', to: '/dist' },
        // Añade aquí cualquier otro archivo que quieras copiar
      ],
    })
  )
);
