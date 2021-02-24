const create = async (req, res, file) => {
  const { body } = req.body;
  const object = req.body.object;
  // const { object } = req.object;
  console.log(' ');
  console.log('  >> object');
  console.log(object);
  if (req.suffix) {
    console.log(' ');
    console.log('  >> req.suffix');
    console.log(req.suffix);
  }
  console.log(' ');

  res.status(200).send(true);
};


export { create };