import React from "react";

class NotesWritingArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
        };
        this.titleSaved = "";
        this.isShowSubmitMessage = false;
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
        this.onResetEventHandler = this.onResetEventHandler.bind(this);
        this.resetData = this.resetData.bind(this);
    }
    onTitleChangeEventHandler(event) {
        this.isShowSubmitMessage = false;
        this.setState(() => {
            return {
                title: event.target.value,
            }
        })
    }
    onBodyChangeEventHandler(event) {
        this.isShowSubmitMessage = false;
        this.setState(() => {
            return {
                body: event.target.value,
            }
        })
    }
    onSubmitEventHandler(event) {
        event.preventDefault();
        this.props.onAddData(this.state);
        this.titleSaved = this.state.title;
        this.isShowSubmitMessage = true;
        this.resetData();
    }
    onResetEventHandler(event) {
        this.isShowSubmitMessage = false;
        this.resetData();
    }
    resetData() {
        this.setState(() => {
            return {
                title: '',
                body: '',
            }
        })
    }
    render() {
        return (
            <div className="note-content__writing-area">
                <h3>Catatan Baru</h3>
                <form className="note-input" onSubmit={this.onSubmitEventHandler}>
                    <div className="note-input__text-areas">
                        <div className="note-input__title">
                            <input type="text" name="title" placeholder="Judul" maxLength={50} value={this.state.title} onChange={this.onTitleChangeEventHandler} required/>
                            <p>Sisa karakter: 50</p>
                        </div>
                        <div className="note-input__content">
                            <textarea name="content" placeholder="Isi catatan" value={this.state.body} onChange={this.onBodyChangeEventHandler} required></textarea>
                        </div>
                    </div>
                    <div className="note-input__buttons">
                        <button type="reset" className="neutral-button" onClick={this.onResetEventHandler}>Reset</button>
                        <button type="submit" className="primary-button">Simpan</button>
                        {this.isShowSubmitMessage ? <p className="note-input_submit-message">Catatan "{this.titleSaved}" berhasil disimpan!</p> : null}
                    </div>
                </form>
            </div>
        )
    }
}

export default NotesWritingArea;