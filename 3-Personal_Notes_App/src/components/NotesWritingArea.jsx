import React from "react";

class NotesWritingArea extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (
            <div className="note-content__writing-area">
                <h3>Catatan Baru</h3>
                <form className="note-input">
                    <div className="note-input__title">
                        <input type="text" name="title" placeholder="Judul" maxLength={50} required/>
                    </div>
                    <div className="note-input__content">
                        {/* <input type="text" name="content" placeholder="Isi catatan"/> */}
                        <textarea name="content" placeholder="Isi catatan" required></textarea>
                    </div>
                    <div className="note-input__buttons">
                        <button type="reset" className="neutral-button">Reset</button>
                        <button type="submit" className="primary-button">Simpan</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default NotesWritingArea;