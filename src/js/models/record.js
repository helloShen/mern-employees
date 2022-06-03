import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  position: {
    type: String,
    required: true,
    maxlength: 50,
  },
  level: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

const Record = mongoose.model('Record', RecordSchema);

export default Record;
