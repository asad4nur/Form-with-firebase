import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router";

const Login = () => {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('')
    const emailRef = useRef();

    const handleLoginForm = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log( email, password);

        setSuccess(false)

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result);
                const user = result.user;
                if (!user.emailVerified) {
                    setError('Please verify your email before logging in.');
                    return;
                }
                setSuccess(true)
                

            })
            .catch((error) => {
                console.log(error.message);
                setError("Invalid email or password.");
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            alert('Pleaser Provide Valid Email')
        }else{
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                alert('Password reset email sent')
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleLoginForm}>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <fieldset className="fieldset">
                                    <label className="fieldset-label">Email</label>
                                    <input type="email" name="email" ref={emailRef} className="input" placeholder="Email" required/>
                                    <label className="fieldset-label">Password</label>
                                    <input type="password" name="password" className="input" placeholder="Password" required />
                                    <div><a onClick={handleForgetPassword} className="link link-hover">Forgot password?</a></div>
                                    <button className="btn btn-neutral mt-4">Login</button>
                                    <p>New in here? <Link to='/registration' className="text-blue-800 font-bold">Sign Up</Link> </p>
                                </fieldset>

                            </div>
                            {
                                success && <p className="text-green-700"> Login Successful</p>
                            }
                            {
                                error && <p className="text-red-700">{error}</p>

                            }
                        </div>
                    </div>
                </div>

            </form>

        </div>
    );
};

export default Login;