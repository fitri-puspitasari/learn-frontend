import React from "react";
import NotesWritingArea from "./NotesWritingArea";
import NotesListArea from "./NotesListArea";
import NotesArchiveArea from "./NotesArchiveArea";
import NotesSearchArea from "./NotesSearchArea";

class NotesContent extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div className="note-app__content">
                <NotesWritingArea />
                <NotesListArea />
                <NotesArchiveArea />
                <NotesSearchArea />
            </div>
        )
    }
}

export default NotesContent;