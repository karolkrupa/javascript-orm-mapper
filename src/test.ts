import ModelMapper from "./Mapper/ModelMapper";
// import database from "./Database";

import Post from "./Post";
import "./Comment";
import database from "./db";

// database.register(Post)
// database.register(Comment)

// let post = new Post()
// let comment = new Comment()

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

// ModelMapper.map({
//     id: 1,
//     name: 123,
//     comments: [
//
//     ]
// }, post)
//
// console.log(post)
// console.log(post.comments.length)
// console.log(database)


// import database from "./db";
// import Post from "./Post";
//
// let post = new Post()
//
// // @ts-ignore
// console.log('test', database.modelsRegister)