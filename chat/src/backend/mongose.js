import mongoose from 'mongoose';


const { Schema } = mongoose;

const blogSchema = new Schema({
  firstname: String, // String is shorthand for { type: String }
  lastname:String,
  password:  { type: String, required: true },
  emailid:{ type: String, required: true, unique: true }
});

// Create and export the Blog model
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
