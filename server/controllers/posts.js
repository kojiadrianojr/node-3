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
module.exports = {
 create,

}
