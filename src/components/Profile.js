import {auth, database} from "fbase";
import {updateProfile} from "firebase/auth"
import {collection, getDocs, query, where, orderBy} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Profile = ({userObj, refreshUser}) => {
    console.log(userObj)
    const navigate= useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const onLogOutClick = () => {
        // getAuth(app).signOut();
        auth.signOut();
        navigate("/");
    }

    const onChange = (e) => {
        const {
            target: {value}
        } = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(newDisplayName)
        if(userObj.displayName !== newDisplayName) {
            await updateProfile(userObj, {displayName: newDisplayName});
            refreshUser();
        }
    }

    useEffect(() => {
        getMyNweets()
    })
    const getMyNweets = async () => {
        try {
            const docRef = query(collection(database, "nweet"),
                where("creatorId", "==", userObj.uid),
                orderBy("createAt", "asc"));
            const snapShot = await getDocs(docRef);
            // const snapShot = await getDocs(q);
            snapShot.docs.map((doc) => {
                console.log(doc.data())
            })
        } catch (e) {
           console.log(e.message)
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text"
                       onChange={onChange}
                       placeholder="Display Name"
                       value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;