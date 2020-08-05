import String from "../../src/DataType/String";
import Model from "../../src/Model";
import Id from "../../src/DataType/Id";
import ManyToOne from "../../src/DataType/ManyToOne";
import Post from "./Post";
import database from "./db";
import Entity from "../../src/Database/Decorator/Entity";

@Entity({
    name: 'comment',
    database: database
})
export default class Comment extends Model {
    @Id()
    @String()
    id: string = ''

    @String()
    content: string = ''

    @ManyToOne('post')
    post: Post = null
}