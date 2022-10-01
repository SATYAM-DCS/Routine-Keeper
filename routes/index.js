// require express
const express = require('express');
const routes = express.Router();

// require controllers path
const homeController = require('../controllers/home-controller')
const userController = require('../controllers/user-controller')


// home controllers
routes.get('/', homeController.home)                                // home route
routes.post('/create-habit', homeController.createHabit)            // create habit route
routes.get('/delete/:id', homeController.deleteActivity)            // delete habit route
routes.get('/done-notdone/:?', homeController.markDoneNotDone)      // status route

// weekly report route
routes.get('/weekly-report', homeController.weeklyreport)


// user controller
routes.get('/signin', userController.signin)                        // signin page route
routes.post('/signin-signup', userController.signinSignup)          // signin authentication route
routes.get('/logout', userController.logout)                        // logout route

// export routes
module.exports = routes;