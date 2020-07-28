"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManyToOne = void 0;
var Type_1 = require("./Type");
var MappingHelper_1 = __importDefault(require("../Mapper/MappingHelper"));
var Database_1 = __importDefault(require("../Database"));
var ModelMapper_1 = __importDefault(require("../Mapper/ModelMapper"));
var ManyToOne = /** @class */ (function (_super) {
    __extends(ManyToOne, _super);
    function ManyToOne(modelName) {
        var _this = _super.call(this) || this;
        _this.entityName = null;
        _this.entityName = modelName;
        return _this;
    }
    ManyToOne.prototype.normalize = function (data) {
        var model = Database_1.default.getModel(this.entityName);
        var idField = MappingHelper_1.default.getObjectIdFieldName(model);
        if (!data[idField])
            return null;
        var entity = Database_1.default.get(model, data[idField]);
        if (!entity) {
            entity = ModelMapper_1.default.persist(data, model);
        }
        return entity;
    };
    return ManyToOne;
}(Type_1.Type));
exports.ManyToOne = ManyToOne;
exports.default = (function (entityName) {
    var type = new ManyToOne(entityName);
    return MappingHelper_1.default.getTypeDecorator(type);
});
//# sourceMappingURL=ManyToOne.js.map