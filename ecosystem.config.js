module.exports = {
  apps: [
    {
      name: 'oj-microservice',
      script: './dist/main.js',
      instances: '2',
      exec_mode: 'cluster',
      autorestart: true,
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
      user: 'root',
      key: './ssh/id_rsa',
      ref: 'origin/master',
      host: ['164.92.105.190'],
      ssh_options: ['StrictHostKeyChecking=no', 'PasswordAuthentication=no'],
      repo: 'https://github.com/arwaabdelrahem/online-judge-microservice',
      path: '/var/www/prod',
      'post-deploy':
        'npm install && npm run build &&  pm2 reload ecosystem.config.js --env production && pm2 save',
    },
  },
};
