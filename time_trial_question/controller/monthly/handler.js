const { 
    createMonthlyTimerTrialQuestionTheme,
    updateMonthlyTimerTrialQuestionTheme, 
    getMonthlyTimerTrialQuestionTheme, 
    getMonthlyTimerTrialQuestionThemeList
} = require("../../service/monthlyQuestionThemeService");
const AppSyncExceptions = require("../../utils/AppSyncExceptions");

module.exports.monthlyHandler = async (event, context, callback) => {
    try {
        let graphqlResponses = ""

        switch (event.info.fieldName) {
            case "createMonthlyTimerTrialQuestionTheme":
                graphqlResponses = await createMonthlyTimerTrialQuestionTheme({ ...event.arguments.input, ...event.identity });
                break;
            case "updateMonthlyTimerTrialQuestionTheme":
                graphqlResponses = await updateMonthlyTimerTrialQuestionTheme({...event.arguments.input})
                break;
            case "getMonthlyTimerTrialQuestionTheme":
                graphqlResponses = await getMonthlyTimerTrialQuestionTheme({...event.arguments});
                break;
            case "getMonthlyTimerTrialQuestionThemeList":
                graphqlResponses = await getMonthlyTimerTrialQuestionThemeList({...event.arguments});
                break;
            default:
                throw new AppSyncExceptions("InvalidGraphqlRequest","invalid graphql query or mutation");
                break;
        }
        callback(
            null,
            typeof graphqlResponses.length === "undefined"
                ? { ...graphqlResponses } : graphqlResponses
        );
    } catch (errors) {
        callback(errors)
    }
}