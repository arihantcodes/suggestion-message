import mongoose, {Document, Schema} from 'mongoose';


export interface Message extends Document {
    content: string;
    createdAt: Date;
} 

const MessageSchema:Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verfifycodeexpires: Date;
    isverified: boolean;
    isAccepting: boolean;
    messages: Message[];
} 


const UserSchema:Schema<User>= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\..+/ ,'please fill a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    verifycode:{
        type:String,
        required:true
    },
    verfifycodeexpires:{
        type:Date,
        required:true
    },
    isverified:{
        type:Boolean,
        required:true,
        default:false
    
    },
    isAccepting:{
        type:Boolean,
        required:true,
        default:true
    
    },
    messages:{
        type:[MessageSchema],
        required:false
    }

})


const UserModel = (mongoose.models.User as mongoose.Model<User>) ||mongoose.model<User>('User',UserSchema);

export default UserModel;