import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: String,
    hashedPassword: String,
});
//인스턴스 함수 모델을 통해 만든 문서 인스턴스에서 사용할 수 있는 함수 ( 더 세부적 )
UserSchema.methods.setPassword = async function (password) {
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; //true or false 반환
};

UserSchema.methods.serialize = function () {
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

//static 메서드는 모델에서 바로 사용할 수 있는 함수
UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username }); //여기서 this는 User 모델을 뜻함
};

const User = mongoose.model('User', UserSchema);

export default User;
