const express = require('express');
const tourController=require('../controllers/tourController');

const router= express.Router(); 

router.route('/top-5-cheap').get(tourController.aliasTopTours,tourController.getAllTours);

//Uso de pipelines
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

//Esta linea llama una validación de parámetros a través de un middleware
//router.param('id',tourController.checkTourId); 
router
.route('/')
.get(tourController.getAllTours)
.post(tourController.CreateTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.UpdateTours)
.delete(tourController.DeleteTour);

module.exports = router

