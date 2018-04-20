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
 * @param {Function} callback
 */
exports.getUserData = (accessToken, upn) => {

    //const config = {headers: {'Authorization': "Bearer " + accessToken} }

    //console.log("Locating user..." + upn)
    //console.log(accessToken);
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
            deferred.resolve(parsedBody.value);
        }
    });
    return deferred.promise;

}

/**
 * Generates a POST request the (create) user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {Function} callback
 * */
//exports.createUser = async(accessToken, callback) => {
//    request
//        .post('https://graph.microsoft.com/beta/users')
//        .send(req.body)
//        .set('Authorization', 'Bearer ' + accessToken)
//        .set('Content-Type', 'application/json')
//        .end((err, res) => {
 //           callback(err, res);
//        });
//}


exports.createUser2 = (accessToken, inputName, inputAnchor, inputNickname, inputPassProfile, inputUPN) => {
 //   console.log(accessToken);
  /*  request
        .post('https://graph.microsoft.com/beta/users')
        .send({accountEnabled: true,
            displayName: inputName,
            onPremiseImmutableId: inputAnchor,
            mailNickname: inputNickname,
            passwordProfile: inputPassProfile,
            userPrincipalName: inputUPN })
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Content-Type', 'application/json')
        .then((err, res) => {
          //  callback(err, res);
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
            }
        });*/
  /*
    const config = {headers: {'Authorization': "Bearer " + accessToken} }
    console.log(config)
    console.log("Creating user..." +inputName)

    request.post('https://graph.microsoft.com/beta/users', {
        accountEnabled: true,
        displayName: inputName,
        onPremiseImmutableId: inputAnchor,
        mailNickname: inputNickname,
        passwordProfile: inputPassProfile,
        userPrincipalName: inputUPN
    }, config).then((err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(res);
        }
    });
    */

}