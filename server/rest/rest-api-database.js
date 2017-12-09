

module.exports = function init(config, modelStructure, app, checkConnectedFunction, storageClient) {
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var multer = require('multer');
	var uuid = require('uuid/v4');
	var fs = require('fs');

	var filesApi = [];

	var shemaConfiguration = extractShema(modelStructure);



	var securityActivateOnObject = computeSecurityActivateOnObject(modelStructure);


	var model = mongoose.model(config.shema, shemaConfiguration);


	function isGoodForSecurity(objectChecked, principal, mode){
		if(!securityActivateOnObject[mode]){
			return true;
		}
		var structure = modelStructure[i];
		for(var i = 0; i < modelStructure.length; i++){
			var structure = modelStructure[i];
			//check security for mode
			if(structure.security && structure.security.indexOf(mode) !==-1){
				if(objectChecked[structure.name]==principal._id){
					return true;
				}
			}
		}
		;
		return false;
	}

	function isFieldSecurityGood(objectChecked, objectSaved, principal){
		if(principal){
			if(!objectSaved){
				var structure = modelStructure[i];
				for(var i = 0; i < modelStructure.length; i++){
					var structure = modelStructure[i];	
					if(!!structure.restrictUpdate){		
						return false;
					}else if(structure.restrictUpdate && structure.restrictUpdate.indexOf("o") !==-1 && principal.owner){
						return false;
					}else if(structure.restrictUpdate && structure.restrictUpdate.indexOf("a") !==-1 && principal.administrator){
						return false;
					}
				}
				return true;
			}else{
				var structure = modelStructure[i];
				for(var i = 0; i < modelStructure.length; i++){
					var structure = modelStructure[i];
				
					if(objectChecked[structure.name] !== objectSaved[structure.name]){
						if(!!structure.restrictUpdate){		
							return false;
						}else if(structure.restrictUpdate && structure.restrictUpdate.indexOf("o") !==-1 && principal.owner){
							return false;
						}else if(structure.restrictUpdate && structure.restrictUpdate.indexOf("a") !==-1 && principal.administrator){
							return false;
						}
					}
				}
			
				return true;
			}
		}else{
			return true;
		}
	}

	var service = {
		"getAll": function(principal){
			return new Promise(function (fulfill, reject){
			    model.find(function(err, list) {
					if (err){
						reject(500);
					}else{
						if(principal){
				    		list= list.filter(function(element){
				    			return isGoodForSecurity(element, principal, "r");
				    		});
				    	}
						fulfill(list);
					}
				});
			});			
		},
		"getById": function(id, principal){
			return new Promise(function (fulfill, reject){
			    model.findById(id, function(err, object) {
			    	if (!object){
						reject(404);
					}else if (err){
						reject(500);
					}else if(principal && !isGoodForSecurity(object, principal, "r")){
						reject(403);
					}else{
						fulfill(object);
					}
				});
			});	
		},

		"find": function(criteria, principal){
			return new Promise(function (fulfill, reject){
			    model.find(criteria, function(err, list) {
			    	if (err){
						reject(500);
					}else{
						if(principal){
				    		list= list.filter(function(element){
				    			return isGoodForSecurity(element, principal, "r");
				    		});
				    	}
						fulfill(list);
					}
				});
			});	
		},

		
		"create": function(object, principal){
			return new Promise(function (fulfill, reject){
				var keys = Object.keys(shemaConfiguration);
				var data = updateObject({}, object);
				model.create(data, function(err, objectCreated) {
					if (err){
						reject(500);
					}else if(principal && !isFieldSecurityGood(object, null, principal)){
						reject(403);
					}else{
						fulfill(objectCreated);
					}
				});
			});	
		},
		"update": function(id, object, principal){
			return new Promise(function (fulfill, reject){
				var keys = Object.keys(shemaConfiguration);
				model.findById(id, function(err, objectFound) {
					if (!objectFound){
						reject(404);
					}else if(principal && !isGoodForSecurity(objectFound, principal, "w") && !isFieldSecurityGood(object, objectFound, principal)){
						reject(403);
					}else {
						var keys = Object.keys(object);
						var data = updateObject(objectFound, object);
						data.save(function(err) {
							fulfill(data);
						});
					}
				});
			});	
		},
		"deleteById": function(id, principal){
			return new Promise(function (fulfill, reject){
				model.findById(id, function(err, objectFound) {
					if (!objectFound){
						reject(404);
					}else if(principal && !isGoodForSecurity(objectFound, principal, "w")){
						reject(403);
					}else {
					    model.findByIdAndRemove(id, function(err) {
					    	if (err){
								reject(500);
							}else{
								fulfill();
							}
						});
					}
				});
			});	
		} 
	};

	function checkRightForApi(req, res, next){
		if(config.api){
			if(req.principal){
				var rights = config.api[req.method.toLowerCase()];
				if(rights){
					if(rights.indexOf("o") !== -1 && req.principal.owner){
						return next();
					}else if(rights.indexOf("a") !== -1 && req.principal.administrator){
						return next();
					}else if(rights.indexOf("m") !== -1){
						return next();
					}else{
						res.sendStatus(403);
					}
				}else{
					res.sendStatus(404);
				}				
			}else{
				res.sendStatus(401);
			}
		}else{
			return next();
		}	
	}

	function declareIfNecessary(rightType, path, declarationFunction){
		//if has configuration api use this, else declare !
		if(checkConnectedFunction){
			if(config.api){
				//declare only if type is declared
				if(config.api[rightType]){
					app[rightType](path, checkConnectedFunction, checkRightForApi, function(req, res){
						declarationFunction(req, res);
					});
				}else{
					//not declared
				}
			}else{
				app[rightType](path, function(req, res){
					declarationFunction(req, res);
				});
			}
		}else{
			app[rightType](path, function(req, res){
				declarationFunction(req, res);
			});
		}
	}


	//GET /
	declareIfNecessary("get", config.baseApi, function(req, res){
		console.log("GET "+config.baseApi);
		service.getAll(req.principal).then(function(list){
				res.json(list);
			}, 
			function(error){
				console.log("error " +error);
				res.sendStatus(error);
			}
		);
	});
	

	//GET /:id
	declareIfNecessary("get", config.baseApi+':id', function(req, res){
		console.log("GET "+config.baseApi+req.params.id);
		service.getById(req.params.id, req.principal).then(function(object){
				res.json(convert(object));
			}, 
			function(error){
				console.log("error " +error);
				res.sendStatus(error).send(error);
			}
		);	
	});
	
	//DELETE /:id
	declareIfNecessary("delete", config.baseApi+':id', function(req, res){
		console.log("DELETE "+config.baseApi+req.params.id);
		service.deleteById(req.params.id, req.principal).then(function(){
				res.send();
			}, 
			function(error){
				console.log("error " +error);
				res.sendStatus(error);
			}
		);	
	});

	//POST /
	declareIfNecessary("post", config.baseApi, function(req, res){
		console.log("POST "+config.baseApi);
		service.create(req.body, req.principal).then(function(object){
				res.json(convert(object));
			}, 
			function(error){
				console.log("error " +error);
				res.sendStatus(error);
			}
		);
	});


	//PUT /:id
	declareIfNecessary("put", config.baseApi+':id', function(req, res){
		console.log("PUT "+config.baseApi+req.params.id);
		service.update(req.params.id, req.body, req.principal).then(function(object){
				res.json(convert(object));
			}, 
			function(error){
				console.log("error" +error);
				res.sendStatus(error);
			}
		);	
	});

	for(var i = 0; i < filesApi.length; i++){
		registerSubFieldFile(filesApi[i]);
	}



	function extractShema(modelStructure){
		var shemaConfiguration = {};
		for(var i = 0; i < modelStructure.length; i++){
			var structure = modelStructure[i];
			if(structure.type === "String"){
				shemaConfiguration[structure.name] = structure.type;
			}else if(structure.type === "Boolean"){
				shemaConfiguration[structure.name] = structure.type;
			}else if(structure.type === "Number"){
				shemaConfiguration[structure.name] = structure.type;
			}else if(structure.type === "Files"){
				shemaConfiguration[structure.name] = [{ _id: 'string',  href: 'string'}];
				filesApi.push(structure);
			}else if(structure.type === "List"){
				shemaConfiguration[structure.name] = [extractShema(structure.shema)];
			}else if(structure.type === "Strings"){
				shemaConfiguration[structure.name] = [String];
			}else if(structure.type === "Numbers"){
				shemaConfiguration[structure.name] = [Number];
			}else if(structure.type === "Object"){
				shemaConfiguration[structure.name] = extractShema(structure.shema);
			}else{
				console.error("not managed type")
			}
		}
		return shemaConfiguration;
	}

	function computeSecurityActivateOnObject(modelStructure){
		var result={
			"r": false,
			"w": false
		};
		for(var i = 0; i < modelStructure.length; i++){
			if(modelStructure[i].security){
				if(modelStructure[i].security.indexOf("r") !==-1){
					result["r"] = true;
				}
				if(modelStructure[i].security.indexOf("w")!==-1){
					result["w"] = true;
				}
			}
		}
		return result;
	}

	function updateObject(objet1, object2) {
		var keys = Object.keys(object2);
		for(var i = 0; i < keys.length; i++){
			objet1[keys[i]] = object2[keys[i]];
		}		
		return objet1;
	}

	function convert(object){
		if(object)
			object.href = config.baseApi+"/"+object._id;
		return object;
	};

	function registerSubFieldFile(truc){
		var name = truc.name;
		var storageContainer = truc.container;
		var deleteOnServer = truc.deleteOnServer;

		//POST /:id/name/
		app.post(config.baseApi+':id/'+name+'/', function(req, res) {
			console.log("POST "+config.baseApi+req.params.id+'/'+name+'/');
			model.findById(req.params.id, function(err, object) {
				if (!object)
					res.status(404).send("not found");
				else if(err){
					res.status(500).send(err);

				}
				else{
					 upload(req,res,function(err){
						if(err){
			             	res.json({error_code:1,err_desc:err});
			             	return;
						}


						var fileId = req.file.filename;

						var readStream = fs.createReadStream(req.file.path);
						var writeStream = storageClient.upload({
							container: storageContainer,
							remote: fileId
						});

						writeStream.on('error', function(err) {
							 console.log('upload failed:', err);
						});

						writeStream.on('success', function(file) {
							var file = {
							 	"_id" : fileId,
							 	"href" : config.serverHost+":"+config.port+config.baseApi+req.params.id+'/'+name+'/'+fileId
							 };
							object[name].push(file);
							object.save(function(err) {
								if(err){
					        		res.json({error_code:0,err_desc:err.message});
								}else{
									res.json(file);
								}
							});
						});

						readStream.pipe(writeStream);

					});

				}
			});
		   

		});
		//GET /:id/name/:fileId
		app.get(config.baseApi+':id/'+name+'/:fileId', function(req, res) {

			console.log("GET "+config.baseApi+req.params.id+'/'+name+'/'+req.params.id);
			model.findById(req.params.id, function(err, object) {
				if (!object)
					res.status(404).send("not found");
				else if(err){
					res.status(500).send(err);
				}
				else{
					var fileId = req.params.fileId;

					var download= storageClient.download({
						container: storageContainer,
						remote: fileId
					});

					download.pipe(fs.createWriteStream('/tmp/'+fileId));   	
					download.on('end', function() {
						res.sendFile("/tmp/"+fileId);
		 			});
		 			download.on('error', function() {
		 				console.log("erroooooooooooooooooor");
						res.sendFile("/tmp/"+fileId);
		 			});		
		   		}
		   	});

		});


		//DELETE /:id/name/:fileId
		app.delete(config.baseApi+':id/'+name+'/:fileId', function(req, res) {

			console.log("DELETE "+config.baseApi+req.params.id+'/'+name+'/'+req.params.id);
			model.findById(req.params.id, function(err, object) {
				if (!object)
					res.status(404).send("not found");
				else if(err){
					res.status(500).send(err);
				}
				else{
					var fileId = req.params.fileId;
					function removeOnData(){
						var index = -1;
						for(var i = 0; i < object[name].length;i++){
							if(object[name][i]._id === fileId){
								index = i;
							}
						}
						if(index != -1){
						    object[name].splice(index, 1);
							object.save(function(err) {
					        	res.json({error_code:0,err_desc:null});
							});
						}
					};

					if(deleteOnServer){
						var download= storageClient.removeFile(storageContainer,fileId, function(err){
							if (err) {
								res.json({error_code:0,err_desc:err.message});
							}else {
								removeOnData();								
							}
						});
					}else{
						removeOnData();
					}
		   		}
		   	});

		});
	}

	var storage = multer.diskStorage({ //multers disk storage settings

		destination: function (req, file, cb) {

		    cb(null, '/tmp/');

		},

		filename: function (req, file, cb) {

		    var name = uuid(); 

		    cb(null, name);

		}

	});



	var upload = multer({ //multer settings

		storage: storage

	}).single('file');


	return service;

};