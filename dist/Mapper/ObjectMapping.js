"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Id_1 = require("../DataType/Id");
var ObjectMapping = /** @class */ (function () {
    function ObjectMapping() {
        this.fields = {};
        this.idField = null;
    }
    ObjectMapping.prototype.addField = function (name, type) {
        if (type instanceof Id_1.IdType) {
            this.idField = name;
        }
        this.fields[name] = type;
    };
    ObjectMapping.prototype.getFieldType = function (name) {
        if (!this.fields[name])
            return null;
        return this.fields[name];
    };
    ObjectMapping.prototype.getFields = function () {
        return this.fields;
    };
    ObjectMapping.prototype.getIdField = function () {
        return this.idField;
    };
    return ObjectMapping;
}());
exports.default = ObjectMapping;
//# sourceMappingURL=ObjectMapping.js.map