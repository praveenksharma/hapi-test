'use strict';

const Hapi = require('@hapi/hapi');
const util = require('util')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
      method: ['GET', 'POST'],
      path: '/getpost',
      handler: (request, h) => {
        return 'Get Post together';
      }
    })

    server.route({
      method: 'GET',
      path: '/',
      handler: (request, h) => {
        // console.log(`request: ${util.inspect(request)}`)
          return 'Hello World1!';
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