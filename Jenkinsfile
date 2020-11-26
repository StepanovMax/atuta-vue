pipeline {
  agent any

  options {
    disableConcurrentBuilds()
  }

  stages {

    stage ('Test stage') {
      steps {
        echo 'Start of Test'
        sh " \
          ' \
            cd .. \
            && ls \
          ' \
        ";
        echo 'End of Test'
      }
    }

  }
}