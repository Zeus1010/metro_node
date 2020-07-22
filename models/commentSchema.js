const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    commentTitle:{
        type:String,
        required:true
    },
    content_good:{
        type:String,
        required:true
    },
    content_bad:{
        type:String,
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

var comment = mongoose.model('comment',commentSchema);

module.exports = comment;