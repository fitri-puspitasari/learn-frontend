import React from "react";
import NotesWritingArea from "./NotesWritingArea";
import NotesListArea from "./NotesListArea";
import NotesSearchArea from "./NotesSearchArea";
import { getInitialData } from "../../utils";

class NotesContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNote: getInitialData()
        }
        this.onChangeStatusArchivedHandler = this.onChangeStatusArchivedHandler.bind(this);
        this.onAddDataHandler = this.onAddDataHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }
    onAddDataHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                dataNote: [
                    ...prevState.dataNote,
                    {
                        id: +new Date(),
                        title,
                        body,
                        archived: false,
                        createdAt: new Date()
                    }
                ]

            }
        })
    }
    onDeleteHandler(id) {
        const dataNote = this.state.dataNote.filter(data => data.id !== id);
        this.setState({ dataNote });
    }
    onChangeStatusArchivedHandler(id) {
        const newData = this.state.dataNote.map(data => {
            if (data.id == id) {
                return { ...data, archived: !data.archived };
            }
            return data;
        });
        this.setState(() => {
            return {
                dataNote: newData
            }
        })
    }
    render() {
        return (
            <div className="note-app__content">
                {(() => {
                    switch (this.props.pageActive) {
                        case 'writing-area':
                            return <NotesWritingArea onAddData={this.onAddDataHandler}/>
                        case 'list-area':
                            return <NotesListArea 
                                    listClass="note-content__list-area" 
                                    title="Catatan Aktif" 
                                    dataNote={this.state.dataNote.filter((data) => {return data.archived == false})} 
                                    onChangeStatusArchived={this.onChangeStatusArchivedHandler} 
                                    onDelete={this.onDeleteHandler} />
                        case 'archive-area':
                            return <NotesListArea 
                                    listClass="note-content__list-area" 
                                    title="Catatan Diarsipkan" 
                                    dataNote={this.state.dataNote.filter((data) => {return data.archived == true})} 
                                    onChangeStatusArchived={this.onChangeStatusArchivedHandler} 
                                    onDelete={this.onDeleteHandler}/>
                        case 'search-area':
                            return <NotesSearchArea 
                                    dataNote={this.state.dataNote}
                                    onChangeStatusArchived={this.onChangeStatusArchivedHandler} 
                                    onDelete={this.onDeleteHandler}/>
                        default:
                            return null
                        }
                })()}
            </div>
        )
    }
}

export default NotesContent;

