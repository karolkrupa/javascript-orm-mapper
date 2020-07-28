"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectMapping_1 = __importDefault(require("./ObjectMapping"));
var MappingHelper = /** @class */ (function () {
    function MappingHelper() {
    }
    MappingHelper.addFieldMapping = function (target, name, type) {
        this.getObjectMapping(target).addField(name, type);
    };
    MappingHelper.getFieldMapping = function (target, name) {
        return this.getObjectMapping(target).getFieldType(name);
    };
    MappingHelper.getMappedFields = function (target) {
        return this.getObjectMapping(target).getFields();
    };
    MappingHelper.getObjectMapping = function (target) {
        // If model provided
        if (target['orm'])
            return target['orm'];
        // If entity provided
        if (!target.constructor['orm']) {
            target.constructor['orm'] = new ObjectMapping_1.default();
        }
        return target.constructor['orm'];
    };
    MappingHelper.getObjectId = function (target) {
        var idField = this.getObjectMapping(target).getIdField();
        if (!idField)
            return null;
        return target[idField];
    };
    MappingHelper.getObjectIdFieldName = function (target) {
        return this.getObjectMapping(target).getIdField();
    };
    MappingHelper.getTypeDecorator = function (type) {
        return function (target, propertyKey) {
            MappingHelper.getObjectMapping(target).addField(propertyKey, type);
        };
    };
    return MappingHelper;
}());
exports.default = MappingHelper;
//# sourceMappingURL=MappingHelper.js.map