const isWorker = (req, res, next) => {
  if (res.locals.user.role === 'worker') return next()
  res.redirect('/')
}

module.exports = isWorker
