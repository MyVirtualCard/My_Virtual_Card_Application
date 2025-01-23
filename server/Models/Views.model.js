import mongoose from 'mongoose';

const viewSchema = new mongoose.Schema({
      URL_Alies: {
        type: String,
        required: true,
      },
  pageUrl: {
    type: String,
    required: true,
  },
  viewCount: {
    type: Number,
    default: 1,
  },
});

const ViewsModel = mongoose.model('View', viewSchema);
export default ViewsModel;