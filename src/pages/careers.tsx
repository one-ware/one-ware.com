// src/pages/careers.tsx
import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./careers.module.css";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { JOBS_DATA } from "../data/jobsData";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <header id="hero" className={`h-screen w-full ${styles.heroBackground}`}>
      <div className="particles absolute w-full h-full">
        {init && (
          <Particles
            id="stars"
            className="h-full w-full absolute"
            options={{
              fullScreen: {
                enable: false,
              },
              fpsLimit: 144,
              interactivity: {
                events: {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "bubble",
                  },
                },
                modes: {
                  push: {
                    quantity: 1,
                  },
                  bubble: {
                    size: 6,
                    distance: 40,
                  },
                },
              },
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                move: {
                  direction: "bottom",
                  enable: true,
                  outModes: {
                    default: "out",
                  },
                  size: true,
                  random: false,
                  speed: {
                    min: 0.2,
                    max: 0.4,
                  },
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                  },
                  value: 60,
                },
                opacity: {
                  value: 0.3,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 4 },
                },
              },
              detectRetina: true,
            }}
          />
        )}
      </div>

      <div className="absolute flex flex-col items-center justify-center w-full h-full">
        <div className={styles.waveBackground}>
          <svg
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 2880 48"
            className={styles.waveSvg}
          >
            <path
              d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div className="container mx-auto text-center py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Want to work with us?
          </h1>
          <p className="mt-4 text-xl text-white">
            We're always looking to hire talented folks to join our team. We're
            a 100% remote company, so you can work from anywhere.
          </p>
          <Link
            to="#positions"
            className="mt-8 inline-block px-8 py-4 bg-transparent text-primary font-semibold rounded-full shadow hover:shadow-lg transition"
          >
            View open positions
          </Link>
        </div>
      </div>

      <div className={styles.startArrow} />
    </header>
  );
}

function Modal({
  Heading,
  Body,
  closeModal,
}: {
  Heading: string;
  Body: string;
  closeModal: () => void;
}) {
  return (
    <>
      {/* Dark Background Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={closeModal}
      ></div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 border border-gray-700">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-3">
            <h3 className="text-2xl font-bold text-white">{Heading}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="static-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="py-4">
            <p className="text-gray-300 text-lg">{Body}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CareersPage(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ Heading: "", Body: "" });

  const openModal = (heading: string, body: string) => {
    setModalContent({ Heading: heading, Body: body });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout
      title="Careers at one-ware.com"
      description="Join one-ware.com and help empower Industry 5.0"
    >
      {/* Hero Section */}
      <HomepageHeader />

      {/* Open Positions Section */}
      <section id="positions" className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-green-400 rounded-full text-sm uppercase tracking-wide">
              Applying
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              Let’s find you an{" "}
              <span className="text-green-400">open position</span>.
            </h2>
            <p className="mt-2 text-lg text-gray-700">
              Find the right job for you.
            </p>
          </div>
          {/* Dynamic Job Sections */}
          {showModal && (
            <Modal
              Heading={modalContent.Heading}
              Body={modalContent.Body}
              closeModal={closeModal}
            />
          )}

          <div className="mx-auto max-w-4xl">
            {JOBS_DATA.map(({ category, positions }) => (
              <div key={category} className="mb-12">
                {/* Category Header */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-white">
                    {category}
                  </h3>
                  <span className="inline-block px-4 py-1 bg-green-400 text-white rounded-full text-sm uppercase">
                    {positions.length}{" "}
                    {positions.length === 1 ? "Opening" : "Openings"}
                  </span>
                </div>

                <div className="w-full bg-transparent rounded-lg p-4">
                  <table className="w-full border-collapse border-none bg-transparent">
                    <thead className="border-none">
                      <tr className="border-none text-sm font-semibold text-white uppercase tracking-wide  hover:bg-gray-700">
                        <th className="py-3 text-left w-2/3  border-none">
                          Role
                        </th>
                        <th className="py-3 text-left w-1/3  border-none">
                          Type
                        </th>
                        <th className="py-3 text-left w-1/3  border-none">
                          Location
                        </th>
                      </tr>
                    </thead>
                    <tbody className="border-none">
                      {positions.map(
                        ({
                          title,
                          description,
                          type,
                          location,
                          more_details,
                        }) => (
                          <React.Fragment key={title}>
                            <tr
                              onClick={() =>
                                openModal(
                                  "What we’re looking for",
                                  more_details
                                )
                              }
                              className="cursor-pointer hover:bg-gray-100 "
                            >
                              <td className="py-4 border-none">
                                <div className="text-lg font-medium text-green-400 hover:text-green-300 transition duration-150">
                                  {title}
                                </div>
                                <p className="text-sm text-gray-400">
                                  {description}
                                </p>
                              </td>
                              <td className="py-4 text-sm text-gray-300 border-none">
                                {type}
                              </td>
                              <td className="py-4 text-sm text-gray-300 border-none w-1/4">
                                {location}
                              </td>
                            </tr>
                          </React.Fragment>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          {/* How to Apply */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold">How to Apply</h2>
            <p className="mt-2 text-lg text-white">
              If you're interested in any of the positions, please send your CV
              and cover letter to{" "}
              <a
                href="mailto:jobs@one-ware.com"
                className="text-blue-600 hover:underline"
              >
                jobs@one-ware.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
