import React from "react";
import "aos/dist/aos.css";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import Head from '@docusaurus/Head';
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";
import OneAiHero from "../components/OneAiHero";
import GetStarted from "../components/GetStarted";
import ComparisonDemo from "../components/ComparisonDemo";
import ArchitectureSection from "../components/ArchitectureSection";
import ComparisonSection from "../components/ComparisonSection";

export default function OneAi() {
  initWebsiteEffects();

  return (
    <Layout title={translate({id: 'oneai.seo.title', message: 'ONE AI | Let ONE AI Finish Your Computer Vision or Edge AI Project'})}
      description={translate({id: 'oneai.seo.description', message: 'Get better results in less time with ONE AI. The first software that automatically generates tailored AI models for your needs. Optimized and exported for PCs, microcontrollers, FPGAs, GPUs, NPUs and more.'})}>
      <Head>
        <meta property="og:title" content={translate({id: 'oneai.seo.og.title', message: 'Let ONE AI Finish Your Computer Vision or Edge AI Project'})} />
        <meta property="og:description" content={translate({id: 'oneai.seo.og.description', message: 'Get better results in less time with ONE AI. AI models, automatically tailored for your needs.'})} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://one-ware.com/one-ai" />
        <meta property="og:image" content="https://one-ware.com/img/social-card.jpg" />
        <link rel="alternate" hrefLang="en" href="https://one-ware.com/one-ai" />
        <link rel="alternate" hrefLang="de" href="https://one-ware.com/de/one-ai" />
        <link rel="alternate" hrefLang="x-default" href="https://one-ware.com/one-ai" />
      </Head>

      <OneAiHero />

      <main>
        <ComparisonDemo />
        <ArchitectureSection />
        <ComparisonSection />

        <GetStarted />

        <div className="pt-20 pb-20">
          <ContactUs subtitle={<Translate id="oneai.support.subtitle">Our experts are here to help you succeed.</Translate>} />
        </div>
      </main>
    </Layout>
  );
}
