pipeline {
    agent any
    tools {
	    maven "MAVEN3"
	    jdk "OracleJDK11"
	}

    environment {
        registryCredential = 'ecr:us-east-1:awscreds'
        appRegistry = "116594513860.dkr.ecr.us-east-1.amazonaws.com/l00179719appimg"
        vprofileRegistry = "https://116594513860.dkr.ecr.us-east-1.amazonaws.com/"
       //cluster = "l00179719app"
        //service = "l00179719appsvc"
    }
  stages {
    stage('Fetch code'){
      steps {
        git branch: 'main', url: 'https://github.com/L00179719/nodeJS.git'
      }
    }


    stage('Test'){  
      steps {
        sh 'mvn test'
      }
    }

    stage ('CODE ANALYSIS WITH CHECKSTYLE'){
            steps {
                sh 'mvn checkstyle:checkstyle'
            }
            post {
                success {
                    echo 'Generated Analysis Result'
                }
            }
        }

        
    stage('Build App Image') {
       steps {
       
         script {
                dockerImage = docker.build( appRegistry + ":$BUILD_NUMBER", "./)
             }

     }
    
    }

    stage('Upload App Image') {
          steps{
            script {
              docker.withRegistry( vprofileRegistry, registryCredential ) {
                dockerImage.push("$BUILD_NUMBER")
                dockerImage.push('latest')
              }
            }
          }
        }
        
    }

    
     
}