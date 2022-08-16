const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { isEmptyCheck } = require("../utils/helpers");

const queryMonthlyThemeItem = ({ PK, Limit, ExclusiveStartKey = null, title = null }) => {

    let queryAttributes = {
        TableName: process.env.dynamodb_table,
        KeyConditionExpression: "#hashKey = :hashKey AND begins_with(#rangeKey, :rangeKey)",
        ScanIndexForward: false,
        Limit: Limit,
        ExpressionAttributeNames: {
            "#hashKey": 'PK',
            "#rangeKey": 'SK',
        },
        ExpressionAttributeValues: {
            ":hashKey": PK,
            ":rangeKey": 'theme#',
        },
        ReturnConsumedCapacity: "TOTAL",
    }
    ExclusiveStartKey && (queryAttributes = { ...queryAttributes, ExclusiveStartKey });

    isEmptyCheck(title) && (
        queryAttributes = {
            ...queryAttributes,
            FilterExpression: "contains(#title, :title)",
            ExpressionAttributeNames: {
                ...queryAttributes.ExpressionAttributeNames,
                "#title": 'title',
            },
            ExpressionAttributeValues: {
                ...queryAttributes.ExpressionAttributeValues,
                ":title": title,
            },
        }
    )

    return new QueryCommand(queryAttributes);
}

module.exports = queryMonthlyThemeItem