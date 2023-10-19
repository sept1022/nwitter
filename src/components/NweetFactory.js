import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {database, storage} from "../fbase";
import {v4 as uuidv4} from "uuid";
import {addDoc, collection} from "firebase/firestore";
import * as PropTypes from "prop-types";
import {useState} from "react";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const [attachment, setAttachment] = useState("")
    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentUrl = "";
        if (attachment !== "") {
            try {
                const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`)
                await uploadString(storageRef, attachment, 'data_url')
                await getDownloadURL(storageRef).then((url) => {
                    attachmentUrl = url;
                })
            } catch (error) {
                console.log(error);
            }
        }

        try {
            await addDoc(collection(database, "nweet"),
                {
                    text: nweet,
                    createAt: Date.now(),
                    creatorId: userObj.uid,
                    attachmentUrl
                });
        } catch (error) {
            console.log(error.message)
        }
        setNweet("")
        setAttachment("")

    }

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    }

    const onFilechange = (event) => {
        // console.log(event.target.files)
        const {
            target: {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (event) => {
            const {
                currentTarget: {result},
            } = event;
            setAttachment(result);
            // console.log(finished)
        }
        console.log(reader.readAsDataURL(theFile));
    }

    const onClearAttachment = () => {
        setAttachment("");
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                value={nweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="file" onChange={onFilechange} accept="image/*"/>
            <input type="submit" value="Nweet"/>
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )
            }

        </form>);
}

NweetFactory.propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChange1: PropTypes.func,
    attachment: PropTypes.string,
    onClick: PropTypes.func
};

export default NweetFactory;