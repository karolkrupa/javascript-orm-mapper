"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ModelMapper_1 = __importDefault(require("./Mapper/ModelMapper"));
var Database_1 = __importDefault(require("./Database"));
var Post_1 = __importDefault(require("./Post"));
var Comment_1 = __importDefault(require("./Comment"));
Database_1.default.register(Post_1.default);
Database_1.default.register(Comment_1.default);
var model = ModelMapper_1.default.persist({
    id: 1,
    name: 123,
    comments: [
        {
            id: 1,
            content: "Lorem ipsum",
            post: {
                id: 1
            }
        }
    ]
}, Post_1.default);
console.log(model);
//# sourceMappingURL=test.js.map