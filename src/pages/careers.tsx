// src/pages/careers.tsx
import React, { useState } from "react";
import Layout from "@theme/Layout";
import { JOBS_DATA } from "../data/jobsData";

export default function CareersPage(): JSX.Element {

  const openLinkInNewWindow = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Layout
      title="Careers at ONE WARE"
      description="Join ONE WARE and help to revolutionize Edge AI development."
    >
      {/* Open Positions Section */}
      <section id="positions" className="py-12">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 border-solid border border-gray-400 primary-text rounded-full text-sm uppercase tracking-wide">
              Hiring
            </span>
            <h2 className="mt-6 text-3xl font-bold">
              Join {" "}
              <span className="primary-text">ONE WARE</span> today!
            </h2>
            <div className="flex justify-center my-6">
              <p className="text-xl text-white max-w-xl">
                If you're interested in any of the positions, please send us
                your CV and introduction to{" "}
                <a href="mailto:career@one-ware.com">career@one-ware.com</a>.
              </p>
            </div>
          </div>

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
                          url: pdf,
                        }) => (
                          <React.Fragment key={title}>
                            <tr
                              onClick={() =>
                                openLinkInNewWindow(
                                  pdf
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
