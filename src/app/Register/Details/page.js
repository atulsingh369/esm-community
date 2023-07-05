"use client";
import React, { useState } from "react";
import { FaServicestack } from "react-icons/fa";
import { GiField } from "react-icons/gi";
import { BiCurrentLocation } from "react-icons/bi";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../config";
import "../load.css"

const Details = (props) => {
	console.log(props.email);
	const [loading, setLoading] = useState(false);
	const initialValues = {
		phn: "",
		serviceNo: "",
		serviceField: "",
		address: "",
		panNo: "",
	}

	const [details, setDetails] = useState({
		phn: "",
		serviceNo: "",
		serviceField: "",
		address: "",
		panNo: "",
	})

	const add = async () => {
		try {
			setLoading(true)
			if (!details.phn || !details.serviceNo || !details.serviceField || !details.address || !details.panNo) {
				toast.error("Enter Details");
				setDetails(initialValues);
				setLoading(false);
				return;
			} else {
				console.log(email);
				await updateDoc(doc(db, "users", props.email), {
					phoneNo: details.phn,
					serviceNo: details.serviceNo,
					serviceField: details.serviceField,
					address: details.address,
					panNo: details.panNo
				});
				setDetails(initialValues);
				setLoading(false);

			}
		} catch (error) {
			toast.error(error.message);
			setDetails(initialValues);
			setLoading(false);
		}
	}

	return (
		<>
			<div className="flex flex-col justify-center items-center h-screen">
				<div className="w-screen md:w-1/2">
					<div className="form">
						<p id="heading">Fill Up Your Details</p>

						<div className="field">                              {/*Phone No*/}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height={8}
								width={8}
								className="input-icon"
								fill="currentColor"
								viewBox="0 0 512 512">
								<path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
							<input

								name="phn"
								required
								placeholder="Mobile No"
								className="input-field"
								type="tel"
								maxLength="10"
								onChange={(e) => setDetails({
									...details, phn: e.target.value
								})}
								value={details.phn}
							/>
						</div>
						<div className="field">                              {/*Service No*/}
							<FaServicestack className="input-icon" />
							<input

								name="serviceNo"
								required
								placeholder="Service No"
								className="input-field"
								type="text"
								onChange={(e) => setDetails({
									...details, serviceNo: e.target.value
								})}
								value={details.serviceNo}
							/>
						</div>
						<div className="field">                              {/*Service*/}
							<GiField className="input-icon" />
							<select value={details.serviceField}
								onChange={(e) =>
									setDetails({
										...details, serviceField: e.target.value
									})}
								className="w-full h-5 bg-[#171717] rounded-full outline-none ">
								<option value="0" key="0">
									Select Your Service Field
								</option>
								<option value="Army" key="1">
									Army
								</option>
								<option value="Air Force" key="2">
									Air Force
								</option>
								<option value="Navy" key="3">
									Navy
								</option>
							</select>
						</div>
						<div className="field">                              {/*Address*/}
							<BiCurrentLocation className="input-icon" />
							<input

								name="Address"
								required
								placeholder="Address"
								className="input-field"
								type="text"
								onChange={(e) => setDetails({
									...details, address: e.target.value
								})}
								value={details.address}
							/>
						</div>
						<div className="field">                              {/*Pan No*/}
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

								name="Pan No"
								required
								placeholder="Pan No"
								className="input-field"
								type="text"
								onChange={(e) => setDetails({
									...details, panNo: e.target.value
								})}
								value={details.panNo}
							/>
						</div>
						{/* <Link href="/Register/AadharCard"> */}
						<div className="btn mb-2">
							<button onClick={add} className="button2">
								{loading ? (
									<div className="wrapper">
										<div className="circle" />
										<div className="circle" />
										<div className="circle" />
										<div className="shadow" />
										<div className="shadow" />
										<div className="shadow" />
									</div>
								) : ("Save & Next")}

							</button>
						</div>
					</div>
				</div>
				<ToastContainer />
			</div >
		</>
	);
};

export default Details;
