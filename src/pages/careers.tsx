// src/pages/careers.tsx
import React, { useState } from "react";
import Layout from "@theme/Layout";
import { JOBS_DATA } from "../data/jobsData";
import Translate, { translate } from "@docusaurus/Translate";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {JSX} from "react";


export default function CareersPage(): JSX.Element {

const { i18n } = useDocusaurusContext();
const locale =  i18n.currentLocale;

  const openLinkInNewWindow = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

 return (
   <Layout title="Careers at ONE WARE" description="Join ONE WARE and help to revolutionize Edge AI development.">
    {/* Open Positions Section */}
    <section id="positions" className="py-12">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 border-solid border border-gray-400 primary-text rounded-full text-sm uppercase tracking-wide">
            <Translate id="positions.hiring">Hiring</Translate>
          </span>
          <h2 className="mt-6 text-3xl font-bold">
            <Translate id="positions.join.1">Join</Translate>{" "}        
            <span className="primary-text">ONE WARE</span>{" "} 
            <Translate id="positions.join.2">today!</Translate> 
          </h2>
          <div className="flex justify-center my-6">
            <p className="text-xl text-white max-w-xl">
              <Translate id="positions.cta">
                If you're interested in any of the positions, please send us
                your CV and introduction to
              </Translate>{" "}
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
                  <Translate id={`category.${category}`}>{category}</Translate>
                </h3>
                <span className="inline-block px-4 py-1 primary-background text-black rounded-full text-sm uppercase">    
                    {positions.length}{" "}
                    {positions.length === 1 ?  <Translate id="positions.openJobscounter.1">Opening</Translate> : <Translate id="positions.openJobscounter.2">Openings</Translate>}            
                </span>
              </div>

              <div className="w-full bg-transparent rounded-lg p-4">
                <table className="w-full border-collapse border-none bg-transparent">
                  <thead className="border-none">
                    <tr className="border-none text-sm font-semibold text-white uppercase tracking-wide">
                      <th className="py-3 text-left w-2/3  border-none">
                        <Translate id="table.role">Role</Translate>
                      </th>
                      <th className="py-3 text-left w-1/3  border-none">
                        <Translate id="table.type">Type</Translate>
                      </th>
                      <th className="py-3 text-left w-1/3  border-none">
                        <Translate id="table.location">Location</Translate>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-none">
                    {positions.map(
                      ({
                        id,
                        title,
                        description,
                        type,
                        location,
                        url,
                      }) => (
                        <React.Fragment key={id}>
                          <tr
                            onClick={() =>
                              openLinkInNewWindow(require(`@site/static/career/${locale}/${url}`).default)
                            }
                            className="cursor-pointer hover:bg-zinc-700 "
                          >
                            <td className="py-4 border-none">
                              <div className="text-lg font-medium primary-text transition duration-150">
                                <Translate id={`job.title.${id}`}>{title}</Translate>
                              </div>
                              <p className="text-sm text-gray-400">
                                <Translate id={`job.description.${id}`}>{description}</Translate>
                              </p>
                            </td>
                            <td className="py-4 text-sm text-gray-300 border-none">
                              <Translate id={`job.type.${id}`}>{type}</Translate>
                            </td>
                            <td className="py-4 text-sm text-gray-300 border-none w-1/4">
                              <Translate id={`job.location.${id}`}>{location}</Translate>
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
