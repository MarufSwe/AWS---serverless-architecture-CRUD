const AWS = require("../../utils/AWS");

const createCognitoUser = (
    email,
    firstName,
    lastName
) => {
    return AWS.cognitoIdentityServiceProvider.adminCreateUser({
        UserPoolId: AWS.cognitoUserPoolId, /* required */
        Username: email, /* required */
        ForceAliasCreation: false,
        MessageAction: "SUPPRESS",
        UserAttributes: [
            {
                Name: 'email', /* required */
                Value: email
            },
            {
                Name: 'email_verified',
                Value: 'true'
            },
            {
                Name: 'name',
                Value: `${firstName ?? ''}${lastName ?? ''}`
            }
        ]
    }).promise().then((cognitoResponses) => cognitoResponses).catch((cognitoErrors) => {
        throw cognitoErrors
    })
}


module.exports = createCognitoUser