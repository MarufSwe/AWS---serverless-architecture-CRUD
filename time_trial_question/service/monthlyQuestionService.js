const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const Validator = require("validatorjs");
const getSubCategoryItem = require("../repository/getSubCategoryItem");
const putMonthlyQuestion = require("../repository/putMonthlyQuestion");
const AppSyncExceptions = require('../utils/AppSyncExceptions');
const { isMonthly, checkEmptyRecord, getUserUUID } = require("../utils/helpers");
const { getCognitoIUseByUUID } = require("./cognitoUserService");

const DYNAMODB_CLIENT = new DynamoDBClient();
const DYNAMODB_DOC_CLIENT = DynamoDBDocumentClient.from(DYNAMODB_CLIENT);

module.exports = {
    createMonthlyTimerTrialQuestion: async ({ 	
        categoryThemeSortKey,
        title,
        questionText,
        imageData,
        choiceA,
        choiceB,
        choiceC,
        answer,
        currentStatus,
        cognitoIdentityAuthProvider
    }) => {
        try {
            checkValidationPutOrUpdate({  
                action:"put",      
                categoryThemeSortKey,
                title,
                questionText,
                imageData,
                choiceA,
                choiceB,
                choiceC,
                answer,
                currentStatus
            });
            
            const spiltSortKey = categoryThemeSortKey.split('#');
            const categoryItem = await DYNAMODB_DOC_CLIENT.send(getSubCategoryItem({
                PK:`${spiltSortKey[1]}#${spiltSortKey[2]}`
            }));
            checkEmptyRecord(categoryItem);
            isMonthly(categoryItem);

            const LOGGED_USER_UUID = getUserUUID(cognitoIdentityAuthProvider);
            const userInfo = await getCognitoIUseByUUID({
                uuid: LOGGED_USER_UUID
            })

            await DYNAMODB_DOC_CLIENT.send(putMonthlyQuestion({
                ...categoryItem.Item,
                PK:`${spiltSortKey[1]}#${spiltSortKey[2]}`,
                themePartitionKey: categoryThemeSortKey,
                title,
                questionText,
                imageData,
                choiceA,
                choiceB,
                choiceC,
                answer,
                currentStatus,
                createdBy: userInfo.email,
            }));
            return { message: "question created successfully for monthly theme." }
        } catch (errors) {
            throw errors;
        }
    },
    updateMonthlyTimerTrialQuestionTheme: async ({ 
        questionSortKey,
        title,
        questionText,
        imageData,
        choiceA,
        choiceB,
        choiceC,
        answer,
        currentStatus
     }) => {
        try {
            checkValidationPutOrUpdate({  
                action:"update",      
                questionSortKey,
                title,
                questionText,
                imageData,
                choiceA,
                choiceB,
                choiceC,
                answer,
                currentStatus
            });
            return {
                message: "question updated successfully for monthly theme."
            }

        } catch (errors) {
            throw errors
        }
    },
    getMonthlyTimerTrialQuestionTheme: async ({  }) => {
        try {
            
        } catch (errors) {
            throw errors
        }
    },
    getMonthlyTimerTrialQuestionThemeList: async ({  }) => {
        try {
            
        } catch (errors) {
            throw errors
        }
    }
}

const checkValidationPutOrUpdate = ({  
    action,      
    categoryThemeSortKey,
    title,
    questionText,
    imageData,
    choiceA,
    choiceB,
    choiceC,
    answer,
    currentStatus
}) => {

    let validation = new Validator(
        {
            categoryThemeSortKey,
            title,
            questionText,
            imageData,
            choiceA,
            choiceB,
            choiceC,
            answer,
            currentStatus
        },
        {
            categoryThemeSortKey : action == "put" ? "required":"",
            title: action == "put" ? "required|max:40":"max:40",
            questionSortKey : action == "update" ? "required":"",
            questionText : action == "put" ? "required|max:40":"max:40",
            imageData : action == "put" ? "required|url":"url",
            choiceA : action == "put" ? "required|max:20":"max:20",
            choiceB : action == "put" ? "required|max:20":"max:20",
            choiceC : action == "put" ? "required|max:20":"max:20",
            answer : action == "put" ? "required":"",
            currentStatus : action == "put" ? "required":"in:Published,Draft",
        },
        {
            "required.categoryThemeSortKey" : "the category theme sort key filed is required.",
            "required.title" : "the title filed is required.",
            "max.title": "the title may not be greater than :max characters.",
            "required.questionSortKey" : "the question sort key filed is required.",
            "required.questionText":"the question text filed is required.",
            "max.questionText": "the question text may not be greater than :max characters.",
            "required.imageData":"the image data filed is required.",
            "url.imageData":"the image data url format is invalid.",
            "required.choiceA":"the choice a filed is required.",
            "max.choiceA": "the choice a may not be greater than :max characters.",
            "required.choiceB":"the choice b filed is required.",
            "max.choiceB": "the choice b may not be greater than :max characters.",
            "required.choiceC":"the choice c filed is required.",
            "max.choiceC": "the choice c may not be greater than :max characters.",
            "required.answer":"the answer filed is required.",
            "required.currentStatus":"the current status filed is required.",
        }
    );

    if (validation.fails()) {
        throw new AppSyncExceptions("ValidationExceptions", validation.errors);
    }
};