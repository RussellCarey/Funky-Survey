// Return a function to assign to the route function..
// Will be called and then will save the result function as the route one ready to be used..
// Any error will be caught in catch and passed into NEXT to our global error handler..

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
