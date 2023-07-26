pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/arwaabdelrahem/online-judge-microservice'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
  }
}