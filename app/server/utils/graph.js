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

const request = require('superagent');

/**
 * Generates a GET request the user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {Function} callback
 */
exports.getUserData = async (accessToken, callback) => {
    request
        .get('https://graph.microsoft.com/beta/me')
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
            callback(err, res);
        });
}

/**
 * Generates a POST request the (create) user endpoint.
 * @param {string} accessToken The access token to send with the request.
 * @param {Function} callback
 * */
exports.createUser = async(accessToken, callback) => {
    request
        .post('https://graph.microsoft.com/beta/friedunix/users/create')
        .send(req.body)
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            callback(err, res);
        });
}


exports.createUser2 = async(accessToken, inputName, inputAnchor, inputNickname, inputPassProfile, inputUPN, callback) => {
    request
        .post('https://graph.microsoft.com/beta/friedunix/users/create')
        .send({accountEnabled: true,
            displayName: inputName,
            onPremiseImmutableId: inputAnchor,
            mailNickname: inputNickname,
            passwordProfile: inputPassProfile,
            userPrincipalName: inputUPN })
        .set('Authorization', 'Bearer ' + accessToken)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
            callback(err, res);
        });
}


exports.deleteMobileData = async (accessToken, callback) => {

}