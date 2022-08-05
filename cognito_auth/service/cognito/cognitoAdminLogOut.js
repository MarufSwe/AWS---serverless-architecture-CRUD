const { AdminUserGlobalSignOutCommand } = require("@aws-sdk/client-cognito-identity-provider");

const cognitoAdminSignOut = (userName)=>{
    return new AdminUserGlobalSignOutCommand({
        UserPoolId: process.env.user_pool_id, /* required */
        Username: userName /* required*/
    })
}


module.exports = cognitoAdminSignOut