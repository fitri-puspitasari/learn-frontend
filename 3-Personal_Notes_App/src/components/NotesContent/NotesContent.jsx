import React from "react";
import NotesWritingArea from "./NotesWritingArea";
import NotesListArea from "./NotesListArea";

class NotesContent extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div className="note-app__content">
                <div>
                    <NotesWritingArea />
                    <NotesListArea />
                    {/* <NotesArchiveArea />
                    <NotesSearchArea /> */}
                </div>
            </div>
        )
    }
}

export default NotesContent;