const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, db) => {
	
	if (err) {
		return console.log(err);
	}

	app.get('/api/contacts', function(req, res) {
  		db.collection('contacts').find({}).toArray(function(err, docs) {
    		if (err) {
      			handleError(res, err.message, 'Failed to get contacts.');
    		} else {
      			res.status(200).json(docs);
    		}
  		});
	});


	app.post('/api/contacts', function(req, res) {
		var newContact = req.body;
		
		db.collection('contacts').insertOne(newContact, function(err, doc) {
			if (err) {
		  		handleError(res, err.message, 'Failed to create new contact.');
			} else {
		  		res.status(201).json(doc.ops[0]);
			}
		});
	});


	app.delete('/api/contacts/:id', function(req, res) {
		db.collection('contacts').deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
			if (err) {
				handleError(res, err.message, 'Failed to delete contact.');
			} else {
				res.status(200).json(req.params.id);
			}
		});
	});


	app.get('/api/contacts/:id', function(req, res) {
		db.collection('contacts').findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
			if (err) {
				handleError(res, err.message, 'Failed to get contact.');
			} else {
				res.status(200).json(doc);
			}
		});
	});


	app.put('/api/contacts/:id', function(req, res) {
		var updateDoc = req.body;
		delete updateDoc._id;

		db.collection('contacts').updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
			if (err) {
				handleError(res, err.message, 'Failed to update contact.');
			} else {
				updateDoc._id = req.params.id;
				res.status(200).json(updateDoc);
			}
		});
	});

});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});