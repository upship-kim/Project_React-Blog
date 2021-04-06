import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

//JsonWebToken 사용 설정
UserSchema.methods.generateToken = function () {
    const token = jwt.sign(
        { _id: this.id, username: this.username }, //첫번쨰 파라미터 : 토큰 안에 집어 넣고 싶은 데이터
        process.env.JWT_SECRET, //두번째 파라미터: JWT 암호
        { expiresIn: '7d' }, //세번재 파라미터: 7일동안 사용 가능 (여러 옵션 중 하나)
    );
    return token;
};

//static 메서드는 모델에서 바로 사용할 수 있는 함수
UserSchema.statics.findByUsername = function (username) {
    return this.findOne({ username }); //여기서 this는 User 모델을 뜻함
};

const User = mongoose.model('User', UserSchema);

export default User;
