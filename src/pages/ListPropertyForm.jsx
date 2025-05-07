import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

// State and city data
const stateCities = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
  ],
  Delhi: ["New Delhi", "Noida", "Gurgaon", "Faridabad", "Ghaziabad"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
  ],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Agra",
    "Prayagraj",
    "Gorakhpur",
    "Meerut",
    "Greater Noida",
    "Noida",
  ],
};

const amenitiesList = [
  "Gym",
  "Swimming Pool",
  "Security",
  "Power Backup",
  "Car Parking",
  "Lift",
  "WiFi",
  "AC",
  "Laundry",
];

const propertyTypes = ["apartment", "house", "pg", "villa", "office"];

const ListPropertyForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const selectedState = watch("state");
  const fileInputRef = useRef(null);

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Create previews for new files
    const newPreviews = [];
    const newImages = [...galleryImages];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setGalleryPreviews((prev) => [...prev, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
      newImages.push(file);
    });

    setGalleryImages(newImages);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));

    // Reset file input to allow selecting the same files again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const onSubmit = async (data) => {
    try {
      // Reset previous state
      setSubmitError("");
      setUploadProgress(0);
      setSubmitSuccess(false);

      const formData = new FormData();

      // Append form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === "amenities" && Array.isArray(value)) {
          value.forEach((amenity) => formData.append("amenities", amenity));
        } else if (key !== "images") {
          formData.append(key, value);
        }
      });

      // Append images
      galleryImages.forEach((image) => {
        formData.append("images", image);
      });

      // Send request
      const response = await axios.post(
        "http://localhost:5000/api/properties",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("owner_token")}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      // Handle success
      if (response.data) {
        setSubmitSuccess(true);
        reset();
        setGalleryImages([]);
        setGalleryPreviews([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          error.message ||
          "Failed to create property"
      );
    } finally {
      setUploadProgress(0); // Reset regardless of success/failure
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-6xl mx-auto my-10 p-6 shadow-md rounded-xl text-neutral-900"
    >
      <h2 className="text-2xl font-heading font-semibold text-primary-700">
        List a New Property
      </h2>

      {/* Success and error messages */}
      {submitSuccess && (
        <div className="p-4 mb-4 bg-green-100 text-green-700 rounded-md">
          Property listed successfully!
        </div>
      )}
      {submitError && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}

      {/* Basic Information Section */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Title*</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
            placeholder="Property title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Property Type*</label>
          <select
            {...register("type", { required: "Property type is required" })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>
      </div>

      {/* Location Section */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">State*</label>
          <select
            {...register("state", { required: "State is required" })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          >
            <option value="">Select State</option>
            {Object.keys(stateCities).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">City*</label>
          <select
            {...register("city", { required: "City is required" })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
            disabled={!selectedState}
          >
            <option value="">
              {selectedState ? "Select City" : "Select State First"}
            </option>
            {selectedState &&
              stateCities[selectedState].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Rent (₹)*</label>
          <input
            type="number"
            {...register("rent", {
              required: "Rent is required",
              min: { value: 1, message: "Rent must be positive" },
            })}
            className="w-full border border-neutral-300 rounded-md px-3 py-2"
          />
          {errors.rent && (
            <p className="text-red-500 text-sm mt-1">{errors.rent.message}</p>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div>
        <label className="block font-medium mb-1">Address*</label>
        <textarea
          {...register("address", { required: "Address is required" })}
          className="w-full border border-neutral-300 rounded-md px-3 py-2"
          rows={3}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Description Section */}
      <div>
        <label className="block font-medium mb-1">Description*</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          className="w-full border border-neutral-300 rounded-md px-3 py-2"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Amenities Section */}
      <div>
        <label className="block font-semibold text-secondary-700 mb-2">
          Amenities
        </label>
        <div className="flex flex-wrap gap-3">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-2 text-neutral-700"
            >
              <input
                type="checkbox"
                value={amenity}
                {...register("amenities")}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Image Upload Section */}
      <div>
        <label className="block font-semibold text-secondary-700 mb-1">
          Property Images* ({galleryImages.length} selected)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
          className="file-input file:border-0 file:bg-primary-100 file:text-primary-800 border border-neutral-300 rounded-md px-3 py-2"
          required={galleryImages.length === 0}
        />

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Uploading: {uploadProgress}%
            </p>
          </div>
        )}

        {/* Image Previews */}
        {galleryPreviews.length > 0 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-4">
              {galleryPreviews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-24 object-cover rounded-md border border-neutral-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <span className="absolute bottom-1 left-1 right-1 bg-black bg-opacity-50 text-white text-xs text-center py-1 rounded-b-md truncate px-1">
                    {galleryImages[index].name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isAvailable"
          {...register("isAvailable")}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          defaultChecked
        />
        <label htmlFor="isAvailable" className="text-neutral-700">
          Property is currently available
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary-500 text-white px-6 py-2 rounded-md shadow hover:bg-primary-600 transition duration-200 disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : (
          "Submit Property"
        )}
      </button>
    </form>
  );
};

export default ListPropertyForm;
