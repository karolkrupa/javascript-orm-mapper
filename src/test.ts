import ModelMapper from "./Mapper/ModelMapper";
import database from "./Database";
import Post from "./Post";
import Comment from "./Comment";

database.register(Post)
database.register(Comment)


let model = <Post>ModelMapper.persist({
    id: 1,
    name: 123,
    comments: [
        {
            id: 1,
            content: "Lorem ipsum",
            post: {
                id: 1
            }
        }
    ]
}, Post)


console.log(model)
