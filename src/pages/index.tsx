import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { useEffect, useState, useRef, memo, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";
import Translate, { translate } from "@docusaurus/Translate";
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import Marquee from "react-fast-marquee";

import styles from "./index.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import initWebsiteEffects from "../components/startEffects";
import ContactUs from "../components/ContactUs";

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  return (
    <header id="hero" className={styles.heroBackground}>
      {/* Animation als Hintergrund - direkt im header */}
      <div className="absolute inset-0 z-0">
        <video
          src={require("@site/static/img/animation.mp4").default}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay wie im ursprünglichen CSS */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%)'
          }}
        />
      </div>

      <div className={styles.heroBanner}>
        {/* Text oben links mit Hintergrund-Box */}
        <div className="relative z-10 flex items-start justify-start pt-8 pl-8 md:pt-12 md:pl-12 lg:pt-16 lg:pl-16 h-full">
          <div className="max-w-2xl backdrop-blur-md bg-gray-600/20 rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                <Translate id="homepage.title.main">
                  AI Tailored to Your Needs.
                </Translate>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                Universal AI models were not made for your application. ONE WARE offers the first platform that invents completely new AI models exactly for your use case and automatically deploys them on any hardware.
              </p>

              <div className="flex gap-4 flex-col sm:flex-row">
                <Link href="/one-ai#getStarted">
                  <button className="button button--primary button--outline button--lg w-full sm:w-auto">
                    <Translate id="homepage.subtitle.ai.getstarted">
                      Get Started
                    </Translate>
                  </button>
                </Link>
                <Link href="/one-ai">
                  <button className="button button--primary button--lg w-full sm:w-auto">
                    Discover ONE AI
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured In Section unten im Header */}
        <div className="relative z-10 flex items-end justify-center pb-8 px-8">
          <div className="w-full max-w-7xl backdrop-blur-sm bg-gray-300/15 rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-center text-white mb-6">
              <Translate id="partners.title">
                Featured In:
              </Translate>
            </h3>
            
            <div className="flex justify-center items-center flex-wrap gap-3 md:gap-6">
              <a
                href="https://tech.eu/2025/06/18/one-ware-raises-eur25m-to-automate-ai-model-configuration-across-industries/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f1.png").default}
                  alt="Featured 1"
                  className="h-10 w-16 md:h-12 md:w-20 object-contain hover:opacity-80 transition-opacity opacity-90"
                />
              </a>
              <a
                href="https://www.elektronikpraxis.de/one-ai-automatisierte-ki-konfiguration-fuer-entwickler-a-09fee486cec031ed0a2edd5dbeeaed0a/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f4.png").default}
                  alt="Featured 4"
                  className="h-10 w-36 md:h-12 md:w-42 object-contain hover:opacity-80 transition-opacity opacity-90"
                />
              </a>
              <a
                href="https://www.handelsblatt.com/technik/ki/ki-start-ups-jenseits-des-hypes-one-ware-entwickelt-ki-fuer-jede-produktion-01/100149060.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f3.png").default}
                  alt="Featured 3"
                  className="h-10 w-52 md:h-12 md:w-64 object-contain hover:opacity-80 transition-opacity opacity-90"
                />
              </a>
              <a
                href="https://www.vdi-nachrichten.com/technik/automation/ki-im-maschinenbau-auf-bestehender-hardware-nutzen/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f9.png").default}
                  alt="Featured 9"
                  className="h-10 w-52 md:h-12 md:w-64 object-contain hover:opacity-80 transition-opacity opacity-90"
                />
              </a>
              <a
                href="https://www.maschinenmarkt.vogel.de/one-ai-ki-extension-one-ware-maschinenbau-a-545f6e3fc5ac13f8fa3f55fa5998332f/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f5.png").default}
                  alt="Featured 5"
                  className="h-12 w-24 md:h-14 md:w-28 object-contain hover:opacity-80 transition-opacity opacity-90"
                />
              </a>
              <a
                href="https://it-production.com/industrie-4-0-i40/neuronales-netzwerk-in-unter-einer-sekunde/"
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline hover:no-underline"
              >
                <img
                  src={require("@site/static/img/Featured/f7.png").default}
                  alt="Featured 7"
                  className="h-10 w-28 md:h-12 md:w-32 object-contain hover:opacity-80 transition-opacity opacity-90"
                />
              </a>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

