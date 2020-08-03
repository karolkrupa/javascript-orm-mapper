import ModelMapper from "./Mapper/ModelMapper";

//
// IMPORTANT: We have to import all entities for load all annotations
//
import Post from "./Post";
import "./Comment";

let post = <Post>ModelMapper.persist({
    id: 1,
    name: 123,
    comments: [
        {
            id: 1,
            content: "Lorem ipsum",
            post: {
                id: 1,
                name: "New name"
            }
        }
    ]
}, Post)


console.log(post)
