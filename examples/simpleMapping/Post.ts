import String from "../../src/DataType/String";
import Model from '../../src/Model'
import Comment from "./Comment";
import Id from "../../src/DataType/Id";
import OneToMany from "../../src/DataType/OneToMany";
import EntityName from "../../src/Database/Decorator/EntityName";
import Database from "../../src/Database/Decorator/Database";
import database from "./db";


@Database(database)
@EntityName('post')
export default class Post extends Model {
    @Id()
    @String()
    id: string = ''

    @String()
    name: string = ''

    @OneToMany('comment')
    comments: Comment[] = []

}