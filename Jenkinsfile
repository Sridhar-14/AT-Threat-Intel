pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/Sridhar-14/AT-Threat-Intel.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh '''
                    docker build -t my-app-image:latest .
                    '''
                }
            }
        }
        
        stage('Run Application in Docker') {
            steps {
                script {
                    sh '''
                    # Stop any existing container with the same name
                    docker stop my-app-container || true
                    docker rm my-app-container || true
                    
                    # Run the new container
                    docker run -d --name my-app-container -p 5173:5173 my-app-image:latest
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
    }
}
