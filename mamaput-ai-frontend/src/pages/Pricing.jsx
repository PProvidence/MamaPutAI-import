import PriceBlock from "../components/priceBlock";

const Pricing = () => {
  const priceBlockContent = [
    {
      heading: "Basic",
      user: "For individuals",
      price: "10",
      planContent: [
        "Personalized meal plan",
        "Calorie and nutrient tracking",
        "Integration with health apps",
      ],
      action: "7 DAY FREE TRIAL",
      bgColor: "tertiaryGrey",
    },
    {
      heading: "Pro",
      user: "Family Plan(up to 5 members)",
      price: "35",
      planContent: [
        "Personalized meal plan",
        "Calorie and nutrient tracking",
        "Integration with health apps",
        "Weekly health insights",
        "AI Chat Support",
        "Access to AI generated Recipes",
      ],
      action: "Learn more",
      bgColor: "grey",
    },
    {
      heading: "Premium",
      user: "Family Plan(6 members)",
      price: "50",
      planContent: [
        "Pro features",
        "Dietician Consultation",
        "Grocery list generator",
        "Grocery list generator",
      ],
      action: "Learn more",
      bgColor: "pricingGreen",
      tag: "Best Deal",
    },
  ];
  return (
    <div className="lg:px-32 px-16 py-10 flex flex-col gap-20">
      <h3 className="text-2xl md:text-4xl font-bold max-w-2xs break-words tracking-wide font-dm-sans">
        Choose what's right for you
      </h3>
      <div className="flex lg:flex-row flex-col w-full justify-center gap-5 font-dm-sans">
        <button className="btn--text-white bg-primaryGreen lg:w-1/6 ">
          Monthly billing
        </button>
        <button className="btn--text-black border-grey border-2 lg:w-1/6">
          Annual billing
        </button>
      </div>
      <div className="flex flex-wrap md:grid lg:grid-cols-3 md:grid-cols-2 min-h-fit h-full justify-center w-full gap-10">
        {priceBlockContent.map((content, index) => (
          <PriceBlock
            key={index}
            {...content}
            className={`${index % 2 === 0 ? "lg:h-11/12" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
