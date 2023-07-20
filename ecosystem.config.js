module.exports = {
  apps: [
    {
      name: 'online-judge-microservice',
      script: './dist/main.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
      watch: '.',
      env_production: {
        NODE_ENV: 'production',
        DB: 'mongodb+srv://Arwaabdelrahem:AOlKUPBeQqrPHpOr@cluster1.bgufy1w.mongodb.net/flowers?retryWrites=true&w=majority',
        'RMQ.urls': [
          'amqps://cdepyhys:Rs8ld5zpCFA8v3CDu91F8bUG2NuFARr0@shark.rmq.cloudamqp.com/cdepyhys',
        ],
        jwtSecret: 'secretKey',
      },
    },
  ],
  deploy: {
    production: {
      // key: '.ssh/id_rsa.pub',
      user: 'root',
      host: ['146.190.170.90'],
      ref: 'origin/master',
      repo: 'https://github.com/arwaabdelrahem/online-judge-microservice',
      path: '/var/www/repositories',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
