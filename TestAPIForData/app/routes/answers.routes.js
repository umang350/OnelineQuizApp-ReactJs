module.exports = function(app) {
    var answers = require('../controllers/answers.controller.js');

    
	//Get Answers
	app.get('/api/answers', answers.findAll);

    // Create a new Answer
    app.post('/api/answers', answers.create);

    // Retrieve a single Answer with id
    app.get('/api/answers/:id', answers.findOneById);

    // // Update a Answer with id
    app.put('/api/answers/:id', answers.update);

    // // Delete a Answer with id
    app.delete('/api/answers/:id', answers.delete);
}