import String from "../../src/DataType/String";
import Model from "../../src/Model";
import Id from "../../src/DataType/Id";
import ManyToOne from "../../src/DataType/ManyToOne";
import Post from "./Post";
import EntityName from "../../src/Database/Decorator/EntityName";
import Database from "../../src/Database/Decorator/Database";
import database from "./db";

@Database(database)
@EntityName('comment')
export default class Comment extends Model {
    @Id()
    @String()
    id: string = ''

    @String()
    content: string = ''

    @ManyToOne('post')
    post: Post = null
}