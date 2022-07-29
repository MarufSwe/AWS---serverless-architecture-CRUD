const lambdaPlayground = require('graphql-playground-middleware-lambda').default

exports.playgroundHandler = lambdaPlayground({
  endpoint: process.env.graphql_api_url
})