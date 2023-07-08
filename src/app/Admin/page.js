"use client";
import React, { useState } from "react";
import FuncNavbar from "../../../components/FuncNavabr";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../config";
import "./load.css"

const Admin = () => {

	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);
	const [photo, setPhoto] = useState(
		"https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
	);
	const [name, setName] = useState("");

	//Displaying Photo
	const handleChange = async (e) => {
		setImage(e.target.files[0]);
		setPhoto(URL.createObjectURL(e.target.files[0]));
		setName(e.target.files[0].name);
	};

	//Uploading Photo
	const upload = async () => {
		try {
			setLoading(true);
			if (!image) {
				toast.error("Photo not Selected");
				setPhoto(
					"https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
				);
				setLoading(false);
				return;
			}

			// Getting data
			const docRef = doc(db, "gallery", "images");
			const docSnap = await getDoc(docRef);

			// uploading Photo
			const imageRef = ref(storage, `Gallery/${name}`);
			await uploadBytes(imageRef, image);
			const url = await getDownloadURL(imageRef);

			// If data exist save it to array otherwise create new
			if (docSnap.exists()) {
				await setDoc(doc(db, "gallery", "images"), {
					images: [...docSnap.data().images, url],
				});
			} else {
				await setDoc(doc(db, "gallery", "images"), {
					images: [url],
				});
			}

			setPhoto(
				"https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
			);
			setLoading(false);
			toast.success("Photo Uploaded Succesfully");
		} catch (error) {
			toast.error(error.code);
			setPhoto(
				"https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
			);
			setLoading(false);
		}
	};

	return (
		<>
			<div className="h-screen">
				<FuncNavbar />

				<h1 id="heading1">Admin Panel</h1>
				<div>
					{/* Upload Gallery Images */}
					<div className="space-y-6">
						<label
							htmlFor="aad"
							className="flex mt-10 flex-col p-5 items-center border-4 border-dashed border-white rounded-xl">
							<div className="shrink-0">
								<img
									className="h-48 w-fit object-contain"
									src={photo}
									alt="Upload in Gallery"
								/>
							</div>
							<input
								onChange={handleChange}
								type="file"
								id="aad"
								accept="image/jpeg,image/jpg,image/png"
								className="mx-auto mt-8 text-sm text-white file:mr-4 file:py-2 file:px-4 file:bg-[#FF671F] file:rounded-full file:border-0 file:text-sm file:font-semibold hover:file:cursor-pointer"
							/>
						</label>
						<button onClick={upload} className="button1 w-full">
							{loading ? (
								<div className="spinner mx-auto">
									<div></div>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
									<div></div>
								</div>
							) : (
								"Upload"
							)}
						</button>
						<ToastContainer />
					</div>
				</div>
				<ToastContainer />
			</div>
			<Footer />
		</>
	)
}

export default Admin;