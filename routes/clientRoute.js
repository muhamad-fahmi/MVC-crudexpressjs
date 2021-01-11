const express = require('express')
const routes = express.Router()
const clientController = require('../controller/clientController')
routes.get('/', clientController.index)
module.exports = routes