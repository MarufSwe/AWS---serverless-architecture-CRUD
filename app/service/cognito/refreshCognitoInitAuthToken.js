const AWS = require("../../utils/AWS");

const refreshCognitoInitAuthToken = async (userRefreshToken) => {
  return AWS.cognitoIdentityServiceProvider
    .initiateAuth({
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: AWS.cognitoUserPoolClientId,
      AuthParameters: {
        REFRESH_TOKEN:userRefreshToken
      },
    })
    .promise()
    .then((responses) => responses.AuthenticationResult)
    .catch((errors) => {
      throw errors;
    });
};

module.exports = refreshCognitoInitAuthToken;
