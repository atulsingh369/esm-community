"use client";
import { db, storage } from "@/app/config";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Gallery = () => {
	const [data, setData] = useState(null);

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
			console.log(error);
			setPhoto(
				"https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
			);
			setLoading(false);
		}
	};

	// Getting data
	const docRef = doc(db, "gallery", "images");

	useEffect(() => {
		const unsub = onSnapshot(docRef, (doc) => {
			setData(doc.data().images);
		});

		return () => {
			unsub;
		};
	}, []);


	return (
		<>
			<div className="p-5">
				<h1 id="heading1">
					Our Memories
				</h1>
				{data ? (
					<ul className="flex items-center justify-center flex-wrap">
						{data.map((item) => (
							<li className="h-96 m-2 hover:scale-105 transition-all ease-in-out duration-300 grow p-3 border-2 items-center border-white rounded-xl">
								<img
									src={item}
									alt="Gallery"
									className="max-h-full min-w-full object-cover align-bottom"
								/>
							</li>
						))}

						<li className="flex grow-10"></li>
					</ul>
				) : (
					<p>No Images to Show</p>
				)}
				<ToastContainer />
			</div>

			{/* Upload Gallery Images */}
			<div className="space-y-4">
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
			<ToastContainer />
		</>
	);
};

export default Gallery;

// Load More button for url display
{
	/* const imagePerRow = 4;
export const ImageGallery = ({ imageGallery }) => {
	const [next, setNext] = useState(imagePerRow);
const handleMoreImage = () => {
		setNext(next + imagePerRow);
	};
return (
		<>
			<div className="gap-y-4 flex flex-wrap justify-center">
				{imageGallery?.slice(0, next)?.map((image, index) => {
					return (
						<div
							key={index}
							className="px-2.5 md:px-0"
						>
							<img
								className="cursor-pointer"
								src={image?.url}
							/>
						</div>
					);
				})}
			 {next < imageGallery?.length && (
					<Button
						className="mt-4"
						onClick={handleMoreImage}
					>
						Load more
					</Button>
				)}
			</div>
		</>
	);
}; */
}