function IndustryExamplesSection() {
  const items = [
    {
      key: "agriculture",
      src: require("@site/static/img/agriculture.webp").default,
      label: "Agriculture",
      href: "/docs/one-ai/industries/agriculture",
    },
    {
      key: "food",
      src: require("@site/static/img/food.webp").default,
      label: "Food",
      href: "/docs/one-ai/industries/food",
    },
    {
      key: "industry",
      src: require("@site/static/img/industry.webp").default,
      label: "Industry",
      href: "/docs/one-ai/industries/industry",
    },
    {
      key: "infrastructure",
      src: require("@site/static/img/infrastructure.webp").default,
      label: "Infrastructure",
      href: "/docs/one-ai/industries/infrastructure",
    },
    // künftig einfach weitere Einträge anhängen
  ];

  // immer 2 Bilder pro „Spalte“
  const columns: typeof items[] = [];
  for (let i = 0; i < items.length; i += 2) {
    columns.push(items.slice(i, i + 2));
  }

  return (
    <div className={styles.examplesWrap}>
      {/* Überschrift über den Beispielen */}
      <div className="text-center mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 font-bold px-4">
          For Every Industry:
        </h2>
      </div>
      
      <Marquee
        className={styles.examplesMarquee}
        speed={90}                 // << schneller (z.B. 70–120 testen)
        pauseOnHover
        gradient
        gradientWidth={60}
        gradientColor="rgb(0, 0, 0)" // dunkler Hintergrund
        autoFill                  // füllt rechts automatisch mit Duplikaten auf
      >
        {columns.map((col, idx) => (
          <div className={styles.examplesColumn} key={`col-${idx}`}>
            {col.map((item) => (
              <a className={styles.card} key={item.key} href={item.href}>
                <img src={item.src} alt={item.label} />
                <div className={styles.caption}>{item.label}</div>
              </a>
            ))}
            {/* Falls ungerade Anzahl → Platzhalter für konstante Höhe */}
            {col.length === 1 && <div className={styles.cardPlaceholder} />}
          </div>
        ))}
      </Marquee>
    </div>
  );
}


