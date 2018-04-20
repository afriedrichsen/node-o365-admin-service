const httpStatus = require('http-status');
//const { omit } = require('lodash');

const { handler: errorHandler } = require('../middlewares/error');
const graph = require('../utils/graph');
const auth = require('../utils/auth');

exports.status = async (res, next) => {
    res.send("OK");
}


exports.getCloudUser = async (req, res, next) => {

    auth.getAccessToken().then((res, err) => {
        if (err) {
            console.log(err);
        }
        else {
            const t = res;
            //  console.log("Token is " + t)
            const upn = req.params.upn;
          //  console.log(upn);
            graph.getUserData(t, upn)
                .then((err, data) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(data);
                        //  res.send("sucess")
                    }
                });

        }
    });

}

exports.createCloudUser = async (req, res, next) => {
    try{
        const upn = req.body.userPrincipalName;
        const displayName = req.body.displayName;
        const anchor = req.body.onPremiseImmutableId;
        const passProfile = null;
        const nickName = null;

        // We get an access token.
        auth.getAccessToken().then((res, err) => {
           if (err) {
               console.log(err);
            }
            else {
                const t = res;
              //  console.log("Token is " + t)
               graph.createUser2(t, displayName, anchor, nickName, passProfile, upn)
                    .then((res, err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(res);
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
