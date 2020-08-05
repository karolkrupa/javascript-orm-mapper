import String from "../../src/DataType/String";
import Model from '../../src/Model'
import Comment from "./Comment";
import Id from "../../src/DataType/Id";
import OneToMany from "../../src/DataType/OneToMany";
import database from "./db";
import Entity from "../../src/Database/Decorator/Entity";


@Entity({
    name: 'post',
    database: database
})
export default class Post extends Model {
    @Id()
    @String()
    id: string = ''

    @String()
    name: string = ''

    @OneToMany('comment')
    comments: Comment[] = []

}