function TestimonialsSection() {
  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-200 mb-12">
        <Translate id="testimonials.title">What Others Say About Us</Translate>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.1.text">
                “Working with ONE WARE demonstrates the incredible potential that emerges when intelligent AI development meets highly efficient FPGA technology. ONE WARE takes our MAX® 10 platform to a new level – delivering solutions that not only push technological boundaries, together we're building solutions that are far more precise, more efficient and drive meaningful change in industrial practice. This partnership represents a new generation of industrial AI: scalable, resource-efficient, and universally applicable.“
              </Translate>
            </p>
            <div className="mb-24">
              <p className="text-gray-900 text-2xl font-bold mb-2">
                Mark Moran
              </p>
              <p className="text-gray-700 font-bold text-l">
                <Translate id="testimonials.1.authorTitle">
                  Director of Boards, Development Kits, and Partners at Altera
                </Translate>
              </p>
            </div>
            <div className="absolute right-6 bottom-6">
              <img
                src={require("@site/static/img/Partner/altera.png").default}
                alt="Altera logo"
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>

        {/* Testimonial 2 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://hdo-gmbh.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.2.text">
                “From day one, working with ONE WARE was pragmatic and focused. Using AI-powered image processing, we established a robust defect detection system on high-gloss surfaces in just a few weeks – a milestone that traditional metrology would have taken up to 18 months to reach. We're enthusiastic about ONE WARE's solution. Its potential in AI is impressive and a true lever for strengthening our competitiveness.“
              </Translate>
            </p>
            <div className="mb-24">
              <p className="text-gray-900 text-2xl font-bold mb-2">
                Christian Leon
              </p>
              <p className="text-gray-700 font-bold text-l">
                <Translate id="testimonials.2.authorTitle">
                  COO & Managing Director at HDO
                </Translate>
              </p>
            </div>
            <div className="absolute right-6 bottom-6">
              <img
                src={require("@site/static/img/Partner/hdo.png").default}
                alt="HDO logo"
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>

        {/* Testimonial 3 */}
        <div className="bg-gray-300 hover:bg-gray-400 bg-opacity-95 p-6 rounded-lg shadow-xl relative min-h-[280px] transition-colors duration-300 cursor-pointer">
          <a
            href="https://www.cuspcapital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline hover:no-underline"
          >
            <p className="text-gray-800 italic mb-6 font-bold text-lg">
              <Translate id="testimonials.3.text">
                “Through our European Digital Infrastructure investment thesis, we seek out entrepreneurs building the foundations of future global digital systems. ONE WARE is such a company. With its mission to make advanced technologies more accessible and universally applicable, the team around Leon, Leo, Hendrik, and Ali is fundamentally changing the way AI and electronics development is approached across industries.“
              </Translate>
            </p>
            <div className="mb-24">
              <p className="text-gray-900 text-2xl font-bold mb-2">
                Jan Sessenhausen
              </p>
              <p className="text-gray-700 font-bold text-l">
                <Translate id="testimonials.3.authorTitle">
                  Investor & General Partner at Cusp Capital
                </Translate>
              </p>
            </div>
            <div className="absolute right-6 bottom-6">
              <img
                src={require("@site/static/img/Partner/cusp.png").default}
                alt="Cusp Capital logo"
                className="h-16 w-48 object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

function ComparisonSection() {
  // DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 1)
  // Der Ref für die Swiper-Instanz ist wieder da.
  const swiperRef = useRef<SwiperCore | null>(null);

  const scrollPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const scrollNext = () => {
    swiperRef.current?.slideNext();
  };

  const useCases = [
    {
      title: "All-in-ONE Quality Control",
      subtitle: "From idea to realization in one click with one software",
      image: "/img/ai/one_ai_plugin/use_cases/capture/preview.png",
      description: "Eliminate months of development time. Integrate AI with our pre-build UI that supports monitoring, remote control and continuous improvement. Already in production with leading production companies and ready for your quality control or automation task with:",
      metrics: [
        { value: "1-Click", label: "Deployment" },
        { value: "< 1 Day", label: "Development Time" },
      ],
      relatedUseCases: [
        { title: "Quality Control" },
        { title: "Industrial Automation" },
        { title: "Measuring Instruments" }
      ],
      whitepaper: "/docs/one-ai/use-cases/camera-tool",
      linkText: "More Details"
    },
    {
      title: "High Speed and Efficient Automation",
      subtitle: "ONE AI makes decade-old and efficient chips outperform todays leading edge AI hardware",
      image: "/img/ai/one_ai_plugin/use_cases/chip/defect_1.png",
      description: "With ONE AI you get the most accurate and efficient AI models on any hardware. This includes also mobile systems like drones and your existing hardware. As example, together with our partner Altera we show how Altera's most low-power Chip with ONE AI can now outperform Nvidia's Jetson Orin Nano with:",
      metrics: [
        { value: "488×", label: "Lower Latency" },
        { value: "24×", label: "Reduced Errors" },
        { value: "20×", label: "Lower Power" },
        { value: "6×", label: "Lower Cost" },
      ],
      relatedUseCases: [
        { title: "Industry Automation" },
        { title: "Drones and Aerospace" },
        { title: "Consumer Electronics" }
      ],
      whitepaper: "/docs/one-ai/use-cases/chip",
      linkText: "More Details"
    },
    {
      title: "High Precision Object Detection",
      subtitle: "ONE AI outperforms scientists in under one second by accuracy and speed",
      image: "/img/ai/one_ai_plugin/use_cases/pcb/pcb_1.png",
      description: "AI models, generated by ONE AI in 0.7 seconds, are not only faster but also more accurate. As example researchers created a custom AI model for a PCB quality control. ONE AI beat not only standard image processing and universal AI models by speed and accuracy with:",
      metrics: [
        { value: "98.4", label: "F1 Score" },
        { value: "750 %", label: "Speed Increase" },
      ],
      relatedUseCases: [
        { title: "Quality Control" },
        { title: "Diagnostic Imaging" },
        { title: "Autonomous Driving" }
      ],
      whitepaper: "/docs/one-ai/use-cases/pcb",
      linkText: "More Details"
    }
  ];
  
  return (
    <div id="comparison" className="py-12 md:py-12 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 font-bold px-4">
          Example Use-Cases
        </p>
      </div>

      <div className="relative">
        <Swiper
          // DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 2)
          // onSwiper-Callback, um den Ref zu setzen.
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Navigation]}
          rewind={true}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={1.2}
          spaceBetween={20}
          slidesPerGroup={1}
          watchSlidesProgress={true}
          // modules={[Navigation]}  // kannst du entfernen, da wir eigene Buttons haben
          breakpoints={{
            768:  { slidesPerView: 1.5,  spaceBetween: 40 },
            1280: { slidesPerView: 1.75, spaceBetween: 50 },
          }}
        >
          {useCases.map((useCase, idx) => (
            // DER ZWEITE WICHTIGE FIX BLEIBT:
            <SwiperSlide key={idx}>
              {({ isActive }) => (
                <div
                  className={`relative w-full rounded-2xl transition-all duration-500 ease-in-out transform ${isActive ? 'scale-100' : 'scale-90 opacity-60'}`}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url(${useCase.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* ... der innere Content der Slide bleibt unverändert ... */}
                   <div className="relative z-10 p-6 sm:p-8 lg:p-12 min-h-[550px] md:min-h-[500px] flex flex-col justify-between bg-gray-900/20 rounded-2xl backdrop-blur-sm border border-white/10">
                    
                    {/* Content Wrapper für Desktop Layout */}
                    <div className="flex flex-col lg:flex-row lg:gap-8">
                      
                      {/* Text Section - links auf Desktop */}
                      <div className="text-left lg:flex-1 lg:max-w-[60%] mb-6 lg:mb-0">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold primary-text mb-2">
                          {useCase.title}
                        </h3>
                        <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium mb-4">
                          {useCase.subtitle}
                        </h4>
                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                          {useCase.description}
                        </p>
                      </div>

                      {/* Metrics & Button Section - rechts auf Desktop */}
                      <div className="lg:flex-shrink-0 lg:w-[40%] flex flex-col justify-end">
                        <div className="flex flex-col gap-4">
                          {/* Metrics Grid */}
                          <div className="grid grid-cols-2 gap-2 w-full">
                            {useCase.metrics.map((metric, metricIdx) => (
                              <div key={metricIdx} className="p-3 bg-black/40 border border-white/10 rounded-lg text-center">
                                <h5 className="text-xl sm:text-2xl font-bold primary-text">
                                  {metric.value}
                                </h5>
                                <p className="text-sm sm:text-base text-gray-300">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Button */}
                          <a
                            href={useCase.whitepaper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-[#00FFD1] text-black font-bold rounded-lg hover:bg-[#00e4ba] transition-all duration-300 transform hover:scale-105 text-sm lg:text-base w-full justify-center shrink-0"
                          >
                            {useCase.linkText}
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Related Use Cases - Unten über die gesamte Breite */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h6 className="text-xl font-semibold text-gray-300 mb-4 text-center lg:text-left">Related Use Cases:</h6>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {useCase.relatedUseCases.map((related, relatedIdx) => (
                          <div key={relatedIdx} className="p-4 bg-[#00FFD1]/10 border border-[#00FFD1]/30 rounded-lg hover:bg-[#00FFD1]/20 transition-colors cursor-pointer text-center">
                            <div className="font-semibold text-[#00FFD1] text-sm lg:text-base">
                              {related.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 3) */}
        {/* Die onClick-Handler sind wieder auf den Buttons. */}
        <button
          onClick={scrollPrev}
          aria-label="Previous use case"
          className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={scrollNext}
          aria-label="Next use case"
          className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md shadow-lg transition-transform hover:scale-105"
        >
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6 text-[#00FFD1]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  if (ExecutionEnvironment.canUseDOM) {
    initWebsiteEffects();
  }

  return (
    <Layout
      description={translate({
        id: "homepage.meta.description",
        message: "Every Task. Every Hardware. Every Industry. ONE Software.",
      })}
    >
      <HomepageHeader />
      <main className="overflow-x-hidden alternative-background ">
        <div className="dropshadowbottom">
          <div className="dropshadowtop diagclipbottom">
            <div className="default-background pb-12">
              <ComparisonSection />
              <IndustryExamplesSection />
            </div>
          </div>
        </div>

        <div className="">
          <HomepageFeatures />
        </div>
        <div className="dropshadowbottom">
          <div className="dropshadowtop diagclipbottom">
            <div className="default-background diagcliptop pt-20 pb-32">
              <TestimonialsSection />
            </div>
          </div>
        </div>

        <div className="pt-20 pb-20 ">
          <ContactUs />
        </div>
      </main>
    </Layout>
  );
}
