import React from "react";
import NotesListArea from "./NotesListArea";

class NotesSearchArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
        this.getFilteredData = this.getFilteredData.bind(this)
        this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this)
    }
    getFilteredData() {
        return (this.state.keyword == '') ? [] : this.props.dataNote.filter((data) => data.title.toLowerCase().includes(this.state.keyword))
    }
    onKeywordChangeEventHandler(event) {
        this.setState(() => {
            return {
                keyword: event.target.value
            }
        })
    }
    render() {
        return (
            <div className="note-content__search-area">
                <h3>Cari Catatan</h3>
                <form className="note-content__search-input">
                    <div className="search-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                    <input type="text" name="title" placeholder="Keyword judul" maxLength={50} value={this.state.keyword} onChange={this.onKeywordChangeEventHandler} required/>
                    {/* <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button> */}
                </form>
                <div className="note-content__search-result">
                    <NotesListArea 
                        listClass="search-result__active-notes" 
                        title="Catatan Aktif" 
                        dataNote={this.getFilteredData().filter((data) => {return data.archived == false})} 
                        onChangeStatusArchived={this.props.onChangeStatusArchived} 
                        onDelete={this.props.onDelete} />
                    <NotesListArea 
                        listClass="search-result__active-notes" 
                        title="Catatan Diarsipkan" 
                        dataNote={this.getFilteredData().filter((data) => {return data.archived == true})}
                        onChangeStatusArchived={this.props.onChangeStatusArchived} 
                        onDelete={this.props.onDelete} />
                </div>
            </div>



        )
    }
}

export default NotesSearchArea;
