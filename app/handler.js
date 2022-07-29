const getRefreshUserToken = require("./service/auth/getRefreshUserToken");
const getSessionTokenByIdentityId = require("./service/auth/getSessionTokenByIdentityId");
const loginUser = require("./service/auth/loginUser");
const createUser = require("./service/user/createUser");

module.exports.savvyApp = async (event, context, callback) => {
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
      case "getUserSecurityToken":
        response = await getSessionTokenByIdentityId(event.request.headers,event.identity);
        break;
      case "userRefreshToken":
        response = await getRefreshUserToken(event.request.headers);
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
