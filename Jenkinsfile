pipeline {
    agent any
  tools {
        nodejs "18.12.1"
    }
    environment {

            // This can be nexus3 or nexus2
            NEXUS_VERSION = "nexus3"
            // This can be http or https
            NEXUS_PROTOCOL = "http"
            // Where your Nexus is running
            NEXUS_URL = "20.83.156.247"
            // Repository where we will upload the artifact
            NEXUS_REPOSITORY = "gateway"
            // Jenkins credential id to authenticate to Nexus OSS
            NEXUS_CREDENTIAL_ID = "nexus_credentials" // 3malt credentials f jenkins w 3aythomlhom houni for security reasons

   }


    stages {
        stage('Clone from remote repo') {
                    steps {
                      // Get some code from a GitHub repository
                      echo " clone github code "
                      git branch: 'main',
                      credentialsId: 'github_credentials',
                      url: 'https://github.com/youssefpfe/FrontendAngular.git'
                      echo " finish cloning "
                      }
         }

        stage('Build'){
            steps {
                sh "npm install -g @angular/cli"
                sh "npm i --legacy-peer-deps"
                sh "ng build"

            }
        }

      stage('Build docker image '){
                   steps {

                       echo "Build a docker image to angular   "
                       sh ' docker build -t youssefpfe/pfeapps:angular.$BUILD_ID . '
                       sh "docker images"
                       echo " docker image fineshed built "


                   }
               }

                stage('Push the image to DockerHub '){
                   steps {

                      withCredentials([string(credentialsId: 'dockerhub_credential', variable: 'dockerhub_credential')]) {
                         echo " login dockerhub "
                         sh ' docker login -u youssefpfe -p ${dockerhub_credential} '
                         echo " pushing to dockerhub"
                         sh ' docker push youssefpfe/pfeapps:angular.$BUILD_ID '
                      }

                   }
               }

     /*   stage('Deploy on docker compose '){
            steps {

                echo "Deploying"

                sh "docker-compose up -d"



            }

        }*/

    }
}
