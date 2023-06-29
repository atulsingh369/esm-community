"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { db, auth } from "../config";
import { setUser } from "../../store";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from 'react-redux';
import { FaServicestack } from "react-icons/fa";
import { GiField } from "react-icons/gi";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";

const RegisterForm = (props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	// const dispatch = useDispatch();

	const [otp, setOtp] = useState("");
	const [ph, setPh] = useState("");
	const [showOTP, setShowOTP] = useState(false);

	const [showDetail, setShowDetail] = useState(false)


	const onCaptchVerify = () => {
		if (!window.recaptchaVerifier) {
			window.recaptchaVerifier = new RecaptchaVerifier(
				"recaptcha-container",
				{
					size: "invisible",
					callback: (response) => {
						onSignup();
					},
					"expired-callback": () => { },
				},
				auth
			);
		}
	}

	const onSignup = async () => {
		setLoading(true);
		onCaptchVerify();

		const appVerifier = window.recaptchaVerifier;

		const formatPh = "+" + ph;

		await signInWithPhoneNumber(auth, formatPh, appVerifier)
			.then((confirmationResult) => {
				window.confirmationResult = confirmationResult;
				setLoading(false);
				setShowOTP(true);
				toast.success("OTP sent successfully!");
			})
			.catch((error) => {
				toast.error(error);
				setLoading(false);
				setPh("");
			});
	}

	const onOTPVerify = () => {
		setLoading(true);
		window.confirmationResult
			.confirm(otp)
			.then(async (res) => {
				toast.success("Verified");
				setLoading(false);
				console.log(res.user);
				await setDoc(doc(db, "request", res.user.phoneNumber), {
					uid: res.user.uid,
					phoneNumber: res.user.phoneNumber,
				});
				// dispatch(setUser(res.user));
				setShowDetail(true)
			})
			.catch((err) => {
				toast.error(err);
				setLoading(false);
			});
	}

	return (
		<>
			{!showDetail ? (<div className={`flex flex-col justify-center items-center h-screen ${props.hide}`}>
				<div className="w-1/2">

					<div className="w-full form flex flex-col gap-4 rounded-lg p-4">
						{showOTP ? (
							<>
								<div className="bg-white text-secondary border-4 border-[#FF671F] w-fit mx-auto p-4 rounded-full">
									<BsFillShieldLockFill size={30} />
								</div>
								<label
									htmlFor="otp"
									className="font-bold text-xl text-white text-center"
								>
									Enter your OTP
								</label>
								<OtpInput
									value={otp}
									onChange={setOtp}
									OTPLength={6}
									otpType="number"
									disabled={false}
									autoFocus
									className="opt-container "
								></OtpInput>
								<button
									onClick={onOTPVerify}
									className="btn w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
								>
									{loading && (
										<CgSpinner size={20} className="mt-1 animate-spin" />
									)}
									<span className="button2">Verify OTP</span>
								</button>
							</>
						) : (
							<>
								<div className="bg-white text-secondary border-4 border-[#FF671F] w-fit mx-auto p-4 rounded-full">
									<BsTelephoneFill size={30} />
								</div>
								<label
									htmlFor=""
									className="font-bold text-xl my-5 text-white text-center"
								>
									Verify your phone number
								</label>
								<PhoneInput country={"in"} value={ph} onChange={setPh} />
								<div id="recaptcha-container"
									data-sitekey="6LcsaxsdAAAAAEBn0sPDCEncnU9564MisyRuDzD_"
									data-callback="sendForm"
									data-size="invisible">
								</div>
								<button
									onClick={onSignup}
									className="w-full btn flex gap-1 items-center justify-center py-2.5 text-white rounded"
								>
									{loading && (
										<CgSpinner size={20} className="mt-1 animate-spin" />
									)}
									<span className="button2">Send code via SMS</span>
								</button>
							</>
						)}
					</div>
				</div>
				<ToastContainer />
			</div>) : (<div className="flex flex-col justify-center items-center h-screen">
				<div className="w-1/2">
					<div className="form">
						<p id="heading">Fill Up Your Details</p>
						<div className="field">
							<svg
								className="input-icon"
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
							</svg>
							<input
								autoComplete="off"
								placeholder="Name"
								className="input-field"
								type="text"
							/>
						</div>
						<div className="field">
							<FaServicestack className="input-icon" />
							<input
								autoComplete="off"
								placeholder="Service No."
								className="input-field"
								type="text"
							/>
						</div>
						<div className="field">
							<GiField className="input-icon" />
							<select className="w-full h-5 bg-[#171717] rounded-full outline-none ">
								<option value="0" key="0">
									Select Your Service Field
								</option>
								<option value="1" key="1">
									Army
								</option>
								<option value="2" key="2">
									Air Force
								</option>
								<option value="3" key="3">
									Navy
								</option>
							</select>
						</div>
						<div className="field">
							<BiCurrentLocation className="input-icon" />
							<input
								placeholder="Address"
								className="input-field"
								type="text"
							/>
						</div>
						<div className="field">
							<BsFillTelephoneForwardFill className="input-icon" />
							<input
								placeholder="Email"
								className="input-field"
								type="email"
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
								<path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
							</svg>
							<input
								autoComplete="off"
								placeholder="Pan Card (Optional)"
								className="input-field"
								type="text"
							/>
						</div>
						<div className="btn mb-2">
							<button className="button2">
								Save & Next
							</button>
						</div>
					</div>
				</div>
			</div>)}

		</>
	);
};

export default RegisterForm;
