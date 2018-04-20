const express = require('express');
const validate = require('express-validation');

//Here is the maintenance controller.
const controller = require('../controllers/maintenance.controller');

const router = express.Router();

router.route('/')
    .get((req, res) => res.send('Maintenance endpoint is available.'));

router.route('/user')
    .get((req, res) => res.send('User functionality is here.'));

router.route('/user/create')
    .post(controller.createCloudUser);

router.route('/user/:upn')
    .get(controller.getCloudUser)
    .delete(controller.deleteCloudUser);

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