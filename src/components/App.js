import {useEffect, useState} from "react";
import AppRouter from "components/Router";
import {auth} from "fbase";

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // setInterval(() => console.log(auth.currentUser), 2000)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
            }
            setInit(true);
        })
    }, []);
    // setInterval(() => console.log(auth.currentUser), 2000)
    console.log('app:', isLoggedIn);
    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initialing..."}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    );
}

export default App;
