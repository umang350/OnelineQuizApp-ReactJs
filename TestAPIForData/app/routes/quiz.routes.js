module.exports = function(app) {

	var quizs = require('../controllers/quiz.controller.js')
	
	app.get('/api/quiz/init', quizs.init);

	//Get Quizes
	app.get('/api/quiz', quizs.findAll);

	//Get Quiz by Id
	app.get('/api/quiz/:id', quizs.findOne);

	// Create a new Quiz
	app.post('/api/quiz', quizs.create);

	// Update a Quiz with QuizId
	app.put('/api/quiz/:id', quizs.update);
	
	// Delete a Quiz with QuizId
    app.delete('/api/quiz/:id', quizs.delete);
}