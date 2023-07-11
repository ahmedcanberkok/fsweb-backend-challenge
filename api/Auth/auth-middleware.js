const resricted = (req,res,next) => {
 next({  // DON'T FORGET TO DELETE
    status: 400,
    message:"error middleware is OK..." ,
 })
};

module.exports = {
    resricted,
}