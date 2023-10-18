import {auth} from "fbase";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate= useNavigate();
    const onLogOutClick = () => {
        // getAuth(app).signOut();
        auth.signOut();
        navigate("/");

    }

    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;