/*
*
*  Microsoft Graph API Helper
*
*  by Alexander (Alex) Friedrichsen
*
*  Adopted from documentation provided by Microsoft...
*
*  ...updated by Alex for ES2017
*/

const request = require('request');
const Q = require('q');
const config = require('../config/vars');
/**
 * Generates a GET request the user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {string} upn  The user principal name to send with the request.
 * @param {Function} callback
 */
exports.getUserData = (accessToken, upn) => {

    //const route = 'https://graph.microsoft.com/beta/users/' + upn;

    const route = config.apiBase + '/' + config.apiVersion + '/users/' + upn;

    var deferred = Q.defer();

    request.get(route, {
        auth: {
            bearer: accessToken
        }
    }, function (err, response, body) {
        var parsedBody = JSON.parse(body);
     //   console.log(parsedBody);
        if (err) {
            deferred.reject(err);
        } else {
            // The value of the body will be an array of all users.
            deferred.resolve(parsedBody);
        }
    });
    return deferred.promise;

}

/**
 * Generates a POST request the (create) user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {Function} callback
 * */
exports.createUser = (accessToken, requestParams) => {


  //  const route = 'https://graph.microsoft.com/beta/users/';

    const route = config.apiBase + '/' + config.apiVersion + '/users/';

    const requestBody = requestParams;


    //console.log(accessToken);
    //console.log(JSON.stringify(requestBody));

    var deferred = Q.defer();

    request.post({
            url: route,
            headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(requestBody)
    }, function (err, response, body) {
        var parsedBody = JSON.parse(body);
         //  console.log(parsedBody);
        if (err) {
            deferred.reject(err);
        } else {
            // The value of the body will be an array of all users.
            deferred.resolve(parsedBody);
        }
    });
    return deferred.promise;

}


exports.updateUser = (accessToken, targetUser, updateParams) => {


  //  const route = 'https://graph.microsoft.com/beta/users/' + targetUser;
    const route = config.apiBase + '/' + config.apiVersion + '/users/' + targetUser;

    const requestBody = updateParams;


    //console.log(accessToken);
    //console.log(JSON.stringify(requestBody));

    var deferred = Q.defer();

    request.patch({
        url: route,
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(requestBody)
    }, function (err, response) {

        if(err) {
            deferred.reject(err);
        }
        else {
            const parsedBody = ""
            deferred.resolve(JSON.stringify(parsedBody));

        }

    });
    return deferred.promise;

}


exports.deleteUser = (accessToken, upn) => {

  //  const route = 'https://graph.microsoft.com/beta/users/' + upn;

    const route = config.apiBase + '/' + config.apiVersion + '/users/' + upn;

    var deferred = Q.defer();

    request.delete(route, {
        auth: {
            bearer: accessToken
        }
    }, function (err, response, body) {
        var parsedBody = JSON.parse(body);
        //   console.log(parsedBody);
        if (err) {
            deferred.reject(err);
        } else {
            // The value of the body will be an array of all users.
            deferred.resolve(parsedBody);
        }
    });
    return deferred.promise;

}

exports.licenseUser = (accessToken, upn, requestParams) => {


    //  const route = 'https://graph.microsoft.com/beta/users/';

    const route = config.apiBase + '/' + config.apiVersion + '/users/' + upn + '/assignLicense';

    const requestBody = requestParams;


    //console.log(accessToken);
    //console.log(JSON.stringify(requestBody));

    var deferred = Q.defer();

    request.post({
        url: route,
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(requestBody)
    }, function (err, response, body) {
        var parsedBody = JSON.parse(body);
        //  console.log(parsedBody);
        if (err) {
            deferred.reject(err);
        } else {
            // The value of the body will be an array of all users.
            deferred.resolve(parsedBody);
        }
    });
    return deferred.promise;

}

exports.getUserDevices = (accessToken, upn, requestParams) => {


    //  const route = 'https://graph.microsoft.com/beta/users/';

    const route = config.apiBase + '/' + config.apiVersion + '/users/' + upn + '/managedDevices';

    const requestBody = requestParams;


    //console.log(accessToken);
    //console.log(JSON.stringify(requestBody));

    var deferred = Q.defer();

    request.get({
        url: route,
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify(requestBody)
    }, function (err, response, body) {
        var parsedBody = JSON.parse(body);
        //  console.log(parsedBody);
        if (err) {
            deferred.reject(err);
        } else {
            // The value of the body will be an array of all users.
            deferred.resolve(parsedBody);
        }
    });
    return deferred.promise;

}

exports.wipeUserDevice = (accessToken, upn, devices, requestParams) => {


    //  const route = 'https://graph.microsoft.com/beta/users/';



    const requestBody = requestParams;
    var i;


    //console.log(accessToken);
    //console.log(JSON.stringify(requestBody));

    var deferred = Q.defer();


    // Loop through the device array. Get the ID for each device and wipe it.
    for (i = 0; i<devices.length; i++) {

        const route = config.apiBase + '/' + config.apiVersion + '/users/' + upn + '/managedDevices/' + devices[i].id + '/wipe';



        request.post({
            url: route,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify(requestBody)
        }, function (err, response, body) {
            var parsedBody = JSON.parse(body);
            //  console.log(parsedBody);
            if (err) {
                deferred.reject(err);
            } else {
                // The value of the body will be an array of all users.
                deferred.resolve(parsedBody);
            }
        });
    }
    return deferred.promise;

}
;