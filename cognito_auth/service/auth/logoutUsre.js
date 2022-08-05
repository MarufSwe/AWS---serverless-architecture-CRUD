const {CognitoIdentityProviderClient} = require('@aws-sdk/client-cognito-identity-provider');

const cognitoAdminSignOut = require("../cognito/cognitoAdminLogOut")

const logoutUser = async (identity)=>{
    try{
        const cognitoClient = new CognitoIdentityProviderClient();
        await cognitoClient.send(cognitoAdminSignOut(identity.username));
        return {message: "You have successfully logged out"}
    }catch(errors){
        throw errors
    }
}


module.exports = logoutUser