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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneToMany = void 0;
var Type_1 = require("./Type");
var MappingHelper_1 = __importDefault(require("../Mapper/MappingHelper"));
var Database_1 = __importDefault(require("../Database"));
var ModelMapper_1 = __importDefault(require("../Mapper/ModelMapper"));
var OneToMany = /** @class */ (function (_super) {
    __extends(OneToMany, _super);
    function OneToMany(entityName) {
        var _this = _super.call(this) || this;
        _this.entityName = null;
        _this.entityName = entityName;
        return _this;
    }
    OneToMany.prototype.normalize = function (data) {
        var e_1, _a;
        var model = Database_1.default.getModel(this.entityName);
        var idField = MappingHelper_1.default.getObjectIdFieldName(model);
        if (!Array.isArray(data))
            return [];
        var returnArray = [];
        try {
            for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                var entityData = data_1_1.value;
                var entity = Database_1.default.get(model, entityData[idField]);
                if (!entity) {
                    entity = ModelMapper_1.default.persist(entityData, model);
                }
                returnArray.push(entity);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return returnArray;
    };
    return OneToMany;
}(Type_1.Type));
exports.OneToMany = OneToMany;
exports.default = (function (entityName) {
    var type = new OneToMany(entityName);
    return MappingHelper_1.default.getTypeDecorator(type);
});
//# sourceMappingURL=OneToMany.js.map