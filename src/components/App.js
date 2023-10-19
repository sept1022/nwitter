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
                setIsLoggedIn(true);
                setUserObj(user);
            }
            else
                setIsLoggedIn(false);

            setInit(true);
        })
    }, []);
    // setInterval(() => console.log(auth.currentUser), 2000)

    const refreshUser = () => {
        setUserObj(auth.currentUser);
    }

    return (
        <>
            {init ? (
                <AppRouter
                    isLoggedIn={isLoggedIn}
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
