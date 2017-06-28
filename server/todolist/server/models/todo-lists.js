'use strict';

module.exports = function(Todolists) {
	Todolists.byuser = function(userid, cb) {
		var Todolists = this;
		console.log(userid);
		Todolists.find({filter :{where:{userId: userid}}},function(err, result) {
			// console.log(result);
			if(cb)
				cb(err,result );
		}); 
	}

	Todolists.remoteMethod(
			'byuser', 
			{
				http:{
					path: '/byuser',
					verb: 'get'
				},
				accepts: {
					arg: 'userid', type: 'string' ,required: true 
				},
				returns:[{
					arg: 'id',
					type: 'string'
				},{
					arg: 'title',
					type: 'string'
				},{
					arg: 'description',
					type: 'string'
				}]
			}
	);
};
