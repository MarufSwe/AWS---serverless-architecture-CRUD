const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { isEmptyCheck } = require("../utils/helpers");

const updateSubCategoryItem = ({PK,lastCreatedThemeMonth,lastCreatedThemeYear})=>{

    const dateTimeStamp = new Date();
    let updateAttributes = {
        TableName: process.env.dynamodb_table,
        Key: {
            PK: PK,
            SK: PK
        },
        ExpressionAttributeNames: {
            '#updatedAt': "updatedAt",
        },
        ExpressionAttributeValues: {
            ':updatedAt': dateTimeStamp.toISOString(),
        },
        UpdateExpression: "SET #updatedAt = :updatedAt",
        ConditionExpression: "attribute_exists(SK)"
    };

    isEmptyCheck(lastCreatedThemeMonth) && isEmptyCheck(lastCreatedThemeYear) && (
        updateAttributes = {
            ...updateAttributes,
            ExpressionAttributeNames: {
                ...updateAttributes.ExpressionAttributeNames,
                "#lastCreatedThemeMonth": 'lastCreatedThemeMonth',
                "#lastCreatedThemeYear": 'lastCreatedThemeYear',
            },
            ExpressionAttributeValues: {
                ...updateAttributes.ExpressionAttributeValues,
                ":lastCreatedThemeMonth": lastCreatedThemeMonth === 12 ? 1:lastCreatedThemeMonth + 1 ,
                ":lastCreatedThemeYear": lastCreatedThemeMonth === 12 ? lastCreatedThemeYear+1:lastCreatedThemeYear,
            },
            UpdateExpression: `${updateAttributes.UpdateExpression}, #lastCreatedThemeMonth = :lastCreatedThemeMonth, #lastCreatedThemeYear = :lastCreatedThemeYear`

        }
    )

    console.log(updateAttributes);


    return new UpdateCommand(updateAttributes)
}

module.exports = updateSubCategoryItem