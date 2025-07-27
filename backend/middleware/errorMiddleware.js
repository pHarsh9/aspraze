const errorHandler = (err, req, res, next) =>{
      if (res.headersSent) {
    return next(err); // Delegate to default Express error handler
  }
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message, 
        stack: process.env.NODE_ENV === 'production'? null : err.stack
    })
}

module.exports = {errorHandler}