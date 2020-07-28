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
exports.IdType = void 0;
var Type_1 = require("./Type");
var MappingHelper_1 = __importDefault(require("../Mapper/MappingHelper"));
var IdType = /** @class */ (function (_super) {
    __extends(IdType, _super);
    function IdType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IdType.prototype.normalize = function (data) {
        return data.toString();
    };
    return IdType;
}(Type_1.Type));
exports.IdType = IdType;
exports.default = (function () {
    var type = new IdType();
    return MappingHelper_1.default.getTypeDecorator(type);
});
//# sourceMappingURL=Id.js.map