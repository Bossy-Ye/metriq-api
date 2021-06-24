// api-routes.js

// Initialize ExpressJS router.
const router = require('express').Router()

// Set default API response.
router.get('/', function (req, res) {
  res.json({
    status: 'API is working',
    message: 'This is the Metriq public REST API.'
  })
})

const accountController = require('./controller/accountController')
const userController = require('./controller/userController')

// Register routes.
router.route('/register')
  .post(accountController.new)
router.route('/login')
  .post(accountController.login)
router.route('/token')
  .post(accountController.newToken)
  .delete(accountController.deleteToken)
router.route('/user')
  .get(userController.read)
  .delete(userController.delete)

// Export API routes.
module.exports = router
