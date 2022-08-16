const {PutCommand} = require("@aws-sdk/lib-dynamodb")

const putMonthlyThemeItem = ({PK,type,lastCreatedThemeMonth,lastCreatedThemeYear,backgroundImage,boardText,symbolImage,createdBy}) =>{
    const dateTimeStamp = new Date();
    let themeMonth = lastCreatedThemeMonth;
    let themeYear = lastCreatedThemeYear;
    if(lastCreatedThemeMonth === 12){
        themeMonth = 0;
        themeYear = lastCreatedThemeYear+1;
    }
    return new PutCommand({
        TableName: process.env.dynamodb_table,
        Item:{
            PK:PK,
            SK:`theme#${PK}#${themeYear}-${((themeMonth+1)+'').padStart(2,'0')}`,
            status: true,
            type:`${type}theme`,
            currentStatus: 'waiting',
            title: `${themeYear}/${themeMonth+1}`,
            backgroundImage:backgroundImage,
            boardText:boardText,
            symbolImage:symbolImage,
            createdAt: dateTimeStamp.toISOString(),
            updatedAt: null,
            createdBy: createdBy,
        },
        ConditionExpression: "attribute_not_exists(SK)",
    })
}

module.exports = putMonthlyThemeItem;