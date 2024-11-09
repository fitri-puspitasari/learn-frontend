import React from "react";
import FeatherIcon from "./icon/FeatherIcon";
import NotesMenu from "./NotesMenu/NotesMenu";
import NotesContent from "./NotesContent/NotesContent";

class PersonalNotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageContentActive: "search-area"   // opt: writing-area, list-area, archive-area, search-area
        };
        this.onChangePage = this.onChangePage.bind(this);
    }
    onChangePage(area) {
        this.setState(() => {
            return {
                pageContentActive: area
            }
        })
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
                    <NotesMenu pageActive={this.state.pageContentActive} onChangePage={this.onChangePage}/>
                    <NotesContent pageActive={this.state.pageContentActive} />
                </main>
                <footer className="note-app__footer">
                    <p>&#169; <a href="https://github.com/fitri-puspitasari">Fitri Puspitasari</a> 2024</p>
                </footer>
            </div>
        )
    }
}

export default PersonalNotes;