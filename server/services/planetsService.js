import mongoose from 'mongoose'

let ObjectId = mongoose.Schema.Types.ObjectId
let _schema = new mongoose.Schema({
  //NOTE "unique" and "lowercase" modifiers are IMPORTANT
  name: { type: String, required: true, unique: true, lowercase: true },
  star: { type: ObjectId, ref: 'Star', required: true }
}, { timestamps: true })

export default mongoose.model('Planet', _schema)