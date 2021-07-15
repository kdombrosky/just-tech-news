const User = require('./User');
const Post = require('./Post');

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


module.exports = { User, Post };