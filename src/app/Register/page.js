import { MdAttachEmail } from "react-icons/md";
import Link from "next/link";

const RegisterForm = () => {

	const signUp = async () => {
		setLoading(true);
		if (!curUser.email || !curUser.password) {
			toast.error("Enter Required Details");
			setCurUser({
				name: "",
				email: "",
				password: "",
			});

			setLoading(false);
			setPasswordType("password");
			return;
		}
		try {
			// await sendSignInLinkToEmail(auth, curUser.email, actionCodeSettings);
			const credential = await createUserWithEmailAndPassword(
				auth,
				curUser.email,
				curUser.password
			);
			const res = credential.user;
			await updateProfile(res, {
				displayName: curUser.email,
			});
			await sendEmailVerification(res);
			await setDoc(doc(db, "users", res.email), {
				uid: res.uid,
				displayName: res.displayName,
				photoURL: res.photoURL,
				email: res.email,
			});
			setState(!state);
			setCurUser({
				email: "",
				password: "",
			});
			const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
				if (currentUser && currentUser.uid === user.uid) {
					currentUser.reload();
					if (currentUser.emailVerified) {
						// Email is verified, do nothing
						unsubscribe(); // Stop listening for changes
					} else {
						// Email is not verified, delete the user
						deleteDoc(doc(db, "users", user.email));
						currentUser.delete();
						toast.error("Email not verified, account deleted.");
						unsubscribe(); // Stop listening for changes
					}
				}
			});
			toast.success("Registerd Succesfully");
		} catch (error) {
			toast.error(error.code);
			console.log(error);
			setCurUser({
				email: "",
				password: "",
			});
		}
	};

	return (
		<>
			<div className="flex flex-col justify-center items-center h-screen">
				<div className="w-1/2">
					<div className="form">
						<p id="heading">Register</p>

						<div className="field">
							<MdAttachEmail className="input-icon" />
							<input
								autocomplete="off"
								placeholder="Email"
								className="input-field"
								type="text"
								
							/>
						</div>
						<div className="field">
							<svg
								className="input-icon"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
							</svg>
							<input
								placeholder="Create Password"
								className="input-field"
								type="password"
							/>
						</div>
						<div className="field">
							<svg
								className="input-icon"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
							</svg>
							<input
								placeholder="Re-type Password"
								className="input-field"
								type="password"
							/>
						</div>
						<Link href="/Register/Details">
							<div className="btn">
								<button className="button2">
									Sign Up
								</button>
							</div>
						</Link>
						<button className="button3">Clear All</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterForm;
