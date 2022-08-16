const { UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { isEmptyCheck } = require("../utils/helpers");

const updateMonthlyCategoryItem = ({
    PK,
    SK,
    status = null,
    backgroundImage = null,
    boardText = null,
    symbolImage = null,
    title = null,
}) => {
    const dateTimeStamp = new Date();
    let updateAttributes = {
        TableName: process.env.dynamodb_table,
        Key: {
            PK: PK,
            SK: SK
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

    typeof status === "boolean" && (
        updateAttributes = {
            ...updateAttributes,
            ExpressionAttributeNames: {
                ...updateAttributes.ExpressionAttributeNames,
                "#status": 'status',
            },
            ExpressionAttributeValues: {
                ...updateAttributes.ExpressionAttributeValues,
                ":status": status,
            },
            UpdateExpression: `${updateAttributes.UpdateExpression}, #status = :status`

        }
    )

    isEmptyCheck(backgroundImage) && (
        updateAttributes = {
            ...updateAttributes,
            ExpressionAttributeNames: {
                ...updateAttributes.ExpressionAttributeNames,
                "#backgroundImage": 'backgroundImage',
            },
            ExpressionAttributeValues: {
                ...updateAttributes.ExpressionAttributeValues,
                ":backgroundImage": backgroundImage,
            },
            UpdateExpression: `${updateAttributes.UpdateExpression}, #backgroundImage = :backgroundImage`

        }
    )

    isEmptyCheck(symbolImage) && (
        updateAttributes = {
            ...updateAttributes,
            ExpressionAttributeNames: {
                ...updateAttributes.ExpressionAttributeNames,
                "#symbolImage": 'symbolImage',
            },
            ExpressionAttributeValues: {
                ...updateAttributes.ExpressionAttributeValues,
                ":symbolImage": symbolImage,
            },
            UpdateExpression: `${updateAttributes.UpdateExpression}, #symbolImage = :symbolImage`

        }
    )

    isEmptyCheck(boardText) && (
        updateAttributes = {
            ...updateAttributes,
            ExpressionAttributeNames: {
                ...updateAttributes.ExpressionAttributeNames,
                "#boardText": 'boardText',
            },
            ExpressionAttributeValues: {
                ...updateAttributes.ExpressionAttributeValues,
                ":boardText": boardText,
            },
            UpdateExpression: `${updateAttributes.UpdateExpression}, #boardText = :boardText`

        }
    )

    isEmptyCheck(title) && (
        updateAttributes = {
            ...updateAttributes,
            ExpressionAttributeNames: {
                ...updateAttributes.ExpressionAttributeNames,
                "#title": 'title',
            },
            ExpressionAttributeValues: {
                ...updateAttributes.ExpressionAttributeValues,
                ":title": title,
            },
            UpdateExpression: `${updateAttributes.UpdateExpression}, #title = :title`

        }
    )

    return new UpdateCommand(updateAttributes)
}

module.exports = updateMonthlyCategoryItem