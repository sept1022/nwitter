import * as PropTypes from "prop-types";
import {useState} from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../fbase";

const AuthForm = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false)

    const onChange = (e) => {
        const {
            target: {name, value},
        } = e;
        if(name === "email")
            setEmail(value);
        else
            setPassword(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount)
                await createUserWithEmailAndPassword(auth, email, password);
            else
                await signInWithEmailAndPassword(auth, email, password);
        } catch(error) {
            setError(error.message);
            // console.log(error);
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)

    return <>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" value={email} onChange={onChange}
                   required/>
            <input name="password" type="password" placeholder="Password" value={password} onChange={onChange}
                   required/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
    </>;
}

AuthForm.propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    onChange: PropTypes.func,
    value1: PropTypes.string,
    newAccount: PropTypes.bool,
    error: PropTypes.string,
    onClick: PropTypes.func
};

export default AuthForm;