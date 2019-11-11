'use strict';


const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const pino = require('hapi-pino')
// const util = require('util')
// const getDate = require('./plugins/getDate')

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});


// server.route({
//   method: 'GET',
//   path: '/getdate',
//   handler: (request, h) => {
//     return `date from plugin is ${h.getDate()}`
//   }
// })

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
    request.log('Hello from request.log')
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
  },
  options: {
    validate: {
      params: {
        name: Joi.string().min(3).max(10)
      }
    }
  }
})

// This function create the user
server.route({
  method: 'POST',
  path: '/user',
  handler: (request, h) => {
    const user = request.payload.user;
    console.log(JSON.stringify(user))
    return `user: ${user.name} is saved`
  }
})

const init = async () => {
  await server.register({
    // plugin: getDate
    plugin: pino,
    options: {
      // prettyPrint: process.env.NODE_ENV !== 'production',
      prettyPrint: true,
      // Redact Authorization headers, see https://getpino.io/#/docs/redaction
      // redact: ['req.headers.authorization']
      redact: ['req', 'res']

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