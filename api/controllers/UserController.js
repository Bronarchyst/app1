/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	'new': function(req,res){
		console.log(req.session);
		res.view();
	},

	create: function (req, res, next) {
   	User.create(req.params.all(), function userCreated (err,user) {

		//	if(err) return next(err);

		if(err){
			console.log(err);
			req.session.flash = {
				err: err
			}

			return res.redirect('/user/new');
		}

			//res.json(user);
			req.session.authenticated = true;
			req.session.User = user;
			res.redirect('/user/show/'+user.id);
			req.session.flash = {};
		});
	},

	show: function(req,res,next){
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user:user
			});
		});
	},

	index: function(req,res,next){
		console.log(req.session.User.id);
		User.find(function foundUsers(err,users){
			if(err) return next(err);

			res.view({
				users:users
			});
		});
	},

	edit: function(req,res,next) {
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next();
			res.view({
				user:user
			});
		});
	},

	update: function(req,res,next){
		User.update(req.param('id'),req.params.all(), function userUpdated (err){
			if(err) {
				return res.redirect('/user/edit'+ req.param('id'));
			}

			res.redirect('/user/show/'+ req.param('id'));
		});
	},

destroy: function(req,res,next) {
		User.findOne(req.param('id'), function foundUser(err,user){
			if(err) return next(err);
			if(!user) return next('not found');
			User.destroy(req.param('id'), function userDestroyed(err){
				if(err) return next(err);
			});
			res.redirect('/user');
		});
	}
}
