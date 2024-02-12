import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./plc-one.module.css";
import Link from "@docusaurus/Link";
import { RiPlantLine } from "react-icons/ri";
import { TfiWorld } from "react-icons/tfi";
import { useEffect } from "react";

export default function Studio(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="PLC ONE" description="Empowering Industry 5.0">
      <header>
        <div className="flex">
          <div
            className={`flex flex-col justify-center align-middle items-center mx-auto h-screen w-screen bg-gradient-to-b from-cyan-900 from-5%  to-indigo-900 to-95% ${styles.heroBackground}`}
          >
            <div className="absolute flex flex-col md:flex-row w-full container gap-10 md:gap-0">
              <div className="md:w-1/2 flex flex-col justify-center gap-10">
                <img
                  src={"/img/plc2/Logo_SVG-ONE2-plc.svg"}
                  alt="PLC Logo"
                  className="drop-shadow-4xl"
                  width={360}
                />
                <span className="text-xl md:text-4xl drop-shadow-4xl text-gray-200">
                  Get Ready for a{" "}
                  <span className="font-bold primary-text">New Chapter</span> in
                  Industrial Automation
                </span>

                <div>
                  <Link
                    className="button button--primary button--lg hidden sm:inline"
                    to={"/docs/plc-one/getstarted"}
                  >
                    Get Started
                  </Link>
                </div>
              </div>

              <div>
                <img
                  src={"/img/plc2/Hero.png"}
                  alt="PLC Logo"
                  className="drop-shadow-4xl"
                  width={860}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="pb-0 overflow-hidden md:my-10">
        <div className="grid md:grid-cols-2 my-3 container">
          <div className="p-5">
            <img src="/img/start/PLC_Schrank.png" />
          </div>

          <div className="md:p-5 flex-col flex gap-10 justify-center relative">
            <span className="text-3xl text-center md:text-left">
              PLC ONE is the first{" "}
              <span className="font-bold primary-text">Industry 5.0</span> ready
              industrial controller that can adapt to the needs of the{" "}
              <span className="font-bold primary-text">future</span>
            </span>

            <div>
              <Link
                className="button button--primary button--outline button--lg hidden sm:inline"
                to={"/docs/plc-one/getstarted"}
              >
                See what it can do
              </Link>
            </div>
          </div>
        </div>

        <div className="container m-auto text-white mb-24">
          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
              AI-Powered Industrial Controller
            </h2>
            <img src={"/img/plc2/Drohne.png"} className="mt-10" alt="Compare" />
            <div className="text-xl md:text-2xl mt-6">
              Elevate your <span className="font-bold primary-text">drone</span> capabilities with our unified controller
              managing both motors and cameras. <span className="font-bold primary-text">AI object recognition</span> assists in
              navigation, combining the functions of processors, graphics cards,
              and drone controls into one lightweight, <span className="font-bold primary-text">energy-efficient</span> unit.
              Discover how our innovative approach can enhance your drone's
              performance and efficiency.
            </div>
          </div>

          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
              One Simple Solution for the Tasks of the Future
            </h2>
            <img
              src={"/img/plc2/Steuerung.png"}
              className="mt-10"
              alt="Compare"
            />
            <div className="text-xl md:text-2xl mt-6">
              Discover the <span className="font-bold primary-text">next generation</span> of industrial automation: our
              controller features a new processor architecture for markedly
              <span className="font-bold primary-text">faster</span> response times than conventional PLCs. It centralizes
              processing to enhance energy efficiency, minimize weight, and
              reduce costs. With its capacity for unlimited expansion, it’s
              built to accommodate extra computing power and components as
              needed. <span className="font-bold primary-text">Upgrade and future-proof</span> your electronics with our
              next-level control technology.
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
