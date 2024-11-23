const User = require('../models/user.js')
const passUserToView = async (req, res, next) => {
  const user = await User.findById(req.session.user)

  res.locals.user = req.session.user ? user : null

  next()
}

module.exports = passUserToView
