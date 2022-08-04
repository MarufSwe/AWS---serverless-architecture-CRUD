const getCognitoUserIdentities = require("./service/auth/getCognitoUserIdentities");
const getIamUserIdentities = require("./service/auth/getIamUserIdentities");
const loginUser = require("./service/auth/loginUser");
const createUser = require("./service/user/createUser");

module.exports.adminAuth = async (event, context, callback) => {
  console.log(JSON.stringify(event));
  
  let response = "";

  try {
    switch (event.info.fieldName) {
      case "registerNewUser":
        response = await createUser({...event.arguments.input})
        break;
      case "loginUser":
        response = await loginUser(event.arguments);
        break;
      case "regenerateIamUserIdentities":
        response = await getIamUserIdentities(event.request.headers,event.identity);
        break;
      case "regenerateCognitoUserIdentities":
        response = await getCognitoUserIdentities(event.request.headers);
        break;
      default:
        throw new CustomError(
          "GraphQlError",
          "No query or mutation found for operation"
        );
        break;
    }
    callback(
      null,
      typeof response.length === "undefined" ? { ...response } : response
    );
  } catch (error) {
    callback(error);
  }
};