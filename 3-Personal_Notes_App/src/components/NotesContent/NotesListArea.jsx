import React from "react";
import { showFormattedDate } from "../../utils";

function NotesListArea({ listClass, title, dataNote, onChangeStatusArchived, onDelete }) {
    // console.log(dataNote)
    return (
        <div className={listClass}>
            <h3>{title}</h3>
            {dataNote.length == 0 ?
                <p className="notes-list__empty-note-message">Tidak ada catatan</p>
                :
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
                                <button className="danger-button" onClick={() => onDelete(data.id)}>Hapus</button>
                            </div>
                        </div>
                    ))}
            </div>
            }
        </div>
    )
}

export default NotesListArea;