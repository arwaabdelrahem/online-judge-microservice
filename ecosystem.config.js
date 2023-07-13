module.exports = {
  apps: [
    {
      script: './dist/main.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
      watch: '.',
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['178.128.59.69'],
      ref: 'origin/master',
      repo: 'https://github.com/arwaabdelrahem/online-judge-microservice',
      path: '/var/app/repositories',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
