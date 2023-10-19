import {useState} from "react";
import {auth} from "fbase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,
    GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false)
    const [error, setError] = useState("");

    const toggleAccount = () => setNewAccount((prev) => !prev)

    const onSocialLogin = async (event) => {
        const {
            target: { name }
        } = event;

        let provider;
        if(name === "google")
            provider = new GoogleAuthProvider()
        else if(name === "github")
            provider = new GithubAuthProvider()

        const data = await signInWithPopup(auth, provider);
    }

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
            let data;
            if (newAccount)
                data = await createUserWithEmailAndPassword(auth, email, password);
            else
                data = await signInWithEmailAndPassword(auth, email, password);
        } catch(error) {
            setError(error.message);
            // console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} required />
                <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} required />
                <input type="submit" value={newAccount ?  "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign in": "Create Account"}
            </span>
            <div>
                <button onClick={onSocialLogin} name="google">Continue with Google</button>
                <button onClick={onSocialLogin} name="github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;