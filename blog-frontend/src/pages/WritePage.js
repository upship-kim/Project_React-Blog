import React from 'react';
import Responsive from '../components/common/Responsive';
import WriteActionButton from '../components/write/WriteActionButton';
import EditorContainer from '../container/write/EditorContainer';
import TagBoxContainer from '../container/write/TagBoxContainer';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer />
            <TagBoxContainer />
            <WriteActionButton />
        </Responsive>
    );
};

export default WritePage;
