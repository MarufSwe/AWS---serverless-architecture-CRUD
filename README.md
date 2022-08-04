Setting Up Serverless Framework With AWS
Get started with Serverless Framework’s open-source CLI and AWS in minutes.

Installation
Install the serverless CLI via NPM:


Copied
npm install -g serverless
npm install -g serverless
Note: If you don’t already have Node on your machine, install it first. If you don't want to install Node or NPM, you can install serverless as a standalone binary.

Upgrade
You can upgrade the CLI later by running the same command: npm install -g serverless.

To upgrade to a specific major version, specify it like this: npm install -g serverless@2. If you installed serverless as a standalone binary, read this documentation instead.

Getting started
To create your first project, run the command below and follow the prompts:


Copied
# Create a new serverless project
serverless

# Move into the newly created directory
cd your-service-name
# Create a new serverless project
serverless
 
# Move into the newly created directory
cd your-service-name
The serverless command will guide you to:

create a new project
configure AWS credentials
optionally set up a free Serverless Dashboard account to monitor and troubleshoot your project
Note: users based in China get a setup centered around the chinese Tencent provider. To use AWS instead, set the following environment variable: SERVERLESS_PLATFORM_VENDOR=aws.

Your new serverless project should contain a serverless.yml file. This file defines what will be deployed to AWS: functions, events, resources and more. You can learn more about this in the Core Concepts documentation.

If the templates proposed by serverless do not fit your needs, check out the project examples from Serverless Inc. and our community. You can install any example by passing a GitHub URL using the --template-url option:


Copied
serverless --template-url=https://github.com/serverless/examples/tree/v3/...
serverless --template-url=https://github.com/serverless/examples/tree/v3/...
Deploying
If you haven't done so already within the serverless command, you can deploy the project at any time by running:


Copied
serverless deploy
serverless deploy
The deployed functions, resources and URLs will be displayed in the command output.

Learn more about deploying.

Invoking function
If you deployed an API, querying its URL will trigger the associated Lambda function. You can find that URL in the serverless deploy output, or retrieve it later via serverless info.

If you deployed a function that isn't exposed via a URL, you can invoke it via:


Copied
serverless invoke -f hello

# Invoke and display logs:
serverless invoke -f hello --log
serverless invoke -f hello
 
# Invoke and display logs:
serverless invoke -f hello --log
Fetching function logs
All logs generated by a function's invocation are automatically stored in AWS CloudWatch. Retrieve those logs in the CLI via:


Copied
serverless logs -f hello

# Tail logs
serverless logs -f hello --tail
serverless logs -f hello
 
# Tail logs
serverless logs -f hello --tail
Monitoring
You can monitor and debug Lambda functions and APIs via the Serverless Dashboard.

To set it up, run the following command in an existing project and follow the prompts:


Copied
serverless
serverless
Remove your service
If you want to delete your service, run serverless remove. This will delete all the AWS resources created by your project and ensure that you don't incur any unexpected charges. It will also remove the service from Serverless Dashboard.


Copied
serverless remove
serverless remove


aws cognito-idp admin-set-user-password \
  --user-pool-id us-east-1 \
  --username armanazad.sakib@gmail.com \
  --password cpl \
  --permanent