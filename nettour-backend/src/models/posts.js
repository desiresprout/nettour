const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    content: String
});

const Post = new Schema({
    post_thumbnail : String,
    createdAt: { type: Date, default: Date.now }, 
    username: String,
    title: String,
    content: String,
    state : Schema.Types.Mixed,
    likesCount: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    comments: { 
        type: [Comment],
        default: []
    },
    url_slug : String,
});

Post.statics.write = function({title, username, content, state, url_slug}) {
    const post = new this({
        title, username, content, state, url_slug
    });

    return post.save();
};

Post.statics.list = function ( { cursor, username, self}){
    const query = Object.assign(
        { }, 
        cursor ? { _id: { $lt: cursor } } : { },
        username ? { username } : { }
    );

    return this.find(query)
        .sort({_id: -1})
        .limit(20)
        .exec();
};

module.exports = mongoose.model('Post',Post);




