const Post = require('models/post');

exports.like = async (ctx) => {
        
    const { user } = ctx.request;
    if(!user) {
        ctx.status = 403; 
        return;
    }
  
    const { postId } = ctx.params;
    const { username } = user.profile;

    let post = null;
    try {
        post = await Post.findById(postId, { 
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
            _id: postId,
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
    
    const { postId } = ctx.params;
    const { username } = user.profile;

    let post = null;
    try {
        post = await Post.findById(postId, {
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

    // 이미 좋아요 하지 않은 상태면 기본값 반환
    if(post.likes.length === 0) {
        ctx.body = {
            liked: false,
            likesCount: post.likesCount
        };
        return;
    }

    
    try {
        post = await Post.unlike({
            _id: postId,
            username: username
        });
    } catch (e) {
        ctx.throw(500, e);
    }

    /* 좋아요 관련정보 반환 */
    ctx.body = {
        liked: false,
        likesCount: post.likesCount
    };
};