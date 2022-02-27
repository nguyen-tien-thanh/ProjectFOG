
const {ROLE} = require('../models/Role')

// Check Log in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

// function authRole(role) {
//     return (req,res,next) => {
//         if(req.user.role !== role){
//             res.status(401)
//             return res.send('Not allowed!')
//         }
//         next();
//     }
// }

function isManager(req,res,next){
        if(req.user.role == ROLE.STAFF){
            res.status(401)
            return res.send("This is manager page. You are not allowed !")
        }
        next();
}

function isAdmin(req,res,next){
    if(req.user.role !== ROLE.ADMIN){
        res.status(401)
        return res.send("This is Admin page. You are not allowed !")
    }
    next();
}

function isQAC(req,res,next){
    if(req.user.role !== ROLE.QAC){
        res.status(401)
        return res.send("This is QA Coordinator page. You are not allowed !")
    }
    next();
}

module.exports = { 
    isLoggedIn,
    // authRole,
    isManager,
    isAdmin,
    isQAC,
}