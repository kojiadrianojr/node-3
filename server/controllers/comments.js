function add (req, res) {
  const db = req.app.get('db')
  const { userId, postId, comment } = req.body

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
}

function update (req, res) {
  const db = req.app.get('db')
  const { id } = req.params
  const { comment } = req.body
  db.comments
    .update({
	id: id
	},
	{
	comment: comment
    }).then(comment=>{res.status(200).json(comment)})
    .catch(err=>{console.error(err); res.status(500).end()})

}


module.exports = {
  add,
  update,

}
