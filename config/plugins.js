module.exports = ({ env }) => ({
    upload: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: '',
        secretAccessKey: '',
        params: {
          Bucket: '',
        },
      },
    },
  });
