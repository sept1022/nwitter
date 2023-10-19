import {useEffect, useState} from "react";
import * as PropTypes from "prop-types";

import {database} from "fbase";
import {collection, onSnapshot, getDocs, query, orderBy} from "firebase/firestore"

import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

Nweet.propTypes = {nweet: PropTypes.any};


const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([])

    useEffect(() => {
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

    return (
        <>
            <NweetFactory userObj={userObj} />
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} obj={nweet} isOwner={nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </>
    )
}

export default Home;