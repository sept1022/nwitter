import {useEffect, useState} from "react";
import {database} from "fbase";
import {collection, addDoc, getDocs} from "firebase/firestore"

const Home = () => {
    const [nweet, setNweet] = useState("")
    const [nweets, setNweets] = useState([])

    useEffect(() => {
        getNweets();
    }, []);

    const getNweets = async () => {
        const docs = await getDocs(collection(database, "nweet"));
        docs.forEach((doc) => {
            const temp = {...doc.data(), id:doc.id}
            setNweets((prev) => [temp, ...prev])
            // console.log(doc.data())
        })
    }

    console.log(nweets)

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const ref = await addDoc(collection(database, "nweet"),
                {text: nweet, createAt: Date.now()});
            console.log("document written: ", ref.id)
        } catch(error) {
            console.log(error.message)
        }
        setNweet("")
    }

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value},
        } = event;
        setNweet(value);
    }

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
            <input type="submit" value="Nweet"/>
        </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home;