module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // url: 'https://0cddf3ad213d.ngrok.io',
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '593a49d7dd94ce72a840e833b5c65828'),
    },
  },
});
