const Vote = require('./Vote');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create associations 
// creates reference for the id column in the User model to link to the 
// coresponding foreign key pair, user_id in Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// make reverse association
// define relationship of Post model to User
// constraint here means a post can belong to one user, but not many users
// then declare link to foreign key
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Create many-to-many relationship
// can now see which users voted on a post, 
// and which posts a user voted on
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});


Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// Comments
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };
