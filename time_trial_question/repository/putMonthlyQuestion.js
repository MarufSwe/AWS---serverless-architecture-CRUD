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
            title: title.replace(/\s+/g, ' ').trim(),
            questionText: questionText.replace(/\s+/g, ' ').trim(),
            imageData: imageData,
            choiceA: choiceA.replace(/\s+/g, ' ').trim(),
            choiceB: choiceB.replace(/\s+/g, ' ').trim(),
            choiceC: choiceC.replace(/\s+/g, ' ').trim(),
            answer: answer.replace(/\s+/g, ' ').trim(),
            themePartitionKey:[themePartitionKey],
            createdAt: dateTimeStamp.toISOString(),
            createdBy: createdBy,
        },
        ConditionExpression: "attribute_not_exists(SK)",
    })
}

module.exports = putMonthlyQuestion;