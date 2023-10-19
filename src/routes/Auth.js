import {auth} from "fbase"
import {signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import AuthForm from "components/AuthForm"

const Auth = () => {
    const onSocialLogin = async (event) => {
        const {
            target: { name }
        } = event;

        let provider;
        if(name === "google")
            provider = new GoogleAuthProvider()
        else if(name === "github")
            provider = new GithubAuthProvider()

        await signInWithPopup(auth, provider);
    }

    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialLogin} name="google">Continue with Google</button>
                <button onClick={onSocialLogin} name="github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;