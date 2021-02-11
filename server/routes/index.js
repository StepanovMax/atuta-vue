import user from './user';
import auth from './auth';
import help from './help';
import data from './data';
import objects from './objects';
import dialogs from './dialogs';
import companies from './companies';
import Users from '../server/controllers/user';
import tutorial from './tutorial.routes';

const routes = app => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post('/api/users', Users.signUp);

  app.get('/api/users/get-all', Users.getAllUsers);

  app.get('/testapi', (req, res) => {
    const reqHost = req.get('host');
    console.log('reqHost ::', reqHost);

    res.status(200).send({
      message: 'Welcome to the Atuta API!',
      host: reqHost,
    })
  });

  // Import API Routes
  app.use('/user', user);
  app.use('/help', help);
  app.use('/auth', auth);
  app.use('/data', data);
  app.use('/objects', objects);
  app.use('/dialogs', dialogs);
  app.use('/tutorial', tutorial);
  app.use('/companies', companies);
}

export default routes;