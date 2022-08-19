const {PutCommand} = require("@aws-sdk/lib-dynamodb")
const {v4:uuidv4}=require('uuid');

const putMonthlyQuestion = ({
    PK,
    type,
    status=true,
    currentStatus,
    title,
	questionText,
	imageData,
	choiceA,
	choiceB,
	choiceC,
	answer,
    themePartitionKey,
    createdBy
}) =>{
    const dateTimeStamp = new Date();
    const UUID = uuidv4();
    return new PutCommand({
        TableName: process.env.dynamodb_table,
        Item:{
            PK:PK,
            SK:`question#${UUID}#${PK}`,
            type:`${type}question`,
            currentStatus: currentStatus,
            status: status,
            title: title,
            questionText: questionText,
            imageData: imageData,
            choiceA: choiceA,
            choiceB: choiceB,
            choiceC: choiceC,
            answer: answer,
            themePartitionKey:[themePartitionKey],
            createdAt: dateTimeStamp.toISOString(),
            createdBy: createdBy,
        },
        ConditionExpression: "attribute_not_exists(SK)",
    })
}

module.exports = putMonthlyQuestion;