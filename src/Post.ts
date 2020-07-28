import String from "./DataType/String";
import Model from "./Model";
import Comment from "./Comment";
import Id from "./DataType/Id";
import OneToMany from "./DataType/OneToMany";

console.log('POST', Id)

export default class Post extends Model {
    static entity: string = 'post'

    @Id()
    id: string = ''

    @String()
    name: string = ''

    @OneToMany('comment')
    comments: Comment[] = []

}