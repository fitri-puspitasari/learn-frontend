import React from "react";
import NotesWritingArea from "./NotesWritingArea";
import NotesListArea from "./NotesListArea";
import NotesSearchArea from "./NotesSearchArea";
import { getInitialData } from "../../utils";

class NotesContent extends React.Component {
    constructor(props) {
        super(props);
        console.log(getInitialData())
        this.state = {
            dataNote: getInitialData()
        }
        
    }

    render() {
        return (
            <div className="note-app__content">
                {(() => {
                    switch (this.props.pageActive) {
                        case 'writing-area':
                            return <NotesWritingArea />
                        case 'list-area':
                            return <NotesListArea title="Catatan Aktif" dataNote={this.state.dataNote.filter((data) => {return data.archived == false})} />
                        case 'archive-area':
                            return <NotesListArea title="Catatan Diarsipkan" dataNote={this.state.dataNote.filter((data) => {return data.archived == true})} />
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

