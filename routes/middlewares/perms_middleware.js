const User = require("../models/user")

const authenticated = (req, res, next)=>{
    if(!req.isAuthenticated()) res.redirect("/login")
    next()
}

const hasAdminPerms = async (req, res, next) => {
    const user = await User.findById(req.user._id)
    if(!user) res.redirect("/")

    if(user.perms == process.env.ADMIN_PERM_STR) next()
    else res.redirect("/")
}

module.exports = {
    authenticated,
    hasAdminPerms
}