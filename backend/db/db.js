import mongoose from "mongoose";

function connectDb() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
export default connectDb;