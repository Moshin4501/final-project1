var express = require('express');
var router  = express.Router();
var mongojs = req('mongojs');
var db = mongojs('mongodb://Moshin:<Moshin4501@ds027739.mlab.com:27739/mytasklist', ['tasks']);

//Get all tasks 

router.get('/tasks', function(req,res, next){
db.tasks.find(function(err, tasks){
	if(err){
		res.send(err);
		}
		res.json(tasks);
	});
});

//Get Single Tasks
router.get('/task/:id', function(req,res, next){
db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)})(function(err, task){
	if(err){
		res.send(err);
		}
		res.json(task);
	});
});

//Save Tasks 
router.post('/task,' function(req, res, next){
	var task = req.body;
	if(!task.title || (task.isDone + '')){
		res.status(400);
		res.json({
			"error": "bad data"
		});
	} else {
		db.tasks.save(task, function(err, task){
		if(err){
			res.send(err);
			}
			res.json(task);

		});
	}

});

//Delet Task
router.delete('/task/:id', function(req,res, next){
db.tasks.tasks({_id: mongojs.ObjectId(req.params.id)})(function(err, task){
	if(err){
		res.send(err);
		}
		res.json(task);
	});
});

//Update Task 

router.put('/task/:id', function(req,res, next){
	var task = req.body;
	var updTask ={};

	if(task.isDone){
		updTask.isDone = task.isDone;
	}
		if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
		res.status(400);
		res.json({
			"errpr": "bad data"
		});
	} else {
		db.tasks.Update({_id: mongojs.ObjectId(req.params.id)}),updTask,{} (function(err, task){
	if(err){
		res.send(err);
		}
		res.json(task);
	});

	}

});

module.exports = router;