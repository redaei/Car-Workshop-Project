const isSupervisor = (req, res, next) => {
  if (res.locals.user.role === 'supervisor') return next()
  res.redirect('/')
}

module.exports = isSupervisor
