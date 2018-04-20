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
/**
 * Generates a GET request the user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {string} upn  The user principal name to send with the request.
 * @param {Function} callback
 */
exports.getUserData = (accessToken, upn) => {

    const route = 'https://graph.microsoft.com/beta/users/' + upn;

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
        } else if (parsedBody.error) {
            deferred.reject(parsedBody.error.message);
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
exports.createUser = (accessToken, inputName, inputFN, inputLN, inputNickname, inputAnchor, inputPassPolicy, inputPassProfile, inputUPN) => {


    const route = 'https://graph.microsoft.com/beta/users/';

    const requestBody = {
        accountEnabled: true,
        displayName: inputName,
        givenName: inputFN,
        surname: inputLN,
        onPremisesImmutableID: inputAnchor,
        mailNickname: inputNickname,
        passwordPolicies: inputPassPolicy,
        passwordProfile: inputPassProfile,
        userPrincipalName: inputUPN
    };


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
        //   console.log(parsedBody);
        if (err) {
            deferred.reject(err);
        } else if (parsedBody.error) {
            deferred.reject(parsedBody.error.message);
        } else {
            // The value of the body will be an array of all users.
            deferred.resolve(parsedBody);
        }
    });
    return deferred.promise;

}


exports.deleteUser = (accessToken, upn) => {

    const route = 'https://graph.microsoft.com/beta/users/' + upn;

    var deferred = Q.defer();

    request.delete(route, {
        auth: {
            bearer: accessToken
        }
    }, function (err, response, body) {
        var parsedBody = JSON.parse(body);
           console.log(parsedBody);
        if (err) {
            deferred.reject(err);
        } else if (parsedBody.error) {
            deferred.reject(parsedBody.error.message);
        } else {
            // The value of the body will be an array of all users.
            deferred.resolve(parsedBody);
        }
    });
    return deferred.promise;

}