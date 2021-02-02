pipeline {
  agent any

  options {
    disableConcurrentBuilds()
  }

  stages {

    stage ('Git Clone') {
      steps {
        echo 'Start of Git Clone'
        sh 'mkdir -p stage'
        dir("stage")
        {
          git branch: "stage",
          credentialsId: 'git-jenkins',
          url: 'git@github.com:stepanovmax/atuta-vue.git'
        }
        // deleteDir();
        echo 'End of Git Clone'
      }
    }

    stage ('Build Local') {
      steps {
        echo 'Start of Build Local'
        
        sh "\
          cd /var/lib/jenkins/workspace/stage.atuta.ru/stage/client/ \
          && yarn \
          && yarn dev-build \
          && rm -rf node_modules \
        ";

        echo 'End of Build Local'
      }
    }

    stage ('Deploy') {
      steps {
        echo 'Start of Deploy'
        sh "rsync -avzh -a --progress --delete /var/lib/jenkins/workspace/stage.atuta.ru/stage/ atuta.stage.jenkins:/var/www/stage.atuta.ru"
        echo 'End of Deploy'
      }
    }

    stage ('Build') {
      steps {
        echo 'Start of Build'
        echo '1'
        // sh "ssh atuta.stage.jenkins 'sudo systemctl status atuta-stage-backend.service'";
        echo '2'
        sh "ssh atuta.stage.jenkins 'sudo systemctl stop atuta-stage-backend.service'";
        echo '3'
        // sh "ssh atuta.stage.jenkins 'sudo systemctl status atuta-stage-backend.service'";

        sh " \
          ssh atuta.stage.jenkins \
          ' \
            cd /var/www/stage.atuta.ru/server/ \
            && yarn \
          ' \
        ";

        echo '4'
        sh "ssh atuta.stage.jenkins 'sudo systemctl restart atuta-stage-backend.service'";
        echo '5'
        // sh "ssh atuta.stage.jenkins 'sudo systemctl status atuta-stage-backend.service'";
        echo 'End of Build'
      }
    }

    stage ('Clear jenkins dir') {
      steps {
        deleteDir();
      }
    }

  }
}


pipeline {
  agent any

  options {
    disableConcurrentBuilds()
  }

  stages {

    stage ('Git Clone') {
      steps {
        echo 'Start of Git Clone'
        sh 'mkdir -p develop'
        dir("develop")
        {
          git branch: "develop",
          credentialsId: 'git-jenkins',
          url: 'git@github.com:stepanovmax/atuta-vue.git'
        }
        echo 'End of Git Clone'
      }
    }

    stage ('Build Local') {
      steps {
        echo 'Start of Build Local'
        
        sh "\
          cd /var/lib/jenkins/workspace/dev.atyta.ru/develop/client/ \
          && yarn \
          && yarn dev-build \
          && rm -rf node_modules \
        ";

        echo 'End of Build Local'
      }
    }

    stage ('Deploy') {
      steps {
        echo 'Start of Deploy'
        
        sh "rsync -rvzh -a --progress /var/lib/jenkins/workspace/dev.atyta.ru/develop/ jenkins@213.139.208.179:www/atuta/"
        sh "rsync -rvzh -a --progress /home/maxim/www/atuta/env/ jenkins@213.139.208.179:www/atuta/client/"
        sh "rsync -rvzh -a --progress /home/maxim/www/atuta/env/ jenkins@213.139.208.179:www/atuta/server/"
        
        deleteDir();
        echo 'End of Deploy'
      }
    }

    stage ('Build Server') {
      steps {
        echo 'Start of Build Server'
        echo '1'
        // sh "ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 'sudo systemctl status atyta-backend.service'";
        echo '2'
        sh "ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 'sudo systemctl stop atyta-backend.service'";
        echo '3'
        // sh "ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 'sudo systemctl status atyta-backend.service'";
       
        
/*    
        sh " \
          ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 \
          ' \
            cd /home/jenkins/www/atuta/client/ \
            && yarn \
            && yarn dev-build\
          ' \
        ";
*/        
        
        sh " \
          ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 \
          ' \
            cd /home/jenkins/www/atuta/server/ \
            && yarn \
          ' \
        ";
        
        
        echo '4'
        sh "ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 'sudo systemctl restart atyta-backend.service'";
        echo '5'
        // sh "ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 'sudo systemctl status atyta-backend.service'";
        echo 'End of Build Server'
      }
    }

  }
}