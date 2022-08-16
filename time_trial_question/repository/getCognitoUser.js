const { AdminGetUserCommand } = require('@aws-sdk/client-cognito-identity-provider')


const getCognitoUser = (userAlias) => {
    return new AdminGetUserCommand({
        "Username": userAlias,
        "UserPoolId": process.env.user_pool_id
    })
}



module.exports = getCognitoUser