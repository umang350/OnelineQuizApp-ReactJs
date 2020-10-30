const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
	name: String,
    id: String,
    questions: [
        {
            question: String,
            options: [String]
        }
    ]
});

module.exports = mongoose.model('Quiz', QuizSchema);