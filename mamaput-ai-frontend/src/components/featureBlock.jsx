import PropTypes from "prop-types";

import { Coffee, NotepadText, ChartPie, BicepsFlexed} from "lucide-react";
import { HeartIcon } from "@heroicons/react/24/solid";

// Create a mapping from string names to icon components
const iconMap = {
  Coffee: Coffee,
  NotePadText: NotepadText,
  HeartIcon: HeartIcon,
  BicepsFlexed: BicepsFlexed,
  ChartPie: ChartPie,
};

const bgColorMap = {
  amber: "bg-amber",
  lightBlue: "bg-lightBlue",
  rose: "bg-rose",
  grey: "grey",
  tertiaryGreen: "bg-tertiaryGreen",
};

const Features = ({ icon, headingText, featureContent, link, colour, className, iconClassName }) => {
  // Retrieve the icon component from the mapping
  const IconComponent = iconMap[icon];
  const bgClass = bgColorMap[colour] || "";

  return (
    <div className={`container text-black ${bgClass} p-4 lg:py-3 lg:px-12 rounded-4xl h-64 lg:h-11/12 min-h-content flex flex-col justify-evenly ${className}`}>
      {IconComponent ? (
        <IconComponent className={`w-12 h-12 md:w-12 md:h-12 rounded-full p-2  ${iconClassName}`} />
      ) : (
        <div className="w-6 h-6 mb-2" /> // fallback if icon not found
      )}
      <div className="flex flex-col gap-4">
      <h3 className="font-bold  text-2xl">{headingText}</h3>
      <p className="leading-6">{featureContent}</p>
      </div>
      {link && <a href={link} className="underline underline-offset-4">Learn more</a>}
    </div>
  );
};

Features.propTypes = {
  icon: PropTypes.string.isRequired,
  headingText: PropTypes.string.isRequired,
  featureContent: PropTypes.string.isRequired,
  link: PropTypes.string,
  colour: PropTypes.string,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
};

export default Features;
