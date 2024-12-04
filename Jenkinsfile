pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository from Git
                git url: 'https://github.com/Sridhar-14/AT-Threat-Intel.git'
            }
        }
        stage('Build with Maven') {
            steps {
                // Run Maven clean and install commands
                sh 'mvn clean install'
            }
        }
        stage('Run Tests') {
            steps {
                // Run tests defined in the POM file
                sh 'mvn test'
            }
        }
        stage('Start Docker') {
            steps {
                // Start Docker if necessary (platform-specific command)
                echo 'Docker has been started!'
                sh 'sudo systemctl start docker' // For Linux
                // For Windows, you might use:
                // bat 'net start com.docker.service'
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
