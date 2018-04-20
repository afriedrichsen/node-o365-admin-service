const Joi = require('joi');

module.exports = {

    createUser: {
        body: {
           // email: Joi.string().email().required(),
           // password: Joi.string().min(6).max(128).required(),
           // name: Joi.string().max(128),
            accountEnabled: Joi.boolean().required(),
            city: Joi.string().max(128),
            country: Joi.string().max(128),
            department: Joi.string().max(128),
            displayName: Joi.string().max(128).required(),
            givenName: Joi.string().max(128).required,
            jobTitle: Joi.string().max(128),
            mailNickname: Joi.string().max(128),
            passwordPolicies: Joi.string().max(128).required(),
            passwordProfile: {
                password: Joi.string().min(8).max(128).required(),
                forceChangePasswordNextSignIn: Joi.boolean().required()
            },
            officeLocation: Joi.string().max(128),
            postalCode: Joi.string().max(128),
            preferredLanguage: Joi.string().max(128),
            state: Joi.string().max(128),
            streetAddress: Joi.string().max(128),
            surname: Joi.string().max(128).required(),
            mobilePhone: Joi.string().max(64),
            usageLocation: Joi.string().max(10),
            userPrincipalName: Joi.string().max(255).required
        },
    },

    licenseUser: {
        body: {

            addLicenses: [
            {
                disabledPlans: [ Joi.string().max(128) ],
                skuId: Joi.string().max(128)
            }],
            removeLicenses: [Joi.string().max(128)]

        },
    },

};