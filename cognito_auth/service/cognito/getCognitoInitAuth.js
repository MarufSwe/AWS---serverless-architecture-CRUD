const AWS = require("../../utils/AWS");

const getCognitoInitAuth = async (email, password) => {
  return AWS.cognitoIdentityServiceProvider
    .initiateAuth({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: AWS.cognitoUserPoolClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    })
    .promise()
    .then((responses) => responses.AuthenticationResult)
    .catch((errors) => {
      throw errors;
    });
};

module.exports = getCognitoInitAuth;
