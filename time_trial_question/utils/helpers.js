const AppSyncExceptions = require("./AppSyncExceptions");

module.exports = {
    checkEmptyRecord: (Objects) => {
        if (typeof Objects.Item === "undefined") {
            throw new AppSyncExceptions('NotFoundException', 'woops! no record found.');
        }
        return true;
    },
    isMonthly: (Objects) => {
        if (typeof Objects.Item.type === "monthly") {
            throw new AppSyncExceptions('CreationException', 'theme can be created only for monthly question.');
        }
        return true;
    },
    getUserUUID: (stringValue) => {
        const splitStringValue = stringValue.split(":");
        return splitStringValue[2].replace('\"', '');
    },
    isEmptyCheck: (stringValue) => {
        if (typeof stringValue === "number") return true;
        return stringValue?.length >= 0 ? (stringValue.trim().length > 0 ? true : false) : false;
    }
};