const isAdmin = (req, res, next) => {
  if (res.locals.user.role === 'admin') return next()
  res.redirect('/')
}

module.exports = isAdmin
