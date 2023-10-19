import {database, storage} from "fbase"
import {doc, deleteDoc, updateDoc} from "firebase/firestore"
import {ref, deleteObject, getDownloadURL } from "firebase/storage"
import {useState} from "react";

function Nweet({obj, isOwner}) {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(obj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");

        if (ok) {
            try {
                const userDoc = doc(database, "nweet", obj.id)
                // const docSnap = await getDoc(userDoc);
                await deleteDoc(userDoc);

                const objRef = ref(storage, obj.attachmentUrl);
                await deleteObject(objRef)
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        // console.log(obj.id, newNweet)
        try {
            const userDoc = doc(database, "nweet", obj.id)
            // const docSnap = await getDoc(userDoc);
            await updateDoc(userDoc, {text: newNweet});
        } catch (error) {
            console.log(error.message)
        }
        setEditing(false);
    }

    return (<div>
        {editing ? (<>
            <form onSubmit={onSubmit}>
                <input value={newNweet} onChange={onChange} required/>
                <input type="submit" value="Update Nweet" />
            </form>
            <button onClick={toggleEditing}>Cancel</button>
            </>)
            : (
            <>
                <h4>{obj.text}</h4>
                {obj.attachmentUrl && (
                    <img src={obj.attachmentUrl} width="50" height="50" />
                )}
                {isOwner && (
                    <>
                        <button onClick={onDeleteClick}>Delete Nweet</button>
                        <button onClick={toggleEditing}>Edit Nweet</button>
                    </>
                )}
            </>)
        }
    </div>);
}

export default Nweet