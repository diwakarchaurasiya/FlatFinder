import React, { useState } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  title: "",
  location: "",
  price: "",
  isRent: true,
  bedrooms: 1,
  bathrooms: 1,
  sqft: "",
  image: "",
  category: "apartment",
  badges: ["Added Recently"],
  description: "",
  amenities: [],
  furnished: "Unfurnished",
  availableFrom: "",
  owner: {
    name: "",
    contact: "",
    responseTime: "",
  },
  images: [],
};

const amenitiesList = [
  "Gym",
  "Swimming Pool",
  "Security",
  "Power Backup",
  "Car Parking",
  "Lift",
];
const badgesList = ["verified", "top", "green"];
const furnishedOptions = ["Unfurnished", "Semi-Furnished", "Fully-Furnished"];
const categories = ["apartment", "house", "villa"];
const responseTimes = ["Within 1 hour", "Within 2 hours", "Within a day"];

const ListPropertyForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const onSubmit = (data) => {
    data.price = Number(data.price);
    data.bedrooms = Number(data.bedrooms);
    data.bathrooms = Number(data.bathrooms);
    data.sqft = Number(data.sqft);
    data.images = galleryImages;
    data.image = mainImage;
    console.log(data);
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages(files);

    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setGalleryPreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMainImage = () => {
    setMainImage(null);
    setMainImagePreview("");
  };

  const removeGalleryImage = (index) => {
    const newImages = [...galleryImages];
    newImages.splice(index, 1);
    setGalleryImages(newImages);

    const newPreviews = [...galleryPreviews];
    newPreviews.splice(index, 1);
    setGalleryPreviews(newPreviews);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-6xl mx-auto my-10 p-6  shadow-md rounded-xl text-neutral-900"
    >
      <h2 className="text-2xl font-heading font-semibold text-primary-700">
        List a New Property
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            {...register("location", { required: true })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            {...register("category")}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Bedrooms</label>
          <input
            type="number"
            {...register("bedrooms")}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Bathrooms</label>
          <input
            type="number"
            {...register("bathrooms")}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Sqft</label>
          <input
            type="number"
            {...register("sqft")}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full border border-neutral-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Furnished</label>
        <select
          {...register("furnished")}
          className="w-full border border-neutral-300 rounded-md px-3 py-2"
        >
          {furnishedOptions.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Available From</label>
        <input
          type="date"
          {...register("availableFrom")}
          className="w-full border border-neutral-300 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-semibold text-secondary-700">
          Amenities
        </label>
        <div className="flex flex-wrap gap-3 mt-1">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-neutral-700"
            >
              <input
                type="checkbox"
                value={amenity}
                {...register("amenities")}
                className="accent-primary-500"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-semibold text-secondary-700 mb-1">
          Main Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleMainImageChange}
          className="file-input file:border-0 file:bg-primary-100 file:text-primary-800 border border-neutral-300 rounded-md px-3 py-2"
        />
        {mainImagePreview && (
          <div className="mt-2 flex items-center gap-4">
            <div className="relative">
              <img
                src={mainImagePreview}
                alt="Main preview"
                className="h-20 w-20 object-cover rounded-md border border-neutral-300"
              />
              <button
                type="button"
                onClick={removeMainImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <span className="text-sm text-neutral-700">{mainImage.name}</span>
          </div>
        )}
      </div>

      <div>
        <label className="block font-semibold text-secondary-700 mb-1">
          Gallery Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className="file-input file:border-0 file:bg-primary-100 file:text-primary-800 border border-neutral-300 rounded-md px-3 py-2"
        />
        {galleryPreviews.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-4">
            {galleryPreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Gallery preview ${index}`}
                  className="h-20 w-20 object-cover rounded-md border border-neutral-300"
                />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Owner Name</label>
          <input
            {...register("owner.name")}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Owner Contact</label>
          <input
            {...register("owner.contact")}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Response Time</label>
          <select
            {...register("owner.responseTime")}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          >
            {responseTimes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary-500 text-white px-6 py-2 rounded-md shadow hover:bg-primary-600 transition duration-200"
      >
        Submit Property
      </button>
    </form>
  );
};

export default ListPropertyForm;
