/**
 * Aws service module
 * @module utils/AWS
 */

 const AWS_SDK = require("aws-sdk"); // aws javascript sdk version 2


 /** 
  * Class representing aws service intreface object. 
  * @author Arman Azad <armanazad.sakib@gmail.com>
 */
 class AWS {
     /**
      * Constructs a service interface object. Each API operation is exposed as a function on service.
      */
     constructor() {
         this.dynamodb = new AWS_SDK.DynamoDB();
         this.dynamodbConvertAttributes = AWS_SDK.DynamoDB.Converter;
         this.cognitoIdentityServiceProvider = new AWS_SDK.CognitoIdentityServiceProvider();
         this.cognitoIdentity = new AWS_SDK.CognitoIdentity();
         this.cognitoUserPoolId = process.env.user_pool_id;
         this.cognitoUserPoolClientId = process.env.client_id;
         this.cognitoIdentityId = process.env.identity_pool_id;
         this.awsRegion = process.env.aws_region;
         this.IdentityProviderName = `cognito-idp.${this.awsRegion}.amazonaws.com/${this.cognitoUserPoolId}`
     }
 }
 
 /**
  * We are going to take advantage of Node.JS module caching mechanism.
  * Here we export the instance of the class
  * visit for more details this link
  * Link: https://nodejs.org/api/modules.html#modules_caching
  * Node.JS will cache and reuse the same object each time it’s required.
  */
 
 module.exports = new AWS();