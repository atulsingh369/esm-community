import React, { useState } from "react";

const Gallery = () => {
	
	const [loading, setLoading] = useState(false);
	
	


  return (
    <>
      <div className="p-5">
        <h1 className="text-xl" id="heading">
          Our Memories
        </h1>

        <ul className="flex items-center justify-center flex-wrap">
          <li className="h-96 m-2 grow p-3 border-2 border-white rounded-xl">
            <img
              src="https://ik.imagekit.io/e5ixuxrlb/esm/WhatsApp_Image_2023-04-28_at_10.03.35.jpg?updatedAt=1685118255089"
              alt="Gallery"
              className="max-h-full min-w-full object-cover align-bottom"
            />
          </li>
          <li className="h-96 m-2 grow p-3 border-2 border-white rounded-xl">
            <img
              src="https://ik.imagekit.io/e5ixuxrlb/esm/WhatsApp_Image_2023-04-28_at_10.06.28.jpg?updatedAt=1684844000866"
              alt="Gallery"
              className="max-h-full min-w-full object-cover align-bottom"
            />
          </li>
          <li className="h-96 m-2 grow p-3 border-2 border-white rounded-xl">
            <img
              src="https://ik.imagekit.io/e5ixuxrlb/esm/sds.jpg?updatedAt=1684843998205"
              alt="Gallery"
              className="max-h-full min-w-full object-cover align-bottom"
            />
          </li>
          <li className="h-96 m-2 grow p-3 border-2 border-white rounded-xl">
            <img
              src="https://ik.imagekit.io/e5ixuxrlb/esm/sa.jpg?updatedAt=1684843994819"
              alt="Gallery"
              className="max-h-full min-w-full object-cover align-bottom"
            />
          </li>
          <li className="h-96 m-2 grow p-3 border-2 border-white rounded-xl">
            <img
              src="https://ik.imagekit.io/e5ixuxrlb/esm/WhatsApp_Image_2023-04-28_at_10.03.35.jpg?updatedAt=1685118255089"
              alt="Gallery"
              className="max-h-full min-w-full object-cover align-bottom"
            />
          </li>
          <li className="h-96 m-2 grow p-3 border-2 border-white rounded-xl">
            <img
              src="https://ik.imagekit.io/e5ixuxrlb/esm/WhatsApp_Image_2023-04-28_at_10.03.35.jpg?updatedAt=1685118255089"
              alt="Gallery"
              className="max-h-full min-w-full object-cover align-bottom"
            />
          </li>
          <li className="h-96 m-2 grow p-3 border-2 border-white rounded-xl">
            <img
              src="https://ik.imagekit.io/e5ixuxrlb/esm/WhatsApp_Image_2023-04-28_at_10.03.35.jpg?updatedAt=1685118255089"
              alt="Gallery"
              className="max-h-full min-w-full object-cover align-bottom"
            />
          </li>

          <li className="flex grow-10"></li>
        </ul>
      </div>
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
