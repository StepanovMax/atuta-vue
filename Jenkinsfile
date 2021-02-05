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
        
        sh "rsync -rvzh -a --progress /var/lib/jenkins/workspace/dev.atyta.ru/develop/client/ jenkins@213.139.208.179:www/atuta/client/"
        sh "rsync -rvzh -a --progress /var/lib/jenkins/workspace/dev.atyta.ru/develop/server/ jenkins@213.139.208.179:www/atuta/server/"
        sh "rsync -rvzh -a --progress /home/maxim/www/atuta/env/ jenkins@213.139.208.179:www/atuta/client/env/"
        sh "rsync -rvzh -a --progress /home/maxim/www/atuta/env/ jenkins@213.139.208.179:www/atuta/server/env/"
        
        deleteDir();
        echo 'End of Deploy'
      }
    }

    stage ('Build Server') {
      steps {
        echo 'Start of Build Server'
        sh "ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 'sudo systemctl stop atyta-backend.service'";
        
        sh " \
          ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 \
          ' \
            cd /home/jenkins/www/atuta/server/ \
            && yarn \
          ' \
        ";
        
        
        sh "ssh -i '/var/lib/jenkins/.ssh/id_rsa' jenkins@213.139.208.179 'sudo systemctl restart atyta-backend.service'";
        echo 'End of Build Server'
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
          && yarn stage-build \
          && cp -Rvp /home/maxim/www/atuta/env /var/lib/jenkins/workspace/stage.atuta.ru/stage/client \
          && cp -Rvp /home/maxim/www/atuta/env /var/lib/jenkins/workspace/stage.atuta.ru/stage/server \
          && rm -rf node_modules \
        ";

        echo 'End of Build Local'
      }
    }

    stage ('Deploy') {
      steps {
        echo 'Start of Deploy'
        sh "rsync -rvzh -a --progress --delete /var/lib/jenkins/workspace/stage.atuta.ru/stage/ atuta.stage.jenkins:/var/www/stage.atuta.ru"
        // sh "rsync -rvzh -a --progress --delete /var/lib/jenkins/workspace/stage.atuta.ru/stage/server atuta.stage.jenkins:/var/www/stage.atuta.ru/server"
        // sh "rsync -rvzh -a --progress /home/maxim/www/atuta/env atuta.stage.jenkins:/var/www/stage.atuta.ru/client/env"
        // sh "rsync -rvzh -a --progress /home/maxim/www/atuta/env atuta.stage.jenkins:/var/www/stage.atuta.ru/server/env"
        // sh "rsync -rvzh -a --progress /var/lib/jenkins/workspace/stage.atuta.ru/stage/client/ atuta.stage.jenkins:/var/www/stage.atuta.ru/client/"
        // sh "rsync -rvzh -a --progress /var/lib/jenkins/workspace/stage.atuta.ru/stage/server/ atuta.stage.jenkins:/var/www/stage.atuta.ru/server/"
        
        echo 'End of Deploy'
      }
    }

    stage ('Build') {
      steps {
        echo 'Start of Build Server'
        sh "ssh atuta.stage.jenkins 'sudo systemctl stop atuta-stage-backend.service'";

        sh " \
          ssh atuta.stage.jenkins \
          ' \
            cd /var/www/stage.atuta.ru/server/ \
            && yarn \
          ' \
        ";

        sh "ssh atuta.stage.jenkins 'sudo systemctl restart atuta-stage-backend.service'";
        echo 'End of Build'
      }
    }

  }
}