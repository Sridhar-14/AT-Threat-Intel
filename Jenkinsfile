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

        stage('Run Selenium Tests') {
            steps {
                script {
                    // Run Maven test to trigger Selenium tests (ensure TestNG is set up in your Maven configuration)
                    sh "'${tool 'Maven 3.9.9'}/bin/mvn' test"
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
                    docker run -d --name my-app-container -p 5173:80 my-app-image:latest
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
