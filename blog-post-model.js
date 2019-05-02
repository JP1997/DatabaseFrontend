// Special thanks to Arturo Ramirez for helping me complete this code
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let blogSchema = mongoose.Schema({
    id : {type : String, required : true, unique : true},
    title: {type : String, required : true, unique : false},
    content: {type : String, required : true, unique : false},
    author: {type : String, required : true, unique : false},
    publishDate: {type : String, required : true, unique : false}
});

let Blog = mongoose.model('Blog',blogSchema);

const blogList = {
    get : function(){
        return Blog.find()
            .then(blogPost => {
                return blogPost;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    add : function(newItem){
        return Blog.create(newItem)
            .then(blogPost => {
                return blogPost;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    getAuthor : function(autor){
        return Blog.find({author:autor})
            .then(blogPost => {
                console.log(blogPost);
                return blogPost;
            })
            .catch(err => {
                throw new new Error(err);
            });
    },
    delete : function(delItem){
        return Blog.findOneAndDelete({id:delItem})
            .then(blogPost => {
                console.log(blogPost);
                return blogPost;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    place : function(postId, body){
        return Blog.findOneAndUpdate({id:postId},{$set : body},{new : true})
            .then(blogPost => {
                console.log(blogPost);
                return blogPost;
            })
            .catch(err => {
                throw new Error(err);
            });
    }
}

module.exports = {blogList};