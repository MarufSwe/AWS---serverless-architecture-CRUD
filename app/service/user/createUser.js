const AppSyncExceptions = require("../../utils/AppSyncExceptions");
const Validator = require("validatorjs");
const createCognitoUser = require("../cognito/createCognitoUser");
const setCognitoUserPassword = require("../cognito/setCognitoUserPassword");

const createUser = async ({
    email = null,
    firstName = null,
    lastName = null,
    password = null,
    confirmPassword = null
})=>{
    try{
        checkValidation(email,password,confirmPassword,firstName,lastName);
        await createCognitoUser(email,firstName,lastName);
        await setCognitoUserPassword(email,password);
        return {
            message: "Cognito user created successful"
        }
    }catch(errors){
        throw errors;
    }
};

const checkValidation = (email, password,password_confirmation,firstName,lastName) => {
    let validation = new Validator(
      {
        email: email,
        password: password,
        password_confirmation:password_confirmation,
        firstName: firstName,
        lastName: lastName
      },
      {
        email: "required|email",
        firstName: "present",
        lastName: "present",
        password: "required|min:8|max:32|confirmed",
        password_confirmation: "required|min:8|max:32"
      }
    );
    if (validation.fails()) {
      throw new AppSyncExceptions(
        "ValidationExceptions",
        JSON.stringify(validation.errors)
      );
    }
  };



module.exports = createUser;