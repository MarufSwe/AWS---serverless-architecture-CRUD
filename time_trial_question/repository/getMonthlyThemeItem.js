const { GetCommand } = require("@aws-sdk/lib-dynamodb")

const getMonthlyThemeItem = ({PK,SK})=>{
    return new GetCommand({
        TableName: process.env.dynamodb_table,
        Key:{
            PK:PK,
            SK:SK
        }
    })
}

module.exports = getMonthlyThemeItem