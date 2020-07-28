"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MappingHelper_1 = __importDefault(require("./Mapper/MappingHelper"));
var Database = /** @class */ (function () {
    function Database() {
        this.models = {};
        this.entites = {};
    }
    Database.prototype.register = function (model) {
        this.models[model.entity] = model;
    };
    Database.prototype.getModel = function (entityName) {
        return this.models[entityName];
    };
    Database.prototype.getModels = function () {
        return this.models;
    };
    Database.prototype.persist = function (entity) {
        this.entites[entity.constructor['entity']] = {};
        var id = MappingHelper_1.default.getObjectId(entity);
        if (id) {
            this.entites[entity.constructor['entity']][id] = entity;
        }
    };
    Database.prototype.get = function (model, id) {
        if (!this.entites[model.entity])
            return null;
        if (!this.entites[model.entity][id])
            return null;
        return this.entites[model.entity][id];
    };
    return Database;
}());
var database = new Database();
exports.default = database;
//# sourceMappingURL=Database.js.map