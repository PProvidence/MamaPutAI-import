import PropTypes from "prop-types";
import { Check } from "lucide-react";

const bgColorMap = {
  pricingGreen: "bg-pricingGreen",
  grey: "bg-grey",
  tertiaryGrey: "bg-tertiaryGrey",
};

const PriceBlock = ({ heading, user, price, planContent, action, bgColor, className, tag }) => {
  const bgClass = bgColorMap[bgColor] || ""; // Ensure fallback if color is invalid

  return (
    <div
      className={`p-6 rounded-xl shadow-lg ${bgClass} ${className} text-black flex flex-col gap-4 w-full lg:w-80 `}
    >
      <h4 className="text-2xl font-bold  w-full">{heading} <span className={`${tag ? "inline-block" : "hidden"} "bg-[#22C55E] font-normal text-white text-base p-4`}>{tag}</span></h4>
      <p className="font-extralight text-darkGrey text-sm w-full">{user}</p>
      <span className="text-4xl font-bold w-full">
        <span className="align-super">$</span>
        {price}
        <span className="align-sub font-extralight text-darkGrey text-sm">per month</span>
      </span>
      <p className="w-full font-extralight text-darkGrey text-sm"><span className="text-black font-bold">Include</span> <br/> Everything you get in this plan</p>
      <ul className="text-left w-full text-sm list-inside">
        {planContent.map((content, index) => (
          <li key={index} className="py-2 flex  gap-2">
            <Check className="text-xs text-primaryGreen"/>
            {content}
          </li>
        ))}
      </ul>
      <button className="mt-4 bg-primaryGreen text-white px-4 py-2 rounded-lg w-3/4">
        {action}
      </button>
    </div>
  );
};

PriceBlock.propTypes = {
  heading: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  planContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  action: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  className: PropTypes.string,
  tag: PropTypes.string,
};

export default PriceBlock;
