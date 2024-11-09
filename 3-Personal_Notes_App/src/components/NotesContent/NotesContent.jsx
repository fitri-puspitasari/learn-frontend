import React from "react";
import NotesWritingArea from "./NotesWritingArea";
import NotesListArea from "./NotesListArea";
import NotesArchiveArea from "./NotesArchiveArea";
import NotesSearchArea from "./NotesSearchArea";

class NotesContent extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }
    render() {
        return (
            <div className="note-app__content">
                {(() => {
                    switch (this.props.pageActive) {
                        case 'writing-area':
                            return <NotesWritingArea />
                        case 'list-area':
                            return <NotesListArea />
                        case 'archive-area':
                            return <NotesArchiveArea />
                        case 'search-area':
                            return <NotesSearchArea />
                        default:
                            return null
                        }
                })()}
            </div>
        )
    }
}

export default NotesContent;

