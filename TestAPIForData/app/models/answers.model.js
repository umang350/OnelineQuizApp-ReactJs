const mongoose = require('mongoose');

const AnswerSchema = mongoose.Schema({
    id: String,
    questions: {}
    
});

module.exports = mongoose.model('Answers', AnswerSchema);