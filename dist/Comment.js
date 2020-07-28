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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var String_1 = __importDefault(require("./DataType/String"));
var Model_1 = __importDefault(require("./Model"));
var Id_1 = __importDefault(require("./DataType/Id"));
var ManyToOne_1 = __importDefault(require("./DataType/ManyToOne"));
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = '';
        _this.content = '';
        _this.post = null;
        return _this;
    }
    Comment.entity = 'comment';
    __decorate([
        Id_1.default()
    ], Comment.prototype, "id", void 0);
    __decorate([
        String_1.default()
    ], Comment.prototype, "content", void 0);
    __decorate([
        ManyToOne_1.default('post')
    ], Comment.prototype, "post", void 0);
    return Comment;
}(Model_1.default));
exports.default = Comment;
//# sourceMappingURL=Comment.js.map