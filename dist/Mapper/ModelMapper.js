"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MappingHelper_1 = __importDefault(require("./MappingHelper"));
var Database_1 = __importDefault(require("../Database"));
var ModelMapper = /** @class */ (function () {
    function ModelMapper() {
    }
    ModelMapper.map = function (data, model) {
        var fields = MappingHelper_1.default.getMappedFields(model);
        for (var field in fields) {
            if (data[field]) {
                model[field] = fields[field].normalize(data[field]);
            }
        }
    };
    ModelMapper.persist = function (data, model) {
        var entity = new (model)();
        var idFieldName = MappingHelper_1.default.getObjectIdFieldName(entity);
        if (data[idFieldName]) {
            entity[idFieldName] = data[idFieldName];
        }
        Database_1.default.persist(entity);
        this.map(data, entity);
        return entity;
    };
    return ModelMapper;
}());
exports.default = ModelMapper;
//# sourceMappingURL=ModelMapper.js.map