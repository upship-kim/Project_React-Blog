import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import WriteActionButtons from '../../components/write/WriteActionButton';
import { writePost } from '../../modules/write';

const WriteActionButtonsContainer = ({ history }) => {
    const dispatch = useDispatch();
    const { title, body, tags, post, postError } = useSelector(({ write }) => ({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
    }));

    const onPublish = () => {
        dispatch(writePost({ title, body, tags }));
    };

    const onCancel = () => {
        history.goBack();
    };

    useEffect(() => {
        if (post) {
            console.log(post);
            const { _id, user } = post;
            history.push(`/@${user.username}/${_id}`);
        }
        if (postError) {
            console.log('error', postError);
        }
    }, [post, postError, history]);

    return (
        <WriteActionButtons
            onPublish={onPublish}
            onCancel={onCancel}
        ></WriteActionButtons>
    );
};

export default withRouter(WriteActionButtonsContainer);
