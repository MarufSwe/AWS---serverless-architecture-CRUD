const AWS = require("../../utils/AWS");

const setCognitoUserPassword = (
    email,
    password
) => {
    return AWS.cognitoIdentityServiceProvider.adminSetUserPassword({
        UserPoolId: AWS.cognitoUserPoolId,
        Username: email,
        Password: password,
        Permanent: true
    }).promise().then((cognitoResponses) => cognitoResponses).catch((cognitoErrors) => {
        throw cognitoErrors
    })
}


module.exports = setCognitoUserPassword