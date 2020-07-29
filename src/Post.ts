import String from "./DataType/String";
import Model from "./Model";
import Comment from "./Comment";
import Id from "./DataType/Id";
import OneToMany from "./DataType/OneToMany";
import EntityName from "./Database/Decorator/EntityName";
import Database from "./Database/Decorator/Database";
import database from "./db";


@Database(database)
@EntityName('post')
export default class Post extends Model {
    @Id()
    id: string = ''

    @String()
    name: string = ''

    @OneToMany('comment')
    comments: Comment[] = []

}