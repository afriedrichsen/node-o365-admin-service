const express = require('express');
const validate = require('express-validation');

//Here is the maintenance controller.
const controller = require('../controllers/maintenance.controller');

//Here are our validations.
const {createUser, licenseUser} = require('../validations/maintenance.validation');

//Here is the router.
const router = express.Router();

//Here are the routes.
router.route('/')
    .get((req, res) => res.send('Maintenance endpoint is available.'));

router.route('/user')
    .get((req, res) => res.send('User functionality is here.'));

/**
 * @api {post} prod/maintenance/users Create User
 * @apiDescription Create a new Office365 user
 * @apiVersion 0.1.3
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization  User's access token
 *
 * @apiParam  {String}             email     User's email
 * @apiParam  {String{6..128}}     password  User's password
 * @apiParam  {String{..128}}      [name]    User's name
 * @apiParam  {String=user,admin}  [role]    User's role
 *
 * @apiSuccess (Created 201) {String}  id         User's id
 * @apiSuccess (Created 201) {String}  name       User's name
 * @apiSuccess (Created 201) {String}  email      User's email
 * @apiSuccess (Created 201) {String}  role       User's role
 * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
 *
 * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
 * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
 */
router.route('/user/create')
    .post(validate(createUser), controller.createCloudUser);

router.route('/user/:upn')
/**
 * @api {get} prod/maintenance/users/:upn List User
 * @apiDescription Get an Office365 user
 * @apiVersion 0.1.3
 * @apiName ListUsers
 * @apiGroup User
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization  User's access token
 *
 * @apiParam  {String=user,admin}  [role]       User's role
 *
 * @apiSuccess {Object[]} user.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only authorized tenant users can access the data
 */
    .get(controller.getCloudUser)
/**
     * @api {patch} prod/maintenance/users/:upn Update User
     * @apiDescription Update an Office365 user
     * @apiVersion 0.1.3
     * @apiName updateCloudUser
     * @apiGroup User
     * @apiPermission admin
     *
     * @apiHeader {String} Authorization  User's access token
     *
     * @apiParam  {String=user,admin}  [role]       User's role
     *
     * @apiSuccess {Object[]} status code.
     *
     * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
     * @apiError (Forbidden 403)     Forbidden     Only authorized tenant users can access the data
     */
    .patch(controller.updateCloudUser);
/**
    * @api {delete} prod/maintenance/users/:upn Delete User
    * @apiDescription Delete an Office365 user
    * @apiVersion 0.1.3
    * @apiName deleteCloudUser
    * @apiGroup User
    * @apiPermission admin
    *
    * @apiHeader {String} Authorization  User's access token
    *
    * @apiParam  {String=user,admin}  [role]       User's role
    *
    * @apiSuccess {Object[]} status code.
    *
    * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
    * @apiError (Forbidden 403)     Forbidden     Only authorized tenant users can access the data
    */
    .delete(controller.deleteCloudUser);


router.route('/user/:upn/license')
    .post(validate(licenseUser), controller.licenseCloudUser);

router.route('/user/:upn/devices')
    .post(controller.getCloudUserDevices);

//router.route('/user/all')
//    .get();

//router.route('/user/license/apply')
//    .post();

router.route('/tasks')
    .get((req, res) => res.send('Admin tasks endpoint is available.'));

router.route('/tasks/mobile/terminations')
    .get();

router.route('/tasks/user/license')
    .get();

module.exports = router;