import objects from './objects';
import Users from '../controllers/user';

const routes = app => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.post('/api/users', Users.signUp);

  app.get('/api/users/get-all', Users.getAllUsers);

  // Import API Routes
  app.use('/objects', objects);
}

export default routes;