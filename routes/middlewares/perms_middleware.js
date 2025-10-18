const User = require("../models/user")

export const authenticated = (req, res, next)=>{
    if(!req.isAuthenticated()) res.redirect("/login")
    next()
}

export const hasAdminPerms = (req, res, next) => {
    const user = User.findById(req.user._id)
    
    if(!user) res.redirect("/")

    if(user.perms == process.env.ADMIN_PERM_STR) next()
    else res.redirect("/")
}