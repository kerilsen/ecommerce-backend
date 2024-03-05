// const errorCodes = require('./errorCodes');

const modelOperation = async (Model, operation, conditions) => {
    try {
        console.log(`modelOperation has been called with these parameters: ${Model}, ${operation}, ${conditions}`);
        let result;
        switch (operation) {
            case 'create':
                result = await Model.create(conditions);
                break;
            case 'findAll':
                result = await Model.findAll(conditions);
                break;
            case 'findOne':
                result = await Model.findOne(conditions);
                break;
            case 'delete':
                result = await Model.destroy(conditions);
                break;
            case 'update':
                result = await Model.update(conditions);
                break;
            default:
                throw new Error('Operation not supported');
        }
        return result;
    } catch (error) {
        throw new Error(`Error performing ${operation} operation on ${Model}: ${error.message}`);
    }
};

module.exports = modelOperation;
