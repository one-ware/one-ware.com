import Layout from "@theme/Layout";
import styles from "./one-ai.module.css";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import Slider from "react-slick";
import React, { useRef, useState, useEffect } from "react";
import "aos/dist/aos.css";
import classnames from "classnames";
import Link from "@docusaurus/Link";

const sliders = [
  {
    title: "Universal Assistant",
    imageSrc: <img alt="Extensible" src="/img/studio/slides/ai.png" />,
    description: (
      <>
        ONE AI lets you build efficient AIs to process <span className="primary-text">Images, Audio and Sensor Data</span>. 
        Our assistant has the know how of all current AI research and you just have to answer a few questions to create your own individual AI.
        Then <span className="primary-text">ONE WARE Studio</span> helps to integrate the AI in your product.
      </>
    ),
  },
  {
    title: "Quality Control",
    imageSrc: <img alt="Extensible" src="/img/ai/quality.png" />,
    description: (
      <>
        Create your custom quality control with our AI based <span className="primary-text">Image Processing</span> framework.
        ONE AI makes sure that you always use the newest scientific findings to get the <span className="primary-text">Most Accurate and Efficient AI</span>.
      </>
    ),
  },
  {
    title: "Predictive Maintenance",
    imageSrc: <img alt="Extensible" src="/img/ai/Predictive_Maintenance.png" />,
    description: (
      <>
        Fix problems before they occur. ONE AI takes sensor-data from your machine and can {" "}
        <span className="primary-text">predict defects</span> before they occur, so your production can run without interruption.
      </>
    ),
  },
  {
    title: "Robots and Drones",
    imageSrc: <img alt="Code Assistant" src="/img/ai/Titel.png" />,
    description: (
      <>
        Replace the last manual steps of your production with autonomous robots and 
        drones. ONE AI lets your robot or drone <span className="primary-text">See, Hear and Think for Itself</span>.
      </>
    ),
  },
  
];

export default function PLC(): JSX.Element {
  const slickRef = useRef<Slider>(null);
  const [counter, setCounter] = useState(0); // Initialize counter state

  initWebsiteEffects();

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 5612); // Increment counter by 560,000
    }, 100); // Every 10 seconds

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <Layout title="ONE AI" description="Empowering Industry 5.0">
      
      <main className="container mb-20">
        <div className="text-center mt-10">
          <h1 className="font-medium mb-10 text-6xl" style={{ lineHeight: "1.3" }}>
            On a <span className="font-bold">Mission</span> to {" "}
            <span className="primary-text font-bold text-7xl">Save Trillions</span> {" "} Lost to <br/>
             <span className="font-bold">Quality Issues</span> and {" "}
            <span className="font-bold">Machine Failures</span>
          </h1>

          <h2 className="font-light mb-10 text-5xl" style={{ lineHeight: "1.5" }}>
          Money Lost Since Opening the Page: <br/>
          <span className="font-bold text-6xl md:text-6xl">
          ${counter.toLocaleString()}
          </span>
          </h2>

        </div>
        
        <div className="flex justify-center items-center gap-4">
          <div className="text-center">
            <img src="/img/ai/quality_small.png" alt="Image 1" className="w-64" />
            <p className="mt-4 text-xl">Description for Image 1</p>
          </div>
          <div className="text-center">
            <img src="/img/ai/root.png" alt="Image 2" className="w-64" />
            <p className="mt-4 text-xl">Description for Image 2</p>
          </div>
          <div className="text-center">
            <img src="/img/ai/predict_small.png" alt="Image 3" className="w-64" />
            <p className="mt-4 text-xl">Description for Image 3</p>
          </div> 
        </div>

        <div className="text-center max-w-4xl m-auto mt-16">
          <h2 className="text-4xl font-bold">
             Integrate AI Faster and Without Experts
          </h2>
          <img
            data-aos="zoom-in"
            src={"/img/studio/Studio_AI.png"}
            alt="Compare"
          />
          <div className="text-xl md:text-2xl mt-6" data-aos="slide-up">
            The ONE WARE Studio <span className="primary-text">AI Extension</span> {" "}
            is the first solution that moves away from universal
            yet inefficient neural networks and time consuming tailored AI
            solutions that depend on AI experts. ONE WARE Studio streamlines AI
            integration by <span className="primary-text">Guiding Users</span> without prior expertise through the
            customization of neural networks. It automatically crafts <span className="primary-text">Efficient
            and Adaptable Neural Networks</span>, which can then be effortlessly
            deployed across a variety of hardware, from FPGAs to
            microcontrollers, and processors equipped with TPUs or GPUs. Empower
            your operations with AI that is both sophisticated and accessible.
          </div>
        </div>

        <ContactUs />
        
      </main>
    </Layout>
  );
}
