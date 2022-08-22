const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { isEmptyCheck } = require("../utils/helpers");
// const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// const DYNAMODB_CLIENT = new DynamoDBClient();
// const DYNAMODB_DOC_CLIENT = DynamoDBDocumentClient.from(DYNAMODB_CLIENT);

const queryMonthlyThemeItem = ({ PK, Limit, ExclusiveStartKey = null, title = null }) => {

    let queryAttributes = {
        TableName: "savvy",//.env.dynamodb_table,
        KeyConditionExpression: "#hashKey = :hashKey AND begins_with(#rangeKey, :rangeKey)",
        ScanIndexForward: false,
        ConsistentRead: true,
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
    };

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
    );

    return new QueryCommand(queryAttributes);
}


// const getMonthlyTimerTrialQuestionThemeList= async ({ categoryPrimaryKey, themePrimaryKey, perPage=1, pageNumber = 1, title }) => {
//     try {
//         // checkValidation({ action: "query", categoryPrimaryKey, themePrimaryKey, showingData, title });
//         let themeItemList,ExclusiveStartKey;
//         let paginatedItems = [];
//         do{
//             themeItemList = await DYNAMODB_DOC_CLIENT.send(queryMonthlyThemeItem({
//                 PK: categoryPrimaryKey,
//                 SK: themePrimaryKey,
//                 Limit: parseInt(perPage),
//                 ExclusiveStartKey: ExclusiveStartKey ?? null,
//                 title
//             }));
//             ExclusiveStartKey = themeItemList.LastEvaluatedKey;
//             paginatedItems = [...paginatedItems, ...themeItemList.Items];
//         }while(themeItemList.LastEvaluatedKey);
//         if(paginatedItems.length > 0){
//             console.log("page",{
//                 perPage:perPage,
//                 totalPage: Math.ceil(paginatedItems.length/perPage),
//                 totalItem: paginatedItems.length,
//                 currentPageNumber: pageNumber,
//                 from: ((pageNumber-1)*perPage)+1,
//                 to: ((pageNumber-1)*perPage)+1 === paginatedItems.length ? paginatedItems.length:pageNumber*perPage
//             });
//         }
//         console.log("items",paginatedItems.slice(((pageNumber-1)*perPage),pageNumber*perPage))
//     } catch (errors) {
//         throw errors
//     }
// }

// getMonthlyTimerTrialQuestionThemeList({
//     categoryPrimaryKey:"timetrialquestion#3eac30fe-43b9-4efd-be08-3c909bc7277d",
//     perPage:2,
//     pageNumber:1,
//     title:"20",
// });

module.exports = queryMonthlyThemeItem