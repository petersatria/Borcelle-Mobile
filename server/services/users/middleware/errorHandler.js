function errorHandler(err, req, res, next) {
  let status
  let message

  switch (err.name) {
    case 'EmailPasswordEmpty':
      status = 400
      message = 'Email / password is required'
      break;
    case 'EmailNotUnique':
      status = 400
      message = 'Email must be unique'
      break;
    case 'MinPassword':
      status = 400
      message = 'Minimum password is 5 character'
      break;
    case 'NotFound':
      status = 404
      message = 'Data is not found'
      break;
    default:
      status = 500
      message = 'Internal Server Error'
      break;
  }
  res.status(status).json({ message, name: err.name })
}

module.exports = errorHandler