const { ScanCommand } = require("@aws-sdk/lib-dynamodb")
const { isEmptyCheck } = require("../utils/helpers")

const scanCountItem = ({
    PK,
    SK,
    title=null
})=>{
    let countAttributes = {
        TableName: process.env.dynamodb_table,
        FilterExpression: "begins_with(#rangeKey, :rangeKey)",
        // ConsistentRead: false,
        ExpressionAttributeNames: {
            "#rangeKey": 'SK',
        },
        ExpressionAttributeValues: {
            ":rangeKey": SK,
        },
        ReturnConsumedCapacity: "TOTAL",
        Select: "COUNT"
    };

    isEmptyCheck(title) && (
        countAttributes={
            ...countAttributes,
            FilterExpression: `${countAttributes.FilterExpression} AND contains(#title, :title)`,
            ExpressionAttributeNames: {
                ...countAttributes.ExpressionAttributeNames,
                "#title": 'title',
            },
            ExpressionAttributeValues: {
                ...countAttributes.ExpressionAttributeValues,
                ":title": title,
            },
        }
    )
    return new ScanCommand(countAttributes);
}

module.exports = scanCountItem