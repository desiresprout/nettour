const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    content: String
});

const Post = new Schema({
    createdAt: { type: Date, default: Date.now },
    count: Number,
    username: String,
    content: String,
    likesCount: { type: Number, default: 0 },
    likes: { type: [String], default: [] },
    comments: { 
        type: [Comment],
        default: []
    }
});

Post.statics.write = function({count, username, content}) {
    const post = new this({
        count, username, content
    });

    return post.save();
};

Post.statics.list = function ( { cursor, username, self}){
    const query = {};

    return this.find(query)
        .sort({_id: -1})
        .limit(20)
        .exec();
};

module.exports = mongoose.model('Post',Post);




