const express = require('express');
console.log(`${__dirname}`);
const tourController=require('../controllers/tourController');
const router= express.Router(); 


router.param('id',tourController.checkTourId);
router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody,tourController.CreateTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.UpdateTours)
.delete(tourController.DeleteTour);

module.exports = router

