import Model from "./Model";
import Post from "./Post";
export default class Comment extends Model {
    static entity: string;
    id: string;
    content: string;
    post: Post;
}
