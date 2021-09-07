function isAdmin(user) {
    if (user.admin === 'true') {
        return true
    }
}

module.exports = validateAdmin