const Quiz = require('../models/quiz.model.js');
const Answers = require('../models/answers.model')

exports.init = (req, res) => {
  var quiz = new Quiz({ 
    name: 'General Knowledge',
    id: '1000',
    questions: [
        {
            question: "Who is the CM of Delhi",
            options: ['AK', 'VK', 'DK', 'MK']
        },
        {
            question: "Who is the PM of India",
            options: ['GODI', 'LODHI', 'N MODI', 'TODI']
        },
        {
            question: "Who is the President of India",
            options: ['Yogi', 'Pratibha', 'Kovind', 'Nikita']
        },
        {
            question: "Which one is an Indian Player",
            options: ['Peterson', 'Chris', 'Dhoni', 'Ramtri']
        },
        {
            question: "Who is known as the Father of the nation",
            options: ['Subhash', 'Modi', 'Nehru', 'Gandhi']
        },
        {
            question: "What is the Capital of Karnataka",
            options: ['Mysore', 'Goa', 'Bangaluru', 'Mangalore']
        },
        {
            question: "Which is a Social Media App",
            options: ['FB', 'DP', 'Tweet', 'GPA']
        }
    ]
  });
  var answer = new Answers({
    id: '1000',
    questions: {
            "Who is the CM of Delhi": 'AK',
            "Who is the PM of India": 'N MODI',
            "Who is the President of India": 'Kovind',
            "Which one is an Indian Player": 'Dhoni',
            "Who is known as the Father of the nation": 'Gandhi',
            "What is the Capital of Karnataka": 'Bangaluru',
            "Which is a Social Media App": 'FB'
    }
  })
  
  var quiz1 = new Quiz({ 
    name: 'Technical Quiz',
    id: '1001',
    questions: [
        {
            question: "Which is a programming language",
            options: ['C++', 'Coffee', 'Oak', 'TOKIDOKI']
        },
        {
            question: "Which company created ReactJs",
            options: ['Google', 'FB', 'Twitter', 'Amazon']
        },
        {
            question: "Which is the parent company of Google",
            options: ['Alphabet', 'Books', 'Tables', 'Words']
        },
        {
            question: "What of these were first developed by an Indian",
            options: ['Search', 'Hotmail', 'Laptop', 'Tree']
        },
        {
            question: "Which is the most used Cloud services company",
            options: ['GCP', 'AWS', 'Azure', 'Alibaba']
        },
        {
            question: "Who owns Instagram",
            options: ['Indian Govt', 'US Govt', 'Facebook', 'None of These']
        },
        {
            question: "Who created Facebook",
            options: ['Twain', 'Billy', 'Jobs', 'Mark']
        }
    ]
  });
  var answer1 = new Answers({
    id: '1001',
    questions: {
        "Which is a programming language": 'C++',
            "Which company created ReactJs": 'FB',
            "Which is the parent company of Google": 'Alphabet',
            "What of these were first developed by an Indian": 'Hotmail',
            "Which is the most used Cloud services company": 'AWS',
            "Who owns Instagram": 'Facebook',
            "Who created Facebook": 'Mark'
    }
  })

  answer.save(function (err) {
    if(err) return console.error(err.stack)});

    answer1.save(function (err) {
        if(err) return console.error(err.stack)});

        quiz1.save(function (err) {
            if(err) return console.error(err.stack)});

  quiz.save(function (err) {
    if(err) return console.error(err.stack)
	console.log("Test Quiz is added")
	res.send("Done Initial Data!");
    });
};

exports.findAll = (req, res) => {
	Quiz.find()
    .then(quizes => {
        res.send(quizes);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};


// Create and Save a new Quiz
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Quiz Name can not be empty"
        });
    }

    const quiz = new Quiz({ 
		name: req.body.name, 
		id: req.body.id, 
		questions: req.body.questions
    });

    quiz.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the QUIZ."
        });
    });
};

// Find a single Quiz with a ID
exports.findOne = (req, res) => {
    Quiz.find( {_id: req.params.id} )
    .then(quiz => {
        if(!quiz) {
            return res.status(404).send({
                message: "Quiz not found with id " + req.params.id
            });            
        }
        res.send(quiz[0]);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Quiz not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Quiz with id " + req.params.id
        });
    });
};


// Update a Quiz identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Quiz Name can not be empty"
        });
    }

    // Find quiz and update it with the request body
    Quiz.findByIdAndUpdate(req.params.id, {
            name: req.body.name, 
            id: req.body.id, 
            questions: req.body.questions
    }, {new: true})
    .then(quiz => {
        if(!quiz) {
            return res.status(404).send({
                message: "Quiz not found with id " + req.params.id
            });
        }
        res.send(quiz);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Quiz not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating quiz with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Quiz.findByIdAndRemove(req.params.id)
    .then(quiz => {
        if(!quiz) {
            return res.status(404).send({
                message: "Quiz not found with id " + req.params.id
            });
        }
        res.send({message: "Quiz deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Quiz not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete quiz with id " + req.params.id
        });
    });
};