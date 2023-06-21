const { verifyToken } = require("../helpers/helper")
const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if (!access_token) throw { name: 'Unauthorized' }
    const payload = verifyToken(access_token)
    const user = await User.findByPk(payload.id)
    if (!user) throw { name: 'Unauthorized' }

    req.user = { id: user.id, role: user.role }
    next()
  } catch (err) {
    next(err)
  }
}
