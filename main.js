'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        console.log(`request: ${JSON.stringify(request)}`)
          return 'Hello World!';
      }
  });

    server.route({
      method: 'POST',
      path: '/',
      handler: (request, h) => {

          return 'Hello World from Post!';
      }
  });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();