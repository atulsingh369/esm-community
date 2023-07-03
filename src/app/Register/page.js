"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, sendEmailVerification, updateProfile } from "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../config";
import { setUser } from "../../store";
import Details from "./Details/page"


const RegisterForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	// const dispatch = useDispatch();

	const [otp, setOtp] = useState("");
	const [value, setValue] = useState()
	const [showOTP, setShowOTP] = useState(false);
	const [curUser, setCurUser] = useState({
		email: "",
		password: "",
	});
	const [data, setData] = useState([]);
	const [showDetail, setShowDetail] = useState(false);
	const [emailPass, setEmailPass] = useState(false);

	// useEffect(() => {
	// 	const unSub = onSnapshot(doc(db, "users", curUser.email), (doc) => {
	// 		doc.exists() && setData(doc.data());
	// 	});

	// 	return () => {
	// 		unSub();
	// 		setLoading(false);
	// 	};
	// }, []);

	const signUp = async () => {
		setLoading(true);
		if (!curUser.email || !curUser.password || !curUser.name) {
			toast.error("Enter Required Details");
			setCurUser({
				name: "",
				email: "",
				password: "",
			});

			setLoading(false);
			return;
		}
		try {
			const credential = await createUserWithEmailAndPassword(
				auth,
				curUser.email,
				curUser.password
			);
			const res = credential.user;
			await updateProfile(res, {
				displayName: curUser.name,
			});
			await sendEmailVerification(res);
			await setDoc(doc(db, "users", res.email), {
				uid: res.uid,
				displayName: res.displayName,
				email: res.email,
			});
			setCurUser({
				name: "",
				email: "",
				password: "",
			});

			setLoading(false);
			setTimeout(() => {
				setEmailPass(true);
			}, 2500);
			toast.success("Registerd Succesfully");
		} catch (error) {
			toast.error(error.code);
			console.log(error);
			setLoading(false)
			setCurUser({
				name: "",
				email: "",
				password: "",
			});
		}
	};

	return (
		<>
			{!emailPass ? (
				<div className="flex flex-col justify-center items-center h-screen">
					<div className="w-1/2">
						<div className='form rounded-md'>
							<p id="heading">Sign Up</p>
							<div className="field">                              {/*Name*/}
								<svg
									className="input-icon"
									xmlns="http://www.w3.org/2000/svg"
									width="12"
									height="12"
									fill="currentColor"
									viewBox="0 0 448 512">
									<path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
								<input
									autoComplete="off"
									required
									name="name"
									placeholder="Enter Name"
									className="input-field"
									type="text"
									value={curUser.name}
									onChange={(e) =>
										setCurUser({ ...curUser, name: e.target.value })
									}
								/>
							</div>
							<div className="field">                              {/*Email*/}
								<svg
									className="input-icon"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16">
									<path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
								</svg>
								<input
									autoComplete="off"
									required
									placeholder="Email"
									className="input-field"
									type="email"
									name="email"
									value={curUser.email}
									onChange={(e) =>
										setCurUser({ ...curUser, email: e.target.value })
									}
								/>
							</div>
							<div className="field">                              {/*Password*/}
								<svg
									className="input-icon"
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									viewBox="0 0 16 16">
									<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
								</svg>
								<input
									autoComplete="off"
									placeholder="Password"
									className="input-field"
									type="password"
									name="password"
									value={curUser.password}
									onChange={(e) =>
										setCurUser({ ...curUser, password: e.target.value })
									}
									required
								/>
							</div>

							<button
								onClick={signUp}
								className="btn w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
								{loading ? ("Signing You Up") : ("Sign Up")}
							</button>

						</div>
					</div>
					<ToastContainer />
				</div>
			)
				: (
					<Details />
				)}



		</>
	);
};

export default RegisterForm;
