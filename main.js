'use strict';

const Hapi = require('@hapi/hapi');
// const util = require('util')
const getDate = require('./plugins/getDate')

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  await server.register({
    plugin: getDate
  })

  server.route({
    method: 'GET',
    path: '/getdate',
    handler: (request, h) => {
      return `date from plugin is ${h.getDate()}`
    }
  })

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

  server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: (request, h) => {
      const name = request.params.name;
      return `Hello ${name}`
    }
  })

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();