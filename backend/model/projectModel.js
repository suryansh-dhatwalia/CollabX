import mongoose from "mongoose";

const{ Schema } = mongoose;

const ProjectSchema = new Schema ({
    name:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true,
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

const Project = mongoose.model('Project',ProjectSchema);

export default Project;