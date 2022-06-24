module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'natway_db'),
        username: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD', 'redrose12'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {
      }
    },
  },
});


// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'postgres',
//         host: env('DATABASE_HOST', '127.0.0.1'),
//         port: env.int('DATABASE_PORT', 5432),
//         database: env('DATABASE_NAME', 'natway_db'),
//         username: env('DATABASE_USERNAME', 'root'),
//         password: env('DATABASE_PASSWORD', 'root'),
//         ssl: env.bool('DATABASE_SSL', false),
//       },
//       options: {
//       }
//     },
//   },
// });
