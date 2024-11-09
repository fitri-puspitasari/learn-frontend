import React from "react";
import { showFormattedDate } from "../../utils";

function NotesListArea({ title, dataNote, onChangeStatusArchived }) {
    console.log(title)
    console.log(dataNote)
    console.log(onChangeStatusArchived)
    console.log("-----------")
    return (
        <div className="note-content__list-area">
            <h3>{title}</h3>
            <div className="notes-list">
                {dataNote.map((data) => (
                    <div className="note-item" key={data.id}>
                        <div className="note-item__texts">
                            <h5 className="note-item__title">{data.title}</h5>
                            <p className="note-item__date">{showFormattedDate(data.createdAt)}</p>
                            <p className="note-item__body">{data.body}</p>
                        </div>
                        <div className="note-item__buttons">
                            <button className="primary-button" onClick={() => onChangeStatusArchived(data.id)}>{title == "Catatan Aktif" ? "Arsipkan" : "Pindahkan"}</button>
                            <button className="danger-button">Hapus</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotesListArea;