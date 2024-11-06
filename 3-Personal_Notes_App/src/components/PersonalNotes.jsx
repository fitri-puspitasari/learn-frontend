import React from "react";
import NotesMenu from "./NotesMenu";
import FeatherIcon from "./icon/FeatherIcon";

class PersonalNotes extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div className="personal-notes">
                <header className="note-app__header">
                    <h2>
                        <span>Personal Notes  </span>
                        <FeatherIcon />
                    </h2>
                </header>
                <main className="note-app__body">
                    <NotesMenu />
                    <div className="note-app__content"></div>
                </main>
            </div>
        )
    }
}

export default PersonalNotes;