import mongoose from "mongoose";
import { Password } from "../services/password";

//An interface that decribe the properties that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

//An interface that describes the properties that a User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
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

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
       const hashed = await Password.toHash(this.get('password'));
       this.set('password', hashed); 
    }
    done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

const User =  mongoose.model<UserDoc, UserModel>('User', userSchema);


export { User}