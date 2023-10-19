import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";

import {database, storage} from "fbase";
import {collection, addDoc, onSnapshot, getDocs, query, orderBy} from "firebase/firestore"
import {ref, uploadString, getDownloadURL} from "firebase/storage"
import {v4 as uuidv4} from "uuid"

import Nweet from "components/Nweet";

Nweet.propTypes = {nweet: PropTypes.any};
const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])
    const [attachment, setAttachment] = useState("")

    useEffect(() => {
        // getNweets();
        onSnapshot(query(collection(database, "nweet"), orderBy("createAt", "desc")), (snapshot) => {
            const docs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(docs)
        })

    }, []);

    // const getNweets = async () => {
    //     const docs = await getDocs(collection(database, "nweet"));
    //     docs.forEach((doc) => {
    //         const temp = {...doc.data(), id:doc.id}
    //         setNweets((prev) => [temp, ...prev])
    //         // console.log(doc.data())
    //     })
    // }

    // console.log(nweets)

    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentUrl = "";
        if(attachment !== "") {
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

    // console.log(nweets[0].creatorId == userObj.uid)
    return (
        <>
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

            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} obj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </>
    )
}

export default Home;