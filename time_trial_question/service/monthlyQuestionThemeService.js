const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const Validator = require("validatorjs");
const AppSyncExceptions = require('../utils/AppSyncExceptions');
const { getCognitoIUseByUUID } = require("./cognitoUserService");
const { checkEmptyRecord, isMonthly, getUserUUID, isEmptyCheck } = require("../utils/helpers");
const getSubCategoryItem = require("../repository/getSubCategoryItem");
const putMonthlyThemeItem = require("../repository/putMonthlyThemeItem");
const updateMonthlyCategoryItem = require("../repository/updateMonthlyCategoryItem");
const getMonthlyThemeItem = require("../repository/getMonthlyThemeItem");
const queryMonthlyThemeItem = require("../repository/queryMonthlyTheme");
const updateSubCategoryItem = require("../repository/updateSubCategoryItem");

const DYNAMODB_CLIENT = new DynamoDBClient();
const DYNAMODB_DOC_CLIENT = DynamoDBDocumentClient.from(DYNAMODB_CLIENT);

module.exports = {
    createMonthlyTimerTrialQuestionTheme: async ({ categoryPrimaryKey, backgroundImage, boardText, symbolImage, cognitoIdentityAuthProvider }) => {
        try {
            checkValidation({ categoryPrimaryKey, backgroundImage, boardText, symbolImage });
            const LOGGED_USER_UUID = getUserUUID(cognitoIdentityAuthProvider);
            const categoryItem = await DYNAMODB_DOC_CLIENT.send(getSubCategoryItem({ PK: categoryPrimaryKey }));
            checkEmptyRecord(categoryItem);
            isMonthly(categoryItem);
            const userInfo = await getCognitoIUseByUUID({
                uuid: LOGGED_USER_UUID
            })
            await DYNAMODB_DOC_CLIENT.send(putMonthlyThemeItem({
                ...categoryItem.Item,
                backgroundImage,
                boardText,
                symbolImage,
                createdBy: userInfo.email,
            }));

            await DYNAMODB_DOC_CLIENT.send(
                updateSubCategoryItem({
                    PK: categoryPrimaryKey,
                    lastCreatedThemeMonth: categoryItem.Item.lastCreatedThemeMonth,
                    lastCreatedThemeYear: categoryItem.Item.lastCreatedThemeYear,
                }));

            return { message: "monthly theme created successfully." }
        } catch (errors) {
            throw errors;
        }
    },
    updateMonthlyTimerTrialQuestionTheme: async ({ themePrimaryKey, backgroundImage, boardText, symbolImage }) => {
        try {
            checkValidation({
                action: "update",
                themePrimaryKey,
                backgroundImage,
                boardText,
                symbolImage
            });

            const splitThemePrimaryKey = themePrimaryKey.split("#");

            await DYNAMODB_DOC_CLIENT.send(updateMonthlyCategoryItem({
                PK: `${splitThemePrimaryKey[1] ?? ''}#${splitThemePrimaryKey[2] ?? ''}`,
                SK: themePrimaryKey,
                backgroundImage,
                boardText,
                symbolImage
            }));

            return {
                message: "monthly theme updated successfully."
            }

        } catch (errors) {
            throw errors
        }
    },
    getMonthlyTimerTrialQuestionTheme: async ({ themePrimaryKey }) => {
        try {
            checkValidation({ action: 'get', themePrimaryKey })
            const splitThemePrimaryKey = themePrimaryKey.split("#");
            const themeItem = await DYNAMODB_DOC_CLIENT.send(getMonthlyThemeItem({
                PK: `${splitThemePrimaryKey[1] ?? ''}#${splitThemePrimaryKey[2] ?? ''}`,
                SK: themePrimaryKey
            }));
            checkEmptyRecord(themeItem);
            return themeItem.Item;
        } catch (errors) {
            throw errors
        }
    },
    getMonthlyTimerTrialQuestionThemeList: async ({ categoryPrimaryKey, themePrimaryKey, showingData, title }) => {
        try {
            checkValidation({ action: "query", categoryPrimaryKey, themePrimaryKey, showingData, title });
            const themeItemList = await DYNAMODB_DOC_CLIENT.send(queryMonthlyThemeItem({
                PK: categoryPrimaryKey,
                SK: themePrimaryKey,
                Limit: parseInt(showingData),
                ExclusiveStartKey: isEmptyCheck(themePrimaryKey) ? {
                    PK: categoryPrimaryKey,
                    SK: themePrimaryKey
                } : null,
                title
            }))
            return {
                lastEvaluatedKey: {
                    categoryPrimaryKey: themeItemList?.LastEvaluatedKey?.PK ?? null,
                    themePrimaryKey: themeItemList?.LastEvaluatedKey?.SK ?? null
                },
                themeList: themeItemList.Items
            }
        } catch (errors) {
            throw errors
        }
    }
}

const checkValidation = ({ action = null, themePrimaryKey, categoryPrimaryKey, backgroundImage, boardText, symbolImage, showingData }) => {

    let validation = new Validator(
        { themePrimaryKey, categoryPrimaryKey, backgroundImage, boardText, symbolImage, showingData },
        (action === "update") || (action === "get") ? {
            themePrimaryKey: "required",
            categoryPrimaryKey: "",
            showingData: "",
            backgroundImage: "url",
            boardText: "max:40",
            symbolImage: "url"
        } : action === "query" ? {
            themePrimaryKey: "",
            categoryPrimaryKey: "required",
            showingData: "required|integer",
            backgroundImage: "url",
            boardText: "max:40",
            symbolImage: "url"
        } : {
            themePrimaryKey: "",
            categoryPrimaryKey: "required",
            showingData: "",
            backgroundImage: "required|url",
            boardText: "required|max:40",
            symbolImage: "required|url"
        },
        {
            "required.themePrimaryKey": "the theme primary key filed is required.",
            "required.showingData": "the showing data filed is required.",
            "integer.showingData": "the showing data filed must be number.",
            "required.categoryPrimaryKey": "the category primary key filed is required.",
            "required.backgroundImage": "the background image url filed is required.",
            "url.backgroundImage": "the background image url format is invalid.",
            "required.boardText": "the board txt filed is required.",
            "max.boardText": "the board txt character is less than :max.",
            "required.symbolImage": "the symbol image url filed is required.",
            "url.symbolImage": "the symbol image url format is invalid.",
        }
    );

    if (validation.fails()) {
        throw new AppSyncExceptions("ValidationExceptions", validation.errors);
    }
};