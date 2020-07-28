import Model from "./Model";
import Comment from "./Comment";
export default class Post extends Model {
    static entity: string;
    id: string;
    name: string;
    comments: Comment[];
}
