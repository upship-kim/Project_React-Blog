import mongoose from 'mongoose';

const { Schema } = mongoose;

//스키마 생성 : 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식인지 정의하는 객체
const PostSchema = new Schema({
    title: String,
    body: String,
    tags: [String], //문자열로 이루어진 배열
    publishedDate: {
        type: Date,
        default: Date.now, // 현재 날짜를 기본값으로 지정
    },
    user: {
        _id: mongoose.Types.ObjectId,
        username: String,
    },
});

//mongoose.model 생성
//위 스키마를 토대로 모델 실제 데이터베이스를 활용할 수 있는 인스턴스
const Post = mongoose.model('Post', PostSchema);
export default Post;
