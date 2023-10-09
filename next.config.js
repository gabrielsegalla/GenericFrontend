const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales: ['pt-BR','en-US', 'es'],
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: 'pt-BR',
    },

    webpack: (config, { isServer }) => {
      // Adicione o loader para arquivos MP3
      config.module.rules.push({
        test: /\.(mp3)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/', // Altere o caminho conforme necessário
            outputPath: `${isServer ? '../' : ''}static/`, // Altere o caminho conforme necessário
            name: '[name].[ext]',
          },
        },
      });
      

  
      return config;
    },

   
    
  }