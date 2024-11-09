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
        this.onChangeStatusArchivedHandler = this.onChangeStatusArchivedHandler.bind(this);
    }
    onChangeStatusArchivedHandler(id) {
        const newData = this.state.dataNote.map(data => {
            if (data.id == id) {
                return { ...data, archived: !data.archived };
            }
            return data;
        });
        // console.log(newData)
        this.setState(() => {
            return {
                dataNote: newData
            }
        })
        console.log(this.state.dataNote)
    }
    render() {
        return (
            <div className="note-app__content">
                {(() => {
                    switch (this.props.pageActive) {
                        case 'writing-area':
                            return <NotesWritingArea />
                        case 'list-area':
                            return <NotesListArea title="Catatan Aktif" dataNote={this.state.dataNote.filter((data) => {return data.archived == false})} onChangeStatusArchived={this.onChangeStatusArchivedHandler} />
                        case 'archive-area':
                            return <NotesListArea title="Catatan Diarsipkan" dataNote={this.state.dataNote.filter((data) => {return data.archived == true})} onChangeStatusArchived={this.onChangeStatusArchivedHandler} />
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

