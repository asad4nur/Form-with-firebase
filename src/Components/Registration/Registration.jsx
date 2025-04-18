import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Registration = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const handleRegistration = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked;
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        console.log(email, name, password, photo);
        
        setErrorMessage('');
        setSuccess(false);

        if (!terms) {
            setErrorMessage('Please accept our term and policy');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Must be more than 8 characters, including number, lowercase letter, uppercase letter')
            return;
        }

        const passwordRegularExpression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

        if (!passwordRegularExpression.test(password)) {
            setErrorMessage('Must be more than 8 characters, including number, lowercase letter, uppercase letter');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        alert('Verification email sent')
                    })
                e.target.reset(); // ✅ only resets if everything succeeded

                const profile = {
                    displayName: name,
                    photoURL: photo,
                }
                updateProfile(auth.currentUser, profile)
                .then(()=>{
                    console.log('Profiel Updated');
                })
                .catch(error => console.log(error,'Profile Update error'))

            })
            .catch((error) => {
                console.log('ERROR Message', error);
                setErrorMessage(error.message)
                setSuccess(false)
            })

    }
    return (
        <div className="max-w-md mx-auto bg-base-200 mt-8 p-8">
            <form onSubmit={handleRegistration} className="space-y-3 relative">
                <label className="input validator join-item">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="text" name="name" placeholder="name" />
                </label>
                <label className="input validator join-item">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="text" name="photo" placeholder="photo Url" />
                </label>
                <label className="input validator join-item">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="email" name="email" placeholder="mail@site.com" required />
                </label>
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                    <input type={showPassword ? 'text' : 'password'} name="password" required placeholder="Password" />
                </label>
                <button onClick={() => setShowPassword(!showPassword)} className="absolute top-16 right-10"> {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>} </button>

                <fieldset className="fieldset p-4 bg-base-100 border border-base-300 rounded-box w-80 ml-8">
                    <label className="fieldset-label">
                        <input type="checkbox" name="terms" className="checkbox" />
                        Accept our privacy policy and terms and condition!
                    </label>
                </fieldset>
                <button className="btn btn-neutral mt-4">Login</button>
                <p>Already have An Account? <Link to="/login" className="text-blue-800 font-bold">Login</Link> </p>
            </form>
            {
                errorMessage && <p className="text-red-400">{errorMessage}</p>
            }
            {
                success && <p className="text-green-400 mt-4">Sign up successfully done</p>
            }
        </div>
    );
};

export default Registration;