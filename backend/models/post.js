const mongoose = require('mongoose');
//mongoose.connect("mongodb+srv://Todouser:Lily,12345$@todo-cmwlq.mongodb.net/test?retryWrites=true");

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, default: true},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model('Post', postSchema);
