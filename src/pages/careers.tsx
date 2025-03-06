// src/pages/careers.tsx
import React, { useState } from "react";
import Layout from "@theme/Layout";
import { JOBS_DATA } from "../data/jobsData";

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
        <div className="bg-stone-900 rounded-lg shadow-lg w-full max-w-lg p-6 border border-gray-700">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b border-gray-700 pb-5">
            <h3 className="text-2xl font-bold text-white m-0">{Heading}</h3>
            <button
              type="button"
              className="flex text-gray-400 bg-transparent border-stone-600 border hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="static-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3 m-auto"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
      {/* Open Positions Section */}
      <section id="positions" className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 border-solid border border-gray-400 primary-text rounded-full text-sm uppercase tracking-wide">
              Hiring
            </span>
            <h2 className="mt-4 text-3xl font-bold">
              Let’s find you an{" "}
              <span className="primary-text">open position</span>.
            </h2>
            <div className="flex justify-center my-10">
              <p className="text-xl text-white max-w-xl">
                If you're interested in any of the positions, please send us your CV and introduction to{" "}
                <a href="mailto:career@one-ware.com">career@one-ware.com</a>.
              </p>
            </div>
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
                  <h3 className="text-2xl font-semibold text-white m-0">
                    {category}
                  </h3>
                  <span className="inline-block px-4 py-1 primary-background text-black rounded-full text-sm uppercase">
                    {positions.length}{" "}
                    {positions.length === 1 ? "Opening" : "Openings"}
                  </span>
                </div>

                <div className="w-full bg-transparent rounded-lg p-4">
                  <table className="w-full border-collapse border-none bg-transparent">
                    <thead className="border-none">
                      <tr className="border-none text-sm font-semibold text-white uppercase tracking-wide">
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
                              className="cursor-pointer hover:bg-zinc-700 "
                            >
                              <td className="py-4 border-none">
                                <div className="text-lg font-medium primary-text transition duration-150">
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
        </div>
      </section>
    </Layout>
  );
}
