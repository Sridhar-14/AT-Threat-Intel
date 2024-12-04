pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Sridhar-14/AT-Threat-Intel.git'
            }
        }
        stage('Build with Maven') {
            steps {
                sh 'mvn clean install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Start Docker') {
            steps {
                echo 'Starting Docker service...'
                // Check Docker status and start if not running
                sh '''
                if ! systemctl is-active --quiet docker; then
                    echo "Docker is not running. Starting Docker..."
                    sudo systemctl start docker
                else
                    echo "Docker is already running."
                fi
                '''
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed. Check the logs for more details.'
        }
    }
}
