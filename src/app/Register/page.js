"use client";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";
import { RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { db, auth } from "../config";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const RegisterForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const [otp, setOtp] = useState("");
	const [ph, setPh] = useState("");
	const [showOTP, setShowOTP] = useState(false);


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
				toast.success("OTP sended successfully!");
			})
			.catch((error) => {
				toast.error(error);
				setLoading(false);
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
				router.push("/Register/Details");
			})
			.catch((err) => {
				toast.error(err);
				setLoading(false);
			});
	}

	return (
		<>
			<div className="flex flex-col justify-center items-center h-screen">
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
			</div>
		</>
	);
};

export default RegisterForm;
