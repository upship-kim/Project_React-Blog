import React from 'react';
import Responsive from '../components/common/Responsive';
import HeaderContainer from '../container/common/HeaderContainer';
import EditorContainer from '../container/write/EditorContainer';
import TagBoxContainer from '../container/write/TagBoxContainer';
import WriteActionButtonsContainer from '../container/write/WriteActionButtonsContainer';

const WritePage = () => {
    return (
        <>
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
