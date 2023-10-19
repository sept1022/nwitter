import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {auth} from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null)
    // setInterval(() => console.log(auth.currentUser), 2000)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                // setIsLoggedIn(true);
                // setUserObj(user);
                setUserObj({
                    uid: user.uid,
                    displayName: user.displayName,
                    updateProfile: (args) => user.updateProfile(args)
                })
            }
            else
                setUserObj(false)
                setIsLoggedIn(false);

            setInit(true);
        })
    }, []);
    // setInterval(() => console.log(auth.currentUser), 2000)

    const refreshUser = () => {
        const user = auth.currentUser;
        setUserObj({
            uid: user.uid,
            displayName: user.displayName,
            getIdToken: user.getIdToken,
            updateProfile: (args) => user.updateProfile(args)
        });
    }

    return (
        <>
            {init ? (
                <AppRouter
                    isLoggedIn={Boolean(userObj)}
                    userObj={userObj}
                    refreshUser={refreshUser} /> )
                : (
                    "initialing..."
                )}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
