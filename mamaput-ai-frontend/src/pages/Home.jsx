import wave from "../assets/img/wavyline.svg";
import Features from "../components/featureBlock";
// import heroMenuImg1 from "../assets/img/heroMenu-topleft.svg";
// import heroMenuImg2 from "../assets/img/heroMenu-topright.svg";
// import heroMenuImg3 from "../assets/img/heroMenu-middleright.svg";
// import heroMenuImg4 from "../assets/img/center.svg";
import heroImage from "../assets/img/heroImage.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const featureList = [
    {
      icon: "NotePadText",
      headingText: "Nutritional Insights",
      featureContent:
        "Instantly check the nutritional value of your favorite African dishes and make informed food choices.",
      colour: "amber",
    },
    {
      icon: "Coffee",
      headingText: "Personalized Meal Plans",
      featureContent:
        "Get AI generated custom meal recommendations based on your dietary preferences, health goals, and local ingredients.",
      link: "/learn-more",
      colour: "lightBlue",
    },
    {
      icon: "HeartIcon",
      headingText: "Dietary Restrict Support",
      featureContent: "Manage health and dietary instructions for meals",
      colour: "rose",
    },
    {
      icon: "BicepsFlexed",
      headingText: "Fitness Plans",
      featureContent:
        "Get personalized fitness plans to help you stay active and reach your health goals.",
      colour: "grey",
    },
    {
      icon: "ChartPie",
      headingText: "Food Logging and Tracking",
      featureContent:
        "Keep track of what you eat daily and get insights into your eating habits.",
      colour: "tertiaryGreen",
    },
  ];

  const whyChooseUsList = [
    {
      headingText: "The Health Crisis Approach",
      content:
        "Diet-related diseases like diabetes and hypertension cause over 60% of deaths in Africa. Many struggle to balance traditional meals with modern nutrition. MamaPut AI helps by providing personalised, AI-powered meal plans that keep you healthy while staying true to your roots.",
    },
    {
      headingText: "The Cultural Connection Approach",
      content:
        "Most diet apps ignore African cuisine, offering unrealistic meal plans. MamaPut AI celebrates our food, helping you enjoy favourites like Jollof, ugali, and injera in a healthier way without losing tradition or flavour.",
    },
    {
      headingText: "Food Security and Availability value",
      content:
        "With food prices rising by 10% annually, eating healthy can feel expensive. Unlike generic diet apps, MamaPut AI suggests nutritious, budget friendly meals using locally available ingredients making healthy eating accessible to everyone.",
    },
    {
      headingText: "The Convenience Approach",
      content:
        "Busy schedules often lead to unhealthy eating. MamaPut AI simplifies meal planning with quick, AI powered food recommendations, portion control, and local ingredient swaps helping you eat better without the hassle.",
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      {/* Hero Menu */}
      <main className="container m-auto px-4 py-8 md:py-32 w-full h-full flex flex-col items-center justify-center gap-5">
        <div className="uppercase bg-tertiaryGreen text-black min-w-content md:w-1/4 p-2 text-center text-xs lg:text-sm font-medium rounded-full">
          for africans by africans
        </div>
        <h1 className="text-primaryGreen font-spicy-rice lg:text-7xl md:text-5xl text-2xl text-center">
          Healthy Food Choices,
          <br />
          Healthy{" "}
          <span
            className={`bg-[url('${wave}')] bg-no-repeat bg-bottom bg-contain inline-block`}
          >
            life.
          </span>
        </h1>
      </main>

      {/* About section */}
      <section className="container mx-auto my-12 w-11/12 md:w-5/6 min-w-content rounded-2xl flex flex-col lg:flex-row md:h-fit text-white font-instrument-sans lg:overflow-hidden">
        <div className="flex-1">
          <img
            src={heroImage}
            alt="Woman with a haircut"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 bg-secondaryGreen lg:py-6 py-12 lg:px-32 px-16 flex flex-col justify-center gap-6 md:gap-12 bg-[url('./assets/img/africanMap.svg')] bg-repeat bg-right bg-cover">
          <h3 className="text-2xl md:text-4xl font-bold leading-11 md:leading-14">
            Made for africans by <br />
            africans.
          </h3>
          <p className="text-sm md:text-xl lg:text-base">
            Rooted in Africa’s rich culinary heritage, MamaPut AI is designed to
            understand and cater to the unique nutritional needs of Africans.
            From local ingredients to traditional meals, we blend culture with
            innovation to help you eat healthier while staying true to your
            roots.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              className="btn--text-white bg-black py-2 px-4"
              href="/get-started"
            >
              Get Started
            </a>
            <a
              className="btn--text-white py-2 px-4 underline underline-offset-4"
              href="/learn-more"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className=" md:p-12 h-fit">
        <div className="text-center m-auto lg:w-2/5 w-3/5 my-8 font-instrument-sans flex flex-col gap-5">
          <h3 className="text-2xl md:text-3xl font-bold leading-11 md:leading-14">
            Designed for you Powered by AI.
          </h3>
          <p className="leading-6">
            Using AI we combine the wisdom of African cuisine with cutting edge
            technology to provide personalised meal plans, nutrition insights,
            and healthier food choice tailored just for you.
          </p>
        </div>
        <div className="flex flex-col gap-5 h-full w-11/12 md:w-full md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:grid-rows-4 py-10 mx-auto">
          {featureList.map((feature, index) => (
            <Features
              key={index}
              icon={feature.icon}
              headingText={feature.headingText}
              featureContent={feature.featureContent}
              link={feature.link}
              colour={feature.colour}
              className={`${
                index === 4 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              } ${index === 0 ? "lg:row-span-4 h-full" : ""} ${
                index === 1 ? "lg:row-span-3 lg:col-span-2" : ""
              } ${index === 2 ? "lg:order-3 lg:col-span-2" : ""} ${
                index === 3 ? "lg:row-span-2" : ""
              }`}
              iconClassName={`${index === 0 ? "bg-[#FDE68A]" : ""} ${
                index === 1 ? "bg-[#7DD3FC]" : ""
              } ${index === 2 ? "text-red-500 bg-white " : ""} ${
                index === 3 ? "bg-[#FEE2E2]" : ""
              } ${index === 4 ? "bg-[#86EFAC]" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose us */}
      <section className="w-full h-fit mx-auto flex flex-col gap-10 lg:gap-20 md:mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-center">
          Why Choose Us
        </h3>
        <ul className="flex md:flex-wrap md:flex-row flex-col justify-evenly w-10/12 gap-6 m-auto text-justify list-disc marker:text-[#22C55E]">
          {whyChooseUsList.map((item, index) => (
            <li
              key={index}
              className={`basis-2/5 px-5 ${
                index === 0 || index === 2 ? "md:border-r" : ""
              }`}
            >
              <h4 className="font-bold text-lg">{item.headingText}</h4>
              <p className="text-gray-700">{item.content}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Get Started */}
      <section
        className="mx-auto my-12 w-11/12 md:w-5/6 h-96 rounded-2xl flex flex-col md:gap-8 gap-3 items-center justify-center 
  text-black border-4 border-primaryGreen font-instrument-sans bg-tertiaryGreen 
  bg-[url('./assets/img/top_bg.svg'),url('./assets/img/bottom_bg.svg')] 
  bg-[position:right_top,left_bottom] bg-no-repeat md:bg-contain bg-[size:30%]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-center max-w-2xs break-words">
          Ready to start eating good?
        </h3>
        <Link
          to="/get-started"
          className="block uppercase btn--text-white bg-black rounded text-lg md:text-xs"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;
