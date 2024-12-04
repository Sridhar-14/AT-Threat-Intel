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
        stage('Start Docker Container') {
            steps {
                script {
                    echo 'Starting Docker container...'
                    
                    // Pull the Docker image if not available locally
                    sh 'docker pull your-docker-image:tag'
                    
                    // Run the container
                    sh '''
                    docker run -d --name my-container \
                        -p 8080:8080 \
                        your-docker-image:tag
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Build completed successfully and container started!'
        }
        failure {
            echo 'Build failed. Check the logs for more details.'
        }
    }
}
