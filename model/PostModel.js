const mongoose = require('mongoose')


const PostSchema= mongoose.Schema({
                         uid:String,
                         pic:String,
                         desc:String,
                         shorten:Boolean,
                         
                         
})
module.exports = Post = mongoose.model('posts', PostSchema);