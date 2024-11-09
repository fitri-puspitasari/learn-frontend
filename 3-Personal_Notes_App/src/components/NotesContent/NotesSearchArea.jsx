import React from "react";

class NotesSearchArea extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div className="note-content__search-area">
                <h3>Cari Catatan</h3>
                <form className="note-content__search-input">
                    <input type="text" name="title" placeholder="Keyword judul" maxLength={50} required/>
                    <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className="note-content__search-result">
                    <div className="search-result__active-notes">
                        <h4>Catatan Aktif</h4>
                        <div className="notes-list">
                            <div className="note-item">1</div>
                            <div className="note-item">2</div>
                            <div className="note-item">3</div>
                            <div className="note-item">4</div>
                            <div className="note-item">5</div>
                        </div>

                    </div>
                    <div className="search-result__archive-notes">
                        <h4>Catatan Diarsipkan</h4>
                        <div className="notes-list">
                            <div className="note-item">6</div>
                            <div className="note-item">7</div>
                            <div className="note-item">8</div>
                            <div className="note-item">9</div>
                            <div className="note-item">10</div>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}

export default NotesSearchArea;
