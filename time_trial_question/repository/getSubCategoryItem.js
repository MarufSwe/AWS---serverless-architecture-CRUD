const { GetCommand } = require("@aws-sdk/lib-dynamodb")

const getSubCategoryItem = ({PK})=>{
    return new GetCommand({
        TableName:process.env.dynamodb_table,
        Key:{
            PK:PK,
            SK:PK
        },
    })
}

module.exports = getSubCategoryItem