import {HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from "./Navigation";
import Profile from "components/Profile"

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Routes>
                {
                    isLoggedIn ? (
                        <>
                            <Route exact path="/" element={<Home userObj={userObj}/>}/>
                            <Route exact path="/profile" element={<Profile
                                                                    userObj={userObj}
                                                                    refreshUser={refreshUser} />} />
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