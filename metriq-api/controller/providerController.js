// providerController.js

// Config for JWT expiration
const config = require('../config')

// Service classes
const ProviderService = require('../service/providerService')
const UserService = require('../service/userService')
// Service instances
const providerService = new ProviderService()
const userService = new UserService()

function sendResponse (res, code, m) {
  const body = JSON.stringify({ message: m })
  res.writeHead(code, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain'
  })
    .end(body)
}

async function routeWrapper (res, serviceFn, successMessage, userId) {
  try {
    // Call the service function, to perform the intended action.
    const result = await serviceFn()
    if (result.success) {
      // If successful, pass the service function result as the API response.
      const jsonResponse = { message: successMessage, data: result.body }
      if (userId) {
        // If this route should log in a web user, also generate a token and set a cookie for it.
        const token = await userService.generateWebJwt(userId)
        setJwtCookie(res, token)
        jsonResponse.token = token
      }
      // Success - send the API response.
      res.json(jsonResponse).end()
    } else {
      // The service function handled an error, but we can't perform the intended action.
      sendResponse(res, 400, result.error)
    }
  } catch (err) {
    // There was an unhandled exception.
    sendResponse(res, 500, err)
  }
}

function setJwtCookie (res, token) {
  if (config.isDebug) {
    res.cookie('token', token, { maxAge: config.api.token.expiresIn * 1000, httpOnly: true, sameSite: 'Strict' })
  } else {
    res.cookie('token', token, { maxAge: config.api.token.expiresIn * 1000, httpOnly: true, sameSite: 'Strict', secure: true })
  }
}

exports.read = async function (req, res) {
  routeWrapper(res,
    async () => await providerService.getSanitized(req.params.id),
    'Retrieved provider.', req.auth ? req.auth.id : 0)
}

exports.readNames = async function (req, res) {
  routeWrapper(res,
    async () => await providerService.getAllNames(),
    'Retrieved all provider names.', req.auth ? req.auth.id : 0)
}

exports.readSubmissionCounts = async function (req, res) {
  routeWrapper(res,
    async () => await providerService.getTopLevelNamesAndCounts(),
    'Retrieved all provider names and counts.', req.auth ? req.auth.id : 0)
}

exports.readSubmissionCountsByArchitecture = async function (req, res) {
  routeWrapper(res,
    async () => await providerService.getTopLevelNamesAndCountsByArchitecture(req.params.id),
    'Retrieved all provider names and counts, by architecture.', req.auth ? req.auth.id : 0)
}
