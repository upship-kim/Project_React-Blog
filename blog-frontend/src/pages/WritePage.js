import React from 'react';
import Responsive from '../components/common/Responsive';
import Editor from '../components/write/Editor';
import TagBox from '../components/write/TagBox';
import WriteActionButton from '../components/write/WriteActionButton';
import EditorContainer from '../container/write/EditorContainer';

const WritePage = () => {
    return (
        <Responsive>
            <EditorContainer />
            <TagBox />
            <WriteActionButton />
        </Responsive>
    );
};

export default WritePage;
