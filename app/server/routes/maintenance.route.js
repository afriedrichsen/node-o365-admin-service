const express = require('express');
const validate = require('express-validation');

//Here is the maintenance controller.
const controller = require('../controllers/maintenance.controller');

const router = express.Router();

router.route('/')
    .get();

router.route('/user')
    .get();

router.route('/user/create')
    .post(controller.createCloudUser);

router.route('/user/:id')
    .get();

router.route('/user/all')
    .get();

router.route('/user/update/:id')
    .patch();

router.route('/user/license/apply')
    .post();

router.route('/tasks')
    .get();

router.route('/tasks/mobile/terminations')
    .get();

router.route('/tasks/user/license')
    .get();

module.exports = router;