"use client";
import React, { useEffect, useState } from "react";
import FuncNavbar from "../../../components/FuncNavabr";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../config";
import "./load.css";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [photo, setPhoto] = useState(
    "https://ik.imagekit.io/xji6otwwkb/Profile.png?updatedAt=1680849745697"
  );
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

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

  //Getting Data
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "users"), where("role", "==", "admin")),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setData(doc.data());
        });
      }
    );

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <>
      <FuncNavbar />
      <div>
        <h1 id="heading1">Admin Panel</h1>

        {/* Admin Info */}
        {data ? (
          <div className="flex flex-col-reverse md:flex-row justify-center items-center">
            <div className="flex hover:scale-105 transition-all ease-in-out duration-300 flex-col space-y-4 justify-center items-center">
              <p className="text-xl md:text-2xl font-semibold">
                Mr. {data.displayName}
              </p>
              <p className="text-xl md:text-2xl font-semibold">
                {data.serviceField}
              </p>
              <p className="text-xl md:text-2xl font-semibold">
                {data.phoneNo}
              </p>
              <p className="text-xl md:text-2xl font-semibold">{data.email}</p>
            </div>

            <div className="md:w-96 md:h-96 w-48 h-48 m-5 mx-12">
              <img
                src={data.photoURL}
                className="max-h-full hover:scale-105 transition-all ease-in-out duration-300 min-w-full rounded-box md:rounded-full"
                alt="Profile"
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-2xl my-48">😕 No Data Found 😕</p>
        )}

        <div className="flex flex-col md:flex-row justify-evenly m-10 text-xl">
          <button className="button2 rounded-xl">Upload Gallery Images</button>
          <button className="button2 rounded-xl">Upload Carousel Images</button>
          <button className="button2 rounded-xl">Upload Gallery Images</button>
        </div>

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

          <button onClick={upload} className="button4 w-full">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">
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
            </span>
          </button>

          <ToastContainer />
        </div>
        <ToastContainer />
      </div>

      <Footer />
    </>
  );
};

export default Admin;
