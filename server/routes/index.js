import auth from './auth';
import help from './help';
import data from './data';
import objects from './objects';
import dialogs from './dialogs';
import companies from './companies';

import user from './user.route';
import object from './object.route';
import employee from './employee.route';
import tutorial from './tutorial.routes';
import money from './money.route';


const routes = app => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/testapi', (req, res) => {
    const reqHost = req.get('host');
    console.log('reqHost ::', reqHost);

    res.status(200).send({
      message: 'Welcome to the Atuta API!',
      host: reqHost,
    })
  });

  // Import API Routes
  app.use('/help', help);
  app.use('/auth', auth);
  app.use('/data', data);
  app.use('/objects', objects);
  app.use('/dialogs', dialogs);
  app.use('/companies', companies);

  app.use('/user', user);
  app.use('/object', object);
  app.use('/employee', employee);
  app.use('/tutorial', tutorial);
  app.use('/money', money);
}

export default routes;