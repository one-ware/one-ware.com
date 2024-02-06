import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./plc-one.module.css";
import Link from "@docusaurus/Link";
import { RiPlantLine } from "react-icons/ri";
import { TfiWorld } from "react-icons/tfi";

export default function Studio(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="PLC ONE" description="Empowering Industry 5.0">

      <header>
        <div className="flex">
          <div className="flex justify-center mx-auto h-screen w-screen">
            <img
              src={"/img/plc2/Schaltschrank.png"}
              className="object-cover w-screen"
              alt="PLC Logo"
            />
            <div className="absolute flex flex-col justify-center w-full h-full">
              <img
                src={"/img/plc2/Logo_SVG-ONE-plc.svg"}
                alt="PLC Logo"
                className="drop-shadow-4xl mx-auto"
                width={760}
              />
              <span className="text-xl md:text-4xl drop-shadow-4xl text-gray-200 text-center">
                Get Ready for a New Chapter in Industrial Automation
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-0 m-0 overflow-hidden">
        <div className="grid md:grid-cols-2 my-3">
          <div className="p-5">
            <img src="/img/start/PLC_Schrank.png" />
          </div>

          <div
            className="md:p-5 flex-col flex gap-1 justify-center relative"
          >
            <span className="text-3xl text-center md:text-left">
              PLC ONE is the first <span className="font-bold primary-text">Industry 5.0</span> ready industrial controller that can adapt to the needs of the <span className="font-bold primary-text">future</span>
            </span>
          </div>
        </div>

        <div className="container m-auto text-white mb-24">

          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
            AI-Powered Industrial Controller
            </h2>
            <img src={"/img/plc2/Drohne.png"} className="mt-10" alt="Compare" />
            <div className="text-xl mt-6">
            Elevate your drone capabilities with our unified controller managing both motors and cameras. AI object recognition assists in navigation, combining the functions of processors, graphics cards, and drone controls into one lightweight, energy-efficient unit. Discover how our innovative approach can enhance your drone's performance and efficiency.
            </div>
          </div>

          
          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
              One Simple Solution for the Tasks of the Future
            </h2>
            <img src={"/img/plc2/Steuerung.png"} className="mt-10" alt="Compare" />
            <div className="text-xl mt-6">
            Discover the next generation of industrial automation: our controller features a new processor architecture for markedly faster response times than conventional PLCs. It centralizes processing to enhance energy efficiency, minimize weight, and reduce costs. With its capacity for unlimited expansion, it’s built to accommodate extra computing power and components as needed. Upgrade and future-proof your electronics with our next-level control technology.
            </div>
          </div>
        </div>

      </main>
    </Layout>
  );
}
