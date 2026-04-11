<<<<<<< HEAD
const AppError = require("./../utils/appError");
const handleCastErrorDB=err=>{
  const message=`Invalid ${err.path}: ${err.value}.`;
  return new AppError(message,400);
}
const handleDuplicateFieldsDB=err=>{
 const value = err.keyValue ? Object.values(err.keyValue)[0] : '';
  const message=`Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message,400);
}
const handleValidationErrorDB=err=>{
  const errors=Object.values(err.errors).map(el=>el.message);
  const message=`Invalid input data. ${errors.join('. ')}`;
  return new AppError(message,400);
}
const handleJWTError=err=>{
  return new AppError('Invalid token. Please log in again!',401);
}
const handleJWTExpiredError=err=>{
  return new AppError('Your token has expired! Please log in again.',401);
}
const sendErrorDev = (err,req,res) => {
  if(req.originalUrl.startsWith('/api')){
=======
const sendErrorDev = (err, res) => {
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
<<<<<<< HEAD
  });}
  else{
    res.status(err.statusCode).render('error',{
      titile:'something went wrong',
      msg:err.message,
    })
  }
};
const sendErrorProd = (err,req,res) => {
  if(req.originalUrl.startsWith('/api')){
  //Operational, trusted error: send message to client
  if (err.isOperational) {
   return res.status(err.statusCode).json({
=======
  });
};
const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
      status: err.status,
      message: err.message,
    });
    //Programming or other unknown error: don't leak error details
<<<<<<< HEAD
  } 
   //1) Log error
    console.error("ERROR 💥", err);
    //2) Send generic message
   return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }else{
    if (err.isOperational) {
     res.status(err.statusCode).render('error',{
      titile:'something went wrong',
      msg:err.message,
    })
    //Programming or other unknown error: don't leak error details
=======
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
  } else {
    //1) Log error
    console.error("ERROR 💥", err);
    //2) Send generic message
<<<<<<< HEAD
     res.status(err.statusCode).render('error',{
      titile:'something went wrong',
      msg:'please try again later',
    })
  }
=======
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
  }
};
module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === "development") {
<<<<<<< HEAD
    sendErrorDev(err,req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error={...err};
        error.message = err.message;
    error.name = err.name;
    error.isOperational = err.isOperational;
    error.path = err.path;
    error.value = err.value;
    if(error.name==="CastError"){error=handleCastErrorDB(error);}
    if(error.code===11000){error=handleDuplicateFieldsDB(error);}
    if(error.name==="ValidationError"){error=handleValidationErrorDB(error);}
    if(error.name==="JsonWebTokenError"){error=handleJWTError(error);}
    if(error.name==="TokenExpiredError"){error=handleJWTError(error);}
    sendErrorProd(error,req, res);
  }
  // res.status(err.statusCode).json({
  //   status: err.status,
  //   message: err.message,
  // });
=======
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
>>>>>>> fa1bd6eabc093acdafe524ca633fe1b9143b2daa
};
