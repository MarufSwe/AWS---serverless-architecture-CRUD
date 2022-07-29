const AWS = require("../../utils/AWS");

const getCognitoIdentity = async (userIdToken) => {
  return AWS.cognitoIdentity
    .getId({
      IdentityPoolId: AWS.cognitoIdentityId,
      Logins: {
        [AWS.IdentityProviderName]: userIdToken,
      },
    })
    .promise()
    .then((userIdentityId) => userIdentityId.IdentityId)
    .catch((errors) => {
      throw errors;
    });
};

module.exports = getCognitoIdentity;
