class IndexAction {
  static get(req, res) {
    console.debug('[DEBUG] Method: ', req.method);
    console.debug('[DEBUG] Headers: ', req.headers);
    console.debug('[DEBUG] Body: ', req.body);
    console.debug('[DEBUG] Querystring: ', req.query);
    res.send('That\'s all Folks!');
  }
}

module.exports = IndexAction;
