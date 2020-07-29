import String from "./DataType/String";
import Model from "./Model";
import Id from "./DataType/Id";
import ManyToOne from "./DataType/ManyToOne";
import Post from "./Post";
import EntityName from "./Database/Decorator/EntityName";
import Database from "./Database/Decorator/Database";
import database from "./db";

@Database(database)
@EntityName('comment')
export default class Comment extends Model {
    @Id()
    id: string = ''

    @String()
    content: string = ''

    @ManyToOne('post')
    post: Post = null
}