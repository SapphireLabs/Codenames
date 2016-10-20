module.exports = {
  queryHandler
};

function queryHandler(query, param, req, res, next) {
  const status = req.method === 'POST' ? 201 : 200;

  query(param)
  .then(resp => { res.status(status).json(resp) })
  .catch(err => { next(err) });
}
