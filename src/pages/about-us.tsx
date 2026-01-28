import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import { JSX } from "react";
import Translate, { translate } from "@docusaurus/Translate";
import TeamGrid from "../components/TeamGrid";
import { TEAM_MEMBERS } from "../data/teamData";
import Link from "@docusaurus/Link";

export default function AboutUs(): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <Layout
      title={translate({ id: "aboutus.meta.title", message: "About Us" })}
      description={translate({ id: "aboutus.meta.description", message: "About our Team" })}
    >
      <section
        className="bg-white relative min-h-screen flex items-center"
        style={{
          marginTop: "calc(var(--ifm-navbar-height) * -1)",
          paddingTop: "var(--ifm-navbar-height)",
        }}
      >
        <div className="container mx-auto px-6 h-full flex items-center">
          <div className="w-full pt-8 md:pt-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-16">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight text-gray-700 leading-none tracking-tight">
                <span
                  className="block transition-all duration-700 ease-out"
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                  }}
                >
                  <Translate id="aboutus.hero.title1">About Us_</Translate>
                </span>
                <span
                  className="block transition-all duration-700 ease-out"
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                    transitionDelay: "150ms",
                  }}
                >
                  <Translate id="aboutus.hero.title2">Company</Translate>
                </span>
              </h1>
              <span
                className="text-gray-400 text-xs sm:text-sm transition-all duration-700 ease-out"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transitionDelay: "300ms",
                }}
              >
                <Translate id="aboutus.hero.tagline">Automating AI Development</Translate>
              </span>
            </div>

            <div className="flex flex-col lg:grid lg:grid-cols-[auto_auto_auto] gap-0 items-center lg:items-start">
              <div className="flex flex-row lg:flex-col justify-center items-center lg:items-start w-full lg:w-auto lg:mr-12 py-8 lg:py-0 lg:h-80">
                <div className="flex flex-row lg:flex-col gap-8 lg:gap-0 lg:space-y-8">
                  <div className="text-center lg:text-left">
                    <span className="text-gray-700 text-3xl md:text-4xl font-light">
                      15
                    </span>
                    <span className="text-gray-400 text-xs uppercase block mt-1">
                      <Translate id="aboutus.stats.employees">Employees</Translate>
                    </span>
                  </div>
                  <div className="text-center lg:text-left">
                    <span className="text-gray-700 text-3xl md:text-4xl font-light">
                      2024
                    </span>
                    <span className="text-gray-400 text-xs uppercase block mt-1">
                      <Translate id="aboutus.stats.founded">Founded</Translate>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-start order-first lg:order-none w-full">
                <div className="w-full lg:w-[40rem] lg:h-80 relative overflow-hidden">
                  <img
                    src={require("@site/static/img/AboutUs/Team.jpeg").default}
                    alt="Team"
                    className="w-full h-auto lg:absolute lg:inset-0 lg:h-full lg:object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col justify-center gap-2 sm:gap-4 lg:gap-2 w-full lg:w-128 lg:h-80 ml-8 mr-8 mb-8 lg:mb-0">
                <div className="bg-gray-200 p-3 sm:p-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-gray-700 text-sm sm:text-base font-medium mb-1">
                    <Translate id="aboutus.info.whatwedo.title">What We Do</Translate>
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-tight">
                    <Translate id="aboutus.info.whatwedo.text">We provide software that automates the entire AI development lifecycle. Our solution enables you to create customized AI models perfectly tailored to your project, significantly reducing complexity and development time.</Translate>
                  </p>
                </div>
                <div className="bg-gray-200 p-3 sm:p-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-gray-700 text-sm sm:text-base font-medium mb-1">
                    <Translate id="aboutus.info.unique.title">What Makes Us Unique</Translate>
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-tight">
                    <Translate id="aboutus.info.unique.text">We hold a patent for our automatic neural network architecture creation process. Driven by a team of young developers rethinking AI, we bring a fresh perspective to enable state-of-the-art performance on any hardware.</Translate>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full" style={{ margin: 0, padding: 0 }}>
        <div className="relative w-full bg-black" style={{ height: "clamp(200px, 35vw, 60vh)", margin: 0, padding: 0 }}>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
            src={require("@site/static/img/AboutUs/WebsiteVideoBlur1.mp4").default}
            controls={isPlaying}
            preload="metadata"
          />

          {!isPlaying && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer bg-black/40"
            >
              <div
                className="flex items-center justify-center transition-transform hover:scale-110 w-20 h-20 rounded-full"
                style={{ border: "1px solid white" }}
              >
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="#fff"
                  className="ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-gray-700 leading-tight">
                <span className="block"><Translate id="aboutus.vision.title1">Our Vision_</Translate></span>
                <span className="block"><Translate id="aboutus.vision.title2">Revolutionizing</Translate></span>
                <span className="block"><Translate id="aboutus.vision.title3">AI Development</Translate></span>
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm max-w-xs text-left md:text-right">
                <Translate id="aboutus.vision.tagline">AI developed in Minutes not Months</Translate>
              </p>
            </div>

            <div className="bg-gray-200 p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-12">
                <div className="w-full aspect-square max-w-xs mx-auto md:max-w-none relative">
                  <img
                    src={require("@site/static/img/AboutUs/software.png").default}
                    alt="Software"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h3 className="text-gray-700 text-xl md:text-2xl font-medium mb-4 text-center md:text-left">
                    <Translate id="aboutus.vision.subtitle">Bringing AI Development to Every Engineer</Translate>
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 text-center md:text-left">
                    <Translate id="aboutus.vision.text">ONE WARE automates the entire AI development lifecycle, unlocking the potential of ideas that often remain stuck in the drawer due to complexity or resource constraints. By streamlining the process from data to deployment, we enable you to turn these concepts into reality in the shortest possible time. We make efficient, AI-driven processes accessible, empowering you to innovate and optimize where it was previously not feasible.</Translate>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-12 items-center md:items-start">
                    <div className="text-center md:text-left">
                      <span className="text-gray-700 text-2xl md:text-3xl font-light">
                        4K+
                      </span>
                      <span className="text-gray-500 text-xs uppercase block mt-1">
                        <Translate id="aboutus.vision.stats.models">AI Models/Day</Translate>
                      </span>
                    </div>
                    <div className="text-center md:text-left">
                      <span className="text-gray-700 text-2xl md:text-3xl font-light">
                        &lt;1s
                      </span>
                      <span className="text-gray-500 text-xs uppercase block mt-1">
                        <Translate id="aboutus.vision.stats.prediction">Prediction Time</Translate>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pt-0 md:pt-2 pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-gray-600 text-3xl md:text-4xl font-normal text-left mb-12">
              <Translate id="aboutus.team.title">Who we are</Translate>
            </h2>
            <TeamGrid members={TEAM_MEMBERS} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--ifm-color-primary)] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-700 text-sm md:text-base font-medium uppercase mb-4 tracking-widest">
              <Translate id="aboutus.join.subtitle">Join our Team</Translate>
            </p>
            <h2 className="text-gray-800 text-2xl md:text-3xl font-medium mb-8">
              <Translate id="aboutus.join.title">You share our vision? Let's work on it, together!</Translate>
            </h2>
            <Link
              to="/careers"
              className="inline-block bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition-colors no-underline hover:no-underline"
              style={{ borderRadius: 6 }}
            >
              <Translate id="aboutus.join.button">Career</Translate>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
