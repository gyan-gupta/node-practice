const Post = require('../models/post');

exports.getPosts = async (req,res) => {
	try{
		const posts = await Post.find();
		res.json(posts);
	}catch(err){
		res.json({ message: err })
	}
}
// without using async and await
exports.createPost =  (req,res) => {
	console.log(req.body);
	const post = new Post({
		title: req.body.title,
		description: req.body.description
	});
	post.save()
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.json({ message: err })
	})
}

exports.getPost = async (req,res) => {
	try{
		const post = await Post.findById(req.params.postId);
		res.json(post);
	}catch(err){
		res.json({ message: err })	
	}	
}

exports.deletePost = async (req,res) => {
	try{
		const post = await Post.remove({_id: req.params.postId });
		res.json(post);
	}catch(err){
		res.json({ message: err })	
	}	
}

exports.updatePost = async (req,res) => {
	try{
		const post = await Post.updateOne(
			{_id: req.params.postId },
			{ $set: { title: req.body.title }}
		);
		res.json(post);
	}catch(err){
		res.json({ message: err })	
	}	
}