pipeline {
  agent any
  tools {nodejs "node" }
  
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/arwaabdelrahem/online-judge-microservice'
      }
    }

    stage('Build') {
       steps {
        echo 'Building....'
        sh 'npm install'
        sh './Install_16.04.sh'
       }
    }

    stage('Deploy') {
       steps {
        echo 'Deploying....'
        sh 'chmod 600 ./ssh/id_rsa'
        sh 'chmod 600 ./ssh/id_rsa.pub'
        sh 'pm2 deploy production setup'
        sh 'pm2 deploy production'
       }
    }
  }
}
