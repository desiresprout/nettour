const Post = require('models/posts');

exports.like = async (ctx) => {
    
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; 
        return;
    }    
  
    const { postid } = ctx.params;
    const { username } = user.profile;
    

    let post = null;
    try {
        post = await Post.findById(postid, { 
            likesCount: 1,
            likes: {
                '$elemMatch': { '$eq': username }
            }
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!post) {
        ctx.status = 404; 
        return;
    }
   
    if(post.likes[0] === username) {
        ctx.body = {
            liked: true,
            likesCount: post.likesCount
        };
        return;
    }

    
    try {
        post = await Post.like({
            _id: postid,
            username: username
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    
    ctx.body = {    
        liked: true,
        likesCount: post.likesCount
    };
};

exports.unlike = async (ctx) => {    
    
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; // Forbidden
        return;
    }
    
    const { postid } = ctx.params;
    const { username } = user.profile;

    let post = null;
    try {
        post = await Post.findById(postid, {
            likesCount: 1,
            likes: {
                '$elemMatch': { '$eq': username }
            }
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    if(!post) {
        ctx.status = 404; 
        return;
    }
    
    if(post.likes.length === 0) {
        ctx.body = {
            liked: false,
            likesCount: post.likesCount
        };
        return;
    }

    
    try {
        post = await Post.unlike({
            _id: postid,
            username: username
        });
    } catch (e) {
        ctx.throw(500, e);
    }
   
    ctx.body = {
        liked: false,
        likesCount: post.likesCount
    };
};