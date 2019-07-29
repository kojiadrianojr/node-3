//const authenticate = require('./authenticate.js');
const jwt = require('jsonwebtoken');
const secret = require('../../secret.js');

function create(req, res){
   const db = req.app.get('db');
   const {content, userId} = req.body

if (!req.headers.authorization){
	 return res.status(401).end();
}
 try {
   const token = req.headers.authorization.split(' ')[1];
   jwt.verify(token, secret); // will throw an Error when token is invalid!!!
  db.posts
      .insert(
      {
        content,
        userId,
      },
      {
       deepInsert: true,
      }
   )
    .then(post => res.status(201).json(post))
    .catch(err=>{console.error(err)});
 } catch (err) {
   console.error(err);
   res.status(401).end();
 }
}

function getPost(req, res) {
   const db = req.app.get('db');
   const { postId  } = req.params
   var data = {
	post: [],
	comments: [],
	};
if (!req.headers.authorization){
  return res.status(401).end();
} 
try {
 const token = req.headers.authorization.split(' ')[1];
 jwt.verify(token, secret);
 db.posts
     .findOne({id:postId})
     .then(post => {
	 data.post.push(post)
	console.log(data.post)
     })  
     .then(comments=>{
	return db.comments
		.find({
		  postId: postId
		})
		.then(comments => { return data.comments.push(comments)})
		.catch(err=>{
			console.error(err);
			 res.status(500).end()
		});
	})
     .then(datas  => {
		res.status(200).send(data)	
	})
     .catch(err=>{console.error(err);
         res.status(500).end()     
     });
 } catch (err) {
  console.error(err);
  res.status(401).end();
 }
}

function fetchPosts(req, res) {
   const db = req.app.get('db');
if (!req.headers.authorization) {
  return res.status(401).end();
}  
try {
 const token = req.headers.authorization.split(' ')[1];
 jwt.verify(token, secret); 
   db.posts
     .find()
     .then(posts => {
       res.status(200).json(posts);
     })
     .catch(err => {console.error(err);
	    res.status(500).end()
	});
 } catch (err) {
  console.error(err);
  res.status(401).end();
 }
}

function update(req, res){
   const db = req.app.get('db');
   const {content} = req.body   
   const {id} = req.params

if (!req.headers.authorization) {
  return res.status(401).end();
}
 
try {

 const token = req.headers.authorization.split(' ')[1];
 jwt.verify(token, secret);
  db.posts
     .update({
      id: id      
     },
     {
      
      content: content 
     })
     .then(post => {
       res.status(200).json(post)
      }
     )  
     .catch(err=> {
       res.status(500).end()
      } 
     )
 } catch (err) {
  console.error(err);
  res.status(401).end();
 }
}
module.exports = {
 create,
 getPost,
 fetchPosts,
 update,
}
