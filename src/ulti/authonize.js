// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.redirect("/login");
// }



// Check Log in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

function authRole(role) {
    return (req,res,next) => {
        if(req.user.role !== role){
            res.status(401)
            return res.send('Not allowed!')
        }
        next();
    }
}

// function isManager(role){
//     return (req.res.next) => {
//         if(req.user)
//     }
// }


module.exports = { 
    isLoggedIn,
    authRole,
}