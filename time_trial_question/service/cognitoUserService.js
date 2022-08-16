const {CognitoIdentityProviderClient} = require('@aws-sdk/client-cognito-identity-provider');
const getCognitoUser = require('../repository/getCognitoUser');
const COGNITO_IDENTITY_PROVIDER_CLIENT = new CognitoIdentityProviderClient();
module.exports = {
    getCognitoIUseByUUID : async ({uuid})=>{
        try{
            const cognitoUserInfo = await COGNITO_IDENTITY_PROVIDER_CLIENT.send(getCognitoUser(uuid));
            let userInfo = {};
            cognitoUserInfo.UserAttributes.map((info)=>{
                userInfo={
                    ...userInfo,
                    [info.Name]:info.Value
                }
            })
            return userInfo;
        }catch(errors){
            throw errors
        }
    }
}