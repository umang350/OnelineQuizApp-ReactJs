
const Answer = require('../models/answers.model.js');

exports.findAll = (req, res) => {
	
	Answer.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving answers."
        });
    });
};

// Create and Save a new Answer
exports.create = (req, res) => {
    // Validate request
    if(!req.body.code) {
        return res.status(400).send({
            message: "Answer code can not be empty"
        });
    }

    // Create a Note
    const answer = new Answer({
		id: req.body.id,
        questions: req.body.questions
    });

    // Save Note in the database
    answer.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Answer."
        });
    });
};

// Find a single Answers with a id
exports.findOneById = (req, res) => {
    Answer.find({id: req.params.id})
    .then(answer => {
        if(!answer) {
            return res.status(404).send({
                message: "Answer not found with id " + req.params.id
            });            
        }
        res.send(answer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Answer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Answer with id " + req.params.id
        });
    });
};


// Update a answer identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Answer name can not be empty"
        });
    }

    // Find Answer and update it with the request body
    Answer.findByIdAndUpdate(req.params.id, {
		id: req.body.id,
        questions: req.body.questions
    }, {new: true})
    .then(answer => {
        if(!answer) {
            return res.status(404).send({
                message: "answer not found with id " + req.params.id
            });
        }
        res.send(answer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "answer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating answer with id " + req.params.id
        });
    });
};


// Delete a Answer with the specified id in the request
exports.delete = (req, res) => {
    Answer.findByIdAndRemove(req.params.id)
    .then(answer => {
        if(!answer) {
            return res.status(404).send({
                message: "Answer not found with id " + req.params.id
            });
        }
        res.send({message: "Answer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Answer not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Answer with id " + req.params.id
        });
    });
};
