pipeline {
    agent { docker { image 'node:12.18.3' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}