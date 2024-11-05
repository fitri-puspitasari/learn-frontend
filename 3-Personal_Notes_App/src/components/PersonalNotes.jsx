import React from "react";

class PersonalNotes extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="personal-notes">
                <header className="note-app__header">
                    <button className="note-app__menu-button"><i className="fa-solid fa-bars"></i></button>
                    <h2>Personal Notes</h2>
                </header>
                <main className="note-app__body">
                    <div className="notes-menu"></div>
                    <div className="content"></div>
                </main>
            </div>
        )
    }
}

export default PersonalNotes;