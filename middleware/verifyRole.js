module.exports = function (req, res, next, user_type) {
    //401 UnAuthorized
    //403 Forbidden
    if (!user_type.includes(req.user.user_type)) return res.status(403).send('Access Denied!')
    next();
  }