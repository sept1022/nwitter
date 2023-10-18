import {HashRouter as Router, Route, Routes } from "react-router-dom";
import {Navigate} from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "components/Profile"

const AppRouter = ({isLoggedIn}) => {
    console.log(isLoggedIn)
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {
                    isLoggedIn ? (
                        <>
                            <Route exact path="/" element={<Home/>}/>
                            <Route exact path="/profile" element={<Profile />} />
                        </>
                    ) : (
                        <Route exact path="/" element={<Auth />}/>
                    )
                }
                {/*<Route path="/*" element={<Navigate replace to="/" />} />*/}
            </Routes>
        </Router>
    );
}

export default AppRouter;