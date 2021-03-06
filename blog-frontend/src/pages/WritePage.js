import React from 'react';
import AskModal from '../components/common/AskModal';
import Responsive from '../components/common/Responsive';
import HeaderContainer from '../container/common/HeaderContainer';
import EditorContainer from '../container/write/EditorContainer';
import TagBoxContainer from '../container/write/TagBoxContainer';
import WriteActionButtonsContainer from '../container/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
    return (
        <>
            <Helmet>
                <title>새 글 쓰기</title>
            </Helmet>
            <HeaderContainer />
            <Responsive>
                <EditorContainer />
                <TagBoxContainer />
                <WriteActionButtonsContainer />
            </Responsive>
        </>
    );
};

export default WritePage;
