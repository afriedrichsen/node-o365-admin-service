const httpStatus = require('http-status');
//const { omit } = require('lodash');

const { handler: errorHandler } = require('../middlewares/error');
const graph = require('../utils/graph');
const auth = require('../utils/auth');

exports.status = async (res, next) => {
    res.send("OK");
}


exports.getCloudUser = async (req, res, next) => {
    try {

        //We get the access token asynchronously.
        auth.getAccessToken().then((token, notoken) => {
            if (notoken) {
                // Tell me why there isn't an access token...
                console.log(notoken);
            }
            //...otherwise, give me the access token and let me do what I need to.
            else {
                const t = token;
                //  console.log("Token is " + t)
                const upn = req.params.upn;
                //  console.log(upn);
                graph.getUserData(t, upn)
                    .then((data, nodata) => {
                        if (nodata) {
                            console.log(nodata)
                        }
                        else {
                            //console.log(data);
                            res.json(data);
                            //  res.send("sucess")
                        }
                    });

            }
        });
    }
    catch (error) {
        next(error);
    }
}

exports.createCloudUser = async (req, res, next) => {
    try{
        const upn = req.body.userPrincipalName;
        const displayName = req.body.displayName;
        const fn = req.body.givenName;
        const ln = req.body.surname
        const anchor = req.body.onPremisesImmutableID;
        const passProfile = req.body.passwordProfile;
        const passPolicies = req.body.passwordPolicies;
        const nickName = req.body.mailNickname;

        //We get the access token and perform our work asynchronously.
        auth.getAccessToken().then((token, notoken) => {
            if (notoken) {
                // Tell me why there isn't an access token...
                console.log(notoken);
            }
            //...otherwise, give me the access token and let me do what I need to.
            else {
                const t = token;
                //  console.log("Token is " + t)

                //  console.log(upn);
                graph.createUser(t, displayName, fn, ln, nickName, anchor, passPolicies, passProfile, upn)
                    .then((data, nodata) => {
                        if (nodata) {
                            console.log(nodata)
                        }
                        else {
                            //console.log(data);
                            res.json(data);
                            //  res.send("success")
                        }
                    });

            }
        });
    }
    catch (error) {
        next(error);
    }
}



exports.updateCloudUser = async (req, res, next) => {
    try{


        //We get the access token and perform our work asynchronously.
        auth.getAccessToken().then((token, notoken) => {
            if (notoken) {
                // Tell me why there isn't an access token...
                console.log(notoken);
            }
            //...otherwise, give me the access token and let me do what I need to.
            else {
                const t = token;
                //  console.log("Token is " + t)

                //  console.log(upn);
                graph.updateUser(t, req.params.upn, req.body)
                    .then((data, nodata) => {
                        if (nodata) {
                            console.log(nodata)
                        }
                        else {
                            console.log(data);
                            res.json({message: 'User ' + upn + ' succesfully updated!'});
                            //  res.send("success")
                        }
                    });

            }
        });
    }
    catch (error) {
        next(error);
    }
}

exports.deleteCloudUser = async (req, res, next) => {
    try {

        //We get the access token asynchronously.
        auth.getAccessToken().then((token, notoken) => {
            if (notoken) {
                // Tell me why there isn't an access token...
                console.log(notoken);
            }
            //...otherwise, give me the access token and let me do what I need to.
            else {
                const t = token;
                //  console.log("Token is " + t)
                const upn = req.params.upn;
                //  console.log(upn);
                graph.deleteUser(t, upn)
                    .then((data, nodata) => {
                        if (nodata) {
                            console.log(nodata)
                        }
                        else {
                            //console.log(data);
                            res.json({message: 'User ' + upn + ' succesfully deleted!'});
                            //  res.send("sucess")
                        }
                    });

            }
        });
    }
    catch (error) {
        next(error);
    }
}

;
