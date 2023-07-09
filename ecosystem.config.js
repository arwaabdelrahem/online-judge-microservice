module.exports = {
  apps: [
    {
      script: 'index.js',
      watch: '.',
    },
    {
      script: './service-worker/',
      watch: ['./service-worker'],
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: ['178.128.59.69'],
      ref: 'origin/master',
      repo: 'https://github.com/arwaabdelrahem/online-judge-microservice',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
