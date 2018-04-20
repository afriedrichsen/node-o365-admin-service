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
        const anchor = req.body.onPremiseImmutableId;
        const passProfile = null;
        const nickName = null;

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
};
