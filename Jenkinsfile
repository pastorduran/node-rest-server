pipeline {
    agent { 
        docker { 
            image 'node:6.3'
            args '-p 30000:3000' 
        } 
    }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}