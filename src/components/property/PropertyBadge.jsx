import { FaCheck, FaThumbtack, FaStar, FaLeaf } from "react-icons/fa";

const PropertyBadge = ({ type }) => {
  const getBadgeContent = () => {
    switch (type) {
      case "verified":
        return {
          icon: <FaCheck className="mr-1" />,
          text: "Verified Owner",
          className:
            "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm",
        };
      case "top":
        return {
          icon: <FaThumbtack className="mr-1" />,
          text: "Top Listing",
          className:
            "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm",
        };
      case "trusted":
        return {
          icon: <FaStar className="mr-1" />,
          text: "Trusted Owner",
          className:
            "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-sm",
        };
      case "green":
        return {
          icon: <FaLeaf className="mr-1" />,
          text: "Quick Replies",
          className:
            "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm",
        };
      default:
        return null;
    }
  };

  const badgeContent = getBadgeContent();

  if (!badgeContent) return null;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeContent.className}`}
    >
      {badgeContent.icon}
      {badgeContent.text}
    </span>
  );
};

export default PropertyBadge;
