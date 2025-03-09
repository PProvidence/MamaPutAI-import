import PropTypes from "prop-types";

import { Coffee, NotepadText, ChartPie, BicepsFlexed } from "lucide-react";
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

const Features = ({ icon, headingText, featureContent, link, colour }) => {
  // Retrieve the icon component from the mapping
  const IconComponent = iconMap[icon];
  const bgClass = bgColorMap[colour] || "";

  return (
    <div className={`container text-black ${bgClass} p-4 rounded-2xl w-11/12 m-auto`}>
      {IconComponent ? (
        <IconComponent className="w-6 h-6 mb-2" />
      ) : (
        <div className="w-6 h-6 mb-2" /> // fallback if icon not found
      )}
      <h3 className="font-bold leading-12 text-2xl">{headingText}</h3>
      <p className="leading-6">{featureContent}</p>
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
};

export default Features;
