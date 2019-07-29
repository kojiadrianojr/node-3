const jwt = require('jsonwebtoken');
const secret = require('../../secret.js');

function add (req, res) {
  const db = req.app.get('db')
  const { userId, postId, comment } = req.body
if (!req.headers.authorization){
 return res.status(401).end();
}

try{
 const token = req.headers.authorization.split(' ')[1];
 jwt.verify(token, secret);
  db.comments
    .insert({
	userId,
	postId,
	comment
    },{deepInsert: true}).then(comments => {
	res.status(201).json(comments)
	}).catch(err=>{console.error(err);
		 res.status(500).end()
		})
 }catch(err){
  console.error(err);
  res.status(401).end();
 }
}
function update (req, res) {
  const db = req.app.get('db')
  const { id } = req.params
  const { comment } = req.body
if (!req.headers.authorization){
  return res.status(401).end();
}
try{
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secret);
  db.comments
    .update({
	id: id
	},
	{
	comment: comment
    }).then(comment=>{res.status(200).json(comment)})
    .catch(err=>{console.error(err); res.status(500).end()})
 }catch(err){
  console.error(err);
  res.status(401).end();
 }
}


module.exports = {
  add,
  update,

}
