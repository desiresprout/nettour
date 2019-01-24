const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = new Schema({
    createdAt: { type: Date, default: Date.now },
    username: String, 
    comment: String
});

const Post = new Schema({
    thumbnail : { type : String, default : 'no' },
    createdAt: { type: Date, default: Date.now }, 
    username: String,
    title: String,
    content: String, 
    likesCount: { type: Number, default: 0 },
    likes: { type: [String], default: [] },      
    comments: { 
        type: [Comment],
        default: []
    },
    url_slug : String,
});



Post.statics.writepost = function({title, username, content, state, url_slug, thumbnail}) {
    const post = new this({
        title, username, content, url_slug, thumbnail
    });


    return post.save();
};

Post.statics.list = function ( { cursor, username, user}){
    
    const query = Object.assign(
        { }, 
        cursor ? { _id: { $lt: cursor } } : { },
        username ? { username } : { }
    );      
    
    if(user){
        return this.find(query)
        .sort({_id: -1})        
        .limit(15)
        .select('_id createdAt title content likesCount url_slug')        
        .exec();
    }

    //여기서 lean()을 하면 다음포스트 읽어올수있을까?? 테스트해볼것     
    return this.find(query)
        .sort({_id: -1})        
        .limit(20)
        .select('_id thumbnail createdAt username title content likesCount comments url_slug')        
        .exec();    
    
};

Post.statics.readpost = function ({ name, urlslug, self}) {  
    
    //return this.findOne({'username':name, 'url_slug':urlslug}).elemMatch(likes : { '$eq' : self}).exec();
    
    return this.findOne({'username':name, 'url_slug' : urlslug}, { likes : { $elemMatch : { $eq : self } } } )
    .select('_id title username content createdAt comments likesCount likes')
    .lean()
    .exec();   

};

Post.methods.writecomment = function ({ currentusername, comment}){
    
    this.comments.unshift({
        'comment' : comment,
        'username' : currentusername,         
    });
    return this.save();
};

Post.statics.like = function({_id, username}) {
    return this.findByIdAndUpdate(_id, {
        $inc: { likesCount: 1 },
        $push: { likes: username }
    }, {
        new: true, 
        select: 'likesCount'
    }).exec();
};

Post.statics.unlike = function({_id, username}) {
    return this.findByIdAndUpdate(_id, {
        $inc: { likesCount: -1 },
        $pull: { likes: username }
    }, {
        new: true,
        select: 'likesCount'
    });
};

/* await Post.findOneAndUpdate( {'comments._id' : commentid} ,
        {
            $pull: { comments: { _id: commentid }}
        },
        { new: true} ).select('-_id comments'); */
//.select('_id title username content createdAt comments')
module.exports = mongoose.model('Post',Post);




