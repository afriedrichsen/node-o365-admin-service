const httpStatus = require('http-status');
//const { omit } = require('lodash');
//const User = require('../models/user.model');
const { handler: errorHandler } = require('../middlewares/error');
const graph = require('../utils/graph');

exports.createCloudUser = async (req, res, next) => {
    try{
        const upn = req.body.userPrincipalName;
        graph.createUser()
    }
    catch (error) {
        next(error);
    }
};
