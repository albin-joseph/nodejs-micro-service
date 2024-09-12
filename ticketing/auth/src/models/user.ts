import mongoose from "mongoose";

interface UserAttrs {
    email: string;
    password: string;
}

interface UserModel extends mongoose.Model<any> {
    build(attrs: UserAttrs): any;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User =  mongoose.model<any, UserModel>('User', userSchema);


export { User}