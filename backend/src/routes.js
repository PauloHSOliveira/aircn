const express = require("express");
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController')

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store); //criar User

routes.get('/spots', SpotController.index);//retornar spots
routes.post('/spots', upload.single('thumbnail'), SpotController.store);//criar spot e enviar thumb

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;
