import String from "./DataType/String";
import Model from "./Model";
import Id from "./DataType/Id";
import ManyToOne from "./DataType/ManyToOne";
import Post from "./Post";


export default class Comment extends Model {
    static entity: string = 'comment'

    @Id()
    id: string = ''

    @String()
    content: string = ''

    @ManyToOne('post')
    post: Post = null
}