import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import { useRef } from "react";
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
import useBaseUrl from '@docusaurus/useBaseUrl';
import UseCaseCard from "@site/src/components/UseCaseComponent/UseCaseCard";
import Head from '@docusaurus/Head';

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  return (
    <header id="hero" className={styles.heroBackground}>
      <div className="absolute inset-0 z-0">
        {/* Desktop: Video Animation */}
        <video
          src={require("@site/static/img/animation.webm").default}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className={styles.heroBanner}>
        <div className="z-10 flex items-center justify-center pt-8 px-8 md:pt-12 md:px-12 lg:pt-16 lg:px-16 h-full">
          <div className="max-w-5xl backdrop-blur-md bg-gray-600/20 rounded-2xl p-6 md:p-8 border border-white/10">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                <Translate id="oneai.hero.nextgen.title">
                  The Next Generation of AI Development
                </Translate>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                <Translate id="homepage.subtitle.description">
                  The world relies on AI models bloated with unnecessary data.
                  ONE AI generates AI tailored to your needs, so you can finish projects faster with better results.
                  Deployed with maximum performance even on the smallest hardware.
                </Translate>
              </p>

              <div className="flex gap-4 flex-col sm:flex-row justify-center">
                <Link href="/docs/one-ai/getting-started">
                  <button className="button button--primary button--outline button--lg w-full sm:w-auto">
                    <Translate id="homepage.subtitle.ai.getstarted">
                      Start Now for Free
                    </Translate>
                  </button>
                </Link>
                <Link href="/one-ai">
                  <button className="button button--primary button--lg w-full sm:w-auto">
                    <Translate id="homepage.button.discover">
                      Discover ONE AI
                    </Translate>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {/* Featured In Section unten im Header */}
          <div className="z-10 flex items-end justify-center py-8 px-8 mt-12">
            <div className="backdrop-blur-md bg-gray-600/20 rounded-2xl p-6 md:p-8 border border-white/10 max-w-7xl">
              
              <div className="text-center -mb-2">
                <p className="text-lg md:text-xl text-gray-300">
                  <Translate id="partners.title">
                    Known from:
                  </Translate>
                </p>
              </div>

              <div className="flex justify-center items-center flex-wrap gap-3 md:gap-6">
                <a
                  href="https://tech.eu/2025/06/18/one-ware-raises-eur25m-to-automate-ai-model-configuration-across-industries/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Featured/f1_g.png").default}
                    alt="Featured 1"
                    className="h-8 w-16 md:h-12 md:w-20 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                <a
                  href="https://www.maschinenmarkt.vogel.de/one-ai-ki-extension-one-ware-maschinenbau-a-545f6e3fc5ac13f8fa3f55fa5998332f/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Featured/f5_g.png").default}
                    alt="Featured 5"
                    className="h-8 w-24 md:h-14 md:w-28 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                <a
                  href="https://www.elektronikpraxis.de/one-ai-automatisierte-ki-konfiguration-fuer-entwickler-a-09fee486cec031ed0a2edd5dbeeaed0a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Featured/f4_g.png").default}
                    alt="Featured 4"
                    className="h-8 w-36 md:h-14 md:w-42 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                {/*
                <a
                  href="https://www.handelsblatt.com/technik/ki/ki-start-ups-jenseits-des-hypes-one-ware-entwickelt-ki-fuer-jede-produktion-01/100149060.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Featured/f3_g.png").default}
                    alt="Featured 3"
                    className="h-8 w-52 md:h-12 md:w-64 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                */}
                <a
                  href="https://www.vdi-nachrichten.com/technik/automation/ki-im-maschinenbau-auf-bestehender-hardware-nutzen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Featured/f9_g.png").default}
                    alt="Featured 9"
                    className="h-8 w-52 md:h-12 md:w-64 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                <a
                  href="https://www.elektormagazine.com/news/one-ai-vision-edge-ai-en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Featured/f10_g.png").default}
                    alt="Elektor"
                    className="h-8 w-36 md:h-14 md:w-42 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                
                <a
                  href="https://it-production.com/industrie-4-0-i40/neuronales-netzwerk-in-unter-einer-sekunde/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Featured/f7_g.png").default}
                    alt="Featured 7"
                    className="h-8 w-28 md:h-12 md:w-32 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                <a
                  href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline hover:no-underline"
                >
                  <img
                    src={require("@site/static/img/Partner/altera_w.png").default}
                    alt="Featured 5"
                    className="h-8 w-24 md:h-14 md:w-28 object-contain hover:opacity-80 transition-opacity opacity-90"
                  />
                </a>
                
              </div>
            </div>
          </div>

          {/* Animierter Scroll-Pfeil */}
          <div className="w-full flex justify-center z-10">
            <div className="flex flex-col items-center animate-bounce">
              <svg 
                className="w-10 h-10 text-white opacity-70" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
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
      key: "aerospace",
      src: require("@site/static/img/industries/Aerospace.jpg").default,
      label: "Aerospace",
      labelId: "homepage.industry.aerospace",
      href: "/docs/one-ai/use-cases/chip",
    },
    {
      key: "agriculture",
      src: require("@site/static/img/industries/Agriculture.jpg").default,
      label: "Agriculture",
      labelId: "homepage.industry.agriculture",
      href: "/docs/one-ai/industries/agriculture",
    },
    {
      key: "automotive",
      src: require("@site/static/img/industries/Automotive.jpg").default,
      label: "Automotive",
      labelId: "homepage.industry.automotive",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "consumer",
      src: require("@site/static/img/industries/Consumer.jpg").default,
      label: "Consumer Electronics",
      labelId: "homepage.industry.consumer",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "drones",
      src: require("@site/static/img/industries/Drones.jpg").default,
      label: "Drones",
      labelId: "homepage.industry.drones",
      href: "/docs/one-ai/use-cases/chip",
    },
    {
      key: "energy",
      src: require("@site/static/img/industries/Energy.png").default,
      label: "Energy",
      labelId: "homepage.industry.energy",
      href: "/docs/one-ai/use-cases/chip",
    },
    {
      key: "foodbeverage",
      src: require("@site/static/img/industries/Food_and_Beverage.jpg").default,
      label: "Food & Beverage",
      labelId: "homepage.industry.foodbeverage",
      href: "/docs/one-ai/industries/food-beverage",
    },
    {
      key: "healthcare",
      src: require("@site/static/img/industries/Healthcare.jpg").default,
      label: "Healthcare",
      labelId: "homepage.industry.healthcare",
      href: "/docs/one-ai/industries/healthcare",
    },
    {
      key: "industry",
      src: require("@site/static/img/industries/Industrie.jpg").default,
      label: "Industrial Manufacturing",
      labelId: "homepage.industry.industry",
      href: "/docs/one-ai/industries/manufacturing",
    },
    {
      key: "retail",
      src: require("@site/static/img/industries/Retail.jpg").default,
      label: "Retail",
      labelId: "homepage.industry.retail",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "security",
      src: require("@site/static/img/industries/Security.jpg").default,
      label: "Security",
      labelId: "homepage.industry.security",
      href: "/docs/one-ai/use-cases/pcb",
    },
    {
      key: "transport",
      src: require("@site/static/img/industries/Transport.jpg").default,
      label: "Transport & Logistics",
      labelId: "homepage.industry.transport",
      href: "/docs/one-ai/use-cases/pcb",
    },
  ];

  // immer 2 Bilder pro „Spalte“
  const columns: typeof items[] = [];
  for (let i = 0; i < items.length; i += 2) {
    columns.push(items.slice(i, i + 2));
  }

  return (
    <div id="industries" className="py-8 md:py-12 pb-4 md:pb-6">
      {/* Überschrift mit normalem Container-Padding */}
      <div className="container mx-auto px-4 mb-8">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-left font-bold">
          <Translate id="homepage.industries.title">
            For Every Industry:
          </Translate>
        </p>
      </div>
      
      {/* Grid über volle Breite ohne Container-Padding */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-0">
        {items.map((item) => (
          <a 
            key={item.key} 
            href={item.href}
            className="relative group aspect-video overflow-hidden bg-gray-900 hover:bg-gray-800 transition-all duration-300"
          >
            <img 
              src={item.src} 
              alt={item.label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm md:text-base font-semibold text-center">
                <Translate id={item.labelId}>
                  {item.label}
                </Translate>
              </p>
            </div>
          </a>
        ))}
      </div>
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
      titleId: "homepage.usecase.quality.title",
      subtitle: "From idea to realization in one click with one software",
      subtitleId: "homepage.usecase.quality.subtitle",
      image: "/img/ai/one_ai_plugin/use_cases/capture/preview_b.png",
      description: "Eliminate months of development time. Integrate AI with our pre-build UI that supports monitoring, remote control and continuous improvement. Already in production with leading production companies and ready for your quality control or automation task with:",
      descriptionId: "homepage.usecase.quality.description",
      metrics: [
        { value: "1-Click", label: "Deployment", labelId: "homepage.metric.deployment" },
        { value: "< 1 Day", label: "Development Time", labelId: "homepage.metric.devtime" },
      ],
      relatedUseCases: [
        { title: "Quality Control", titleId: "homepage.related.qualitycontrol" },
        { title: "Industrial Automation", titleId: "homepage.related.automation" },
        { title: "Measuring Instruments", titleId: "homepage.related.measuring" }
      ],
      whitepaper: "/docs/one-ai/use-cases/camera-tool",
      linkText: "More Details",
      linkTextId: "homepage.usecase.link"
    },
    {
      title: "High Precision Object Detection",
      titleId: "homepage.usecase.detection.title",
      subtitle: "ONE AI outperforms scientists in under one second by accuracy and speed",
      subtitleId: "homepage.usecase.detection.subtitle",
      image: "/img/ai/one_ai_plugin/use_cases/pcb/pcb_b.png",
      description: "AI models, generated by ONE AI in 0.7 seconds, are not only faster but also more accurate. As example researchers created a custom AI model for a PCB quality control. ONE AI beat not only standard image processing and universal AI models, but also the AI model from the scientists with:",
      descriptionId: "homepage.usecase.detection.description",
      metrics: [
        { value: "98.4", label: "F1 Score", labelId: "homepage.metric.f1score" },
        { value: "750 %", label: "Speed Increase", labelId: "homepage.metric.speed" },
      ],
      relatedUseCases: [
        { title: "Quality Control", titleId: "homepage.related.qualitycontrol" },
        { title: "Diagnostic Imaging", titleId: "homepage.related.diagnostic" },
        { title: "Autonomous Driving", titleId: "homepage.related.autonomous" }
      ],
      whitepaper: "/docs/one-ai/use-cases/pcb",
      linkText: "More Details",
      linkTextId: "homepage.usecase.link"
    },
    {
      title: "High Speed and Efficient Automation",
      titleId: "homepage.usecase.automation.title",
      subtitle: "Run AI on tiny and decade-old chips and still outperform the latest AI hardware",
      subtitleId: "homepage.usecase.automation.subtitle",
      image: "/img/ai/one_ai_plugin/use_cases/chip/defect_b.png",
      description: "With ONE AI you get the most accurate and efficient AI models on any hardware. This includes also mobile systems like drones and your existing hardware. As example, together with our partner Altera we show how Altera's most low-power Chip with ONE AI can now outperform Nvidia's Jetson Orin Nano with:",
      descriptionId: "homepage.usecase.automation.description",
      metrics: [
        { value: "72×", label: "Faster Detection", labelId: "homepage.metric.latency" },
        { value: "24×", label: "Less Errors", labelId: "homepage.metric.errors" },
        { value: "20×", label: "Lower Power", labelId: "homepage.metric.power" },
        { value: "6×", label: "Lower Cost", labelId: "homepage.metric.cost" },
      ],
      relatedUseCases: [
        { title: "Industry Automation", titleId: "homepage.related.industryautomation" },
        { title: "Drones and Aerospace", titleId: "homepage.related.drones" },
        { title: "Consumer Electronics", titleId: "homepage.related.electronics" }
      ],
      whitepaper: "/docs/one-ai/use-cases/chip",
      linkText: "More Details",
      linkTextId: "homepage.usecase.link"
    },
    {
      title: "Reference-Based Object Detection",
      titleId: "homepage.usecase.difference.title",
      subtitle: "Leverage multi-image comparison for superior object detection accuracy",
      subtitleId: "homepage.usecase.difference.subtitle",
      image: "/img/ai/one_ai_plugin/demos/overlap-difference/image_000118_test.png",
      description: "ONE AI's overlap difference capability enables direct comparison between reference and test images, dramatically improving detection accuracy for quality control and surveillance applications. In a challenging benchmark with small objects and complex backgrounds, ONE AI outperformed YOLOv8 with:",
      descriptionId: "homepage.usecase.difference.description",
      metrics: [
        { value: "95.7", label: "F1 Score", labelId: "homepage.metric.f1score" },
        { value: "8×", label: "Smaller Model", labelId: "homepage.metric.modelsize" },
        { value: "10×", label: "Fewer Errors", labelId: "homepage.metric.fewererrors" },
      ],
      relatedUseCases: [
        { title: "Quality Control", titleId: "homepage.related.qualitycontrol" },
        { title: "Surveillance", titleId: "homepage.related.surveillance" },
        { title: "PCB Inspection", titleId: "homepage.related.pcbinspection" }
      ],
      whitepaper: "/docs/one-ai/use-cases/difference-detection",
      linkText: "More Details",
      linkTextId: "homepage.usecase.link"
    }
  ];
  
  return (
    <div id="comparison" className="pt-6 md:pt-8 pb-8 md:pb-8 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 font-bold px-4">
          <Translate id="homepage.usecase.title">
            Example Use-Cases
          </Translate>
        </p>
      </div>

      <div className="relative">
        <Swiper 
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
          initialSlide={1}
          watchSlidesProgress={true}
          breakpoints={{
            768:  { slidesPerView: 1.5,  spaceBetween: 40 },
            1280: { slidesPerView: 1.75, spaceBetween: 50 },
          }}
        >
          {useCases.map((useCase, idx) => (
            // DER ZWEITE WICHTIGE FIX BLEIBT:
            <SwiperSlide key={idx}>
              {({ isActive }) => (
                <UseCaseCard data={useCase} isActive={isActive}/>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* DEINE BUTTON-LOGIK WIEDERHERGESTELLT (Teil 3) */}
        {/* Die onClick-Handler sind wieder auf den Buttons. */}
        <button
          onClick={scrollPrev}
          aria-label="Previous use case"
          className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 shadow-lg transition-transform hover:scale-105"
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
          className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-2 lg:p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 shadow-lg transition-transform hover:scale-105"
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
    <Layout title={translate({id: 'homepage.seo.title', message: 'The Next Generation Vision and Edge AI Software'})}
            description={translate({id: 'homepage.seo.description', message: 'Get better results in less time. AI automatically tailored for your needs. Optimized and exported for PCs, microcontrollers, FPGAs, GPUs, NPUs and more.'})}>
      <Head>
        {/* Open Graph für Social Media */}
        <meta property="og:title" content={translate({id: 'homepage.seo.og.title', message: 'The Next Generation Vision and Edge AI Software'})} />
        <meta property="og:description" content={translate({id: 'homepage.seo.og.description', message: 'Get better results in less time with ONE AI. AI models, automatically tailored for your needs.'})} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://one-ware.com/" />
        <meta property="og:image" content="https://one-ware.com/img/social-card.jpg" />
        
        {/* International SEO */}
        <link rel="alternate" hrefLang="en" href="https://one-ware.com/" />
        <link rel="alternate" hrefLang="de" href="https://one-ware.com/de/" />
        <link rel="alternate" hrefLang="x-default" href="https://one-ware.com/" />
      </Head>
      
      <HomepageHeader />
      <main className="overflow-x-hidden alternative-background ">
        <div className="dropshadowbottom">
          <div className="dropshadowtop diagclipbottom">
            <div className="default-background pb-12">
              <IndustryExamplesSection />
              <ComparisonSection />
              
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
