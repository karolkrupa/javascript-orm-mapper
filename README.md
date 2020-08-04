# Javascript orm mapper
[![Build Status](https://travis-ci.org/karolkrupa/javascript-orm-mapper.svg?branch=master)](https://travis-ci.org/karolkrupa/javascript-orm-mapper)

This library provides a simple way to map data from json to
javascript objects that use multiple data types, including relational data types, for example:
OneToMany

## Installation
```bash
$ npm i javascript-orm-mapper
```

## Tests
```bash
$ npm test
```

## Defining Models

You can define models just like normal classes. There are no limits, you can define own methods, 
getters properties and whatever you want. All you have to do to make your class mappable
is describing properties with type annotations

```typescript
// Post
@Database(database)
@EntityName('post')
class Post extends Model {
    @Id()
    @String()
    id: string = ''

    @String()
    name: string = ''

    @OneToMany('comment')
    comments: Comment[] = []
}

// Comment
@Database(database)
@EntityName('comment')
class Comment extends Model {
    @Id()
    @String()
    id: string = ''

    @String()
    content: string = ''

    @ManyToOne('post')
    post: Post = null
}
```

## Mapping data to objects

```typescript
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

// Result
// Post {
//   __orm_uid: "bf9929cb-f852-43a0-9260-2e3fb89833b7",
//   id: "1",
//   name: "New name",
//   comments: [
//     Comment { 
//        __orm_uid: "6599f446-fb0d-4194-abbd-659d40d5c9fb",
//        content: "Lorem ipsum",
//        post: Post {
//            __orm_uid: "bf9929cb-f852-43a0-9260-2e3fb89833b7",
//            id: "1",
//            name: "New name",
//            comments: [
//                [Circural]  
//            ]
//        }
//     }
//   ]
// }

```
