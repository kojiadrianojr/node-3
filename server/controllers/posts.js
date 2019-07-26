function create(req, res){
   const db = req.app.get('db');
   const {content, userId} = req.body

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
}

function getPost(req, res) {
   const db = req.app.get('db');
   const { postId  } = req.params
   var data = {
	post: [],
	comments: [],
	};
 

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

}

function fetchPosts(req, res) {
   const db = req.app.get('db');
  
   db.posts
     .find()
     .then(posts => {
       res.status(200).json(posts);
     })
     .catch(err => {console.error(err);
	    res.status(500).end()
	});

}

function update(req, res){
   const db = req.app.get('db');
   const {content} = req.body   
   const {id} = req.params
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
}

module.exports = {
 create,
 getPost,
 fetchPosts,
 update,
}
