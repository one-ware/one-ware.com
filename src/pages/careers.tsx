import React, { useState, useRef, useEffect } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import { JOBS_DATA } from "../data/jobsData";
import { EMPLOYEE_STORIES } from "../data/employeeStories";
import NeuralNetworkSimple from "../components/NeuralNetworkSimple";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { JSX } from "react";
import HeroBackground from "../components/HeroBackground";

function getLocalizedField<T extends Record<string, unknown>>(obj: T, field: keyof T, locale: string): unknown {
  if (locale === "de") {
    const deKey = `${String(field)}_de` as keyof T;
    if (obj[deKey] !== undefined) {
      return obj[deKey];
    }
  }
  return obj[field];
}

export default function CareersPage(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const [displayedStory, setDisplayedStory] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [slidePhase, setSlidePhase] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [heroVisible, setHeroVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, []);

  const handleStoryChange = (newIndex: number) => {
    if (newIndex === activeStory || slidePhase !== 'idle') return;

    setSlideDirection(newIndex > activeStory ? 'right' : 'left');
    setActiveStory(newIndex);
    setSlidePhase('exit');

    setTimeout(() => {
      setDisplayedStory(newIndex);
      setSlidePhase('enter');

      setTimeout(() => {
        setSlidePhase('idle');
      }, 500);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const openLinkInNewWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const scrollToJobs = () => {
    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const allJobs = JOBS_DATA.flatMap(({ positions }) =>
    positions.map((position) => position)
  );

  const whoWeAre = [
    {
      key: "1",
      name: "Leon Beier",
      position: "CEO",
      imageSrc: require("@site/static/img/AboutUs/Leon.png").default,
    },
    {
      key: "2",
      name: "Ali Durmaz",
      position: "COO",
      imageSrc: require("@site/static/img/AboutUs/Ali.png").default,
    },
    {
      key: "3",
      name: "Leo Wiegand",
      position: "CRO",
      imageSrc: require("@site/static/img/AboutUs/Leo.png").default,
    },
    {
      key: "4",
      name: "Hendrik Mennen",
      position: "CTO",
      imageSrc: require("@site/static/img/AboutUs/Hendrik.png").default,
    },
    {
      key: "5",
      name: "Helmut Plötz",
      position: "Vice President of Global Sales",
      imageSrc: require("@site/static/img/AboutUs/helmut.png").default,
    },
    {
      key: "6",
      name: "Christopher",
      position: "AI Engineer",
      imageSrc: require("@site/static/img/support_christopher.webp").default,
    },
    {
      key: "7",
      name: "Annalena",
      position: "AI Engineer",
      imageSrc: require("@site/static/img/AboutUs/annalena.png").default,
    },
    {
      key: "8",
      name: "Thimo",
      position: "Embedded AI Engineer",
      imageSrc: require("@site/static/img/AboutUs/default.png").default,
    },
    {
      key: "9",
      name: "Matthias",
      position: "Software Engineer",
      imageSrc: require("@site/static/img/AboutUs/Matthias.png").default,
    },
    {
      key: "10",
      name: "Nils",
      position: "Software Engineer",
      imageSrc: require("@site/static/img/AboutUs/default.png").default,
    },
    {
      key: "11",
      name: "Sebastian",
      position: "Founders Associate",
      imageSrc: require("@site/static/img/AboutUs/default.png").default,
    },
    {
      key: "12",
      name: "Till",
      position: "Working Student - AI",
      imageSrc: require("@site/static/img/AboutUs/default.png").default,
    },
    {
      key: "13",
      name: "Allen",
      position: "Working Student - AI",
      imageSrc: require("@site/static/img/AboutUs/Allen.jpg").default,
    },
    {
      key: "14",
      name: "Dominik",
      position: "Working Student - Sales",
      imageSrc: require("@site/static/img/AboutUs/default.png").default,
    },
    {
      key: "15",
      name: "Nele",
      position: "Working Student - Marketing",
      imageSrc: require("@site/static/img/AboutUs/default.png").default,
    },
  ]

  const featuredIn = [
    { key: "1", imageSrc: require("@site/static/img/Featured/f1_g.png").default, url: "https://tech.eu/2025/06/18/one-ware-raises-eur25m-to-automate-ai-model-configuration-across-industries/" },
    { key: "3", imageSrc: require("@site/static/img/Featured/f4_g.png").default, url: "https://www.elektronikpraxis.de/one-ai-automatisierte-ki-konfiguration-fuer-entwickler-a-09fee486cec031ed0a2edd5dbeeaed0a/" },
    { key: "6", imageSrc: require("@site/static/img/Featured/f9_g.png").default, url: "https://www.vdi-nachrichten.com/technik/automation/ki-im-maschinenbau-auf-bestehender-hardware-nutzen/" },
    { key: "7", imageSrc: require("@site/static/img/Featured/f10_g.png").default, url: "https://www.elektormagazine.com/news/one-ai-vision-edge-ai-en" },
    { key: "8", imageSrc: require("@site/static/img/Partner/altera_w.png").default, url: "https://go.altera.com/l/1090322/2025-04-18/2vvzbn" },
  ]

  return (
    <Layout
      title={translate({ id: "careers.meta.title", message: "Careers at ONE WARE" })}
      description={translate({ id: "careers.meta.description", message: "Join ONE WARE and help to revolutionize Edge AI development." })}
    >
      <HeroBackground
        className="min-h-[66vh] flex items-center"
        style={{
          marginTop: "calc(var(--ifm-navbar-height) * -1)",
          paddingTop: "var(--ifm-navbar-height)",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
            <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight dark:text-white text-gray-900 leading-none tracking-tight">
                <span
                  className="block transition-all duration-700 ease-out"
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                  }}
                >
                  <Translate id="careers.hero.title1">We_Are</Translate>
                </span>
                <span
                  className="block transition-all duration-700 ease-out delay-150"
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: '150ms',
                  }}
                >
                  <Translate id="careers.hero.title2">Hiring</Translate>
                </span>
              </h1>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center">
              <p
                className="text-lg md:text-xl dark:text-gray-300 text-gray-600 max-w-md text-center lg:text-left mb-8 transition-all duration-700 ease-out"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '300ms',
                }}
              >
                <Translate id="careers.hero.subtitle">
                  Join our team and help shape the future of Vision and Edge AI development. We're looking for passionate people who want to make a difference.
                </Translate>
              </p>
              <button
                onClick={scrollToJobs}
                className="button button--primary button--outline button--lg"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 700ms ease-out, transform 700ms ease-out',
                  transitionDelay: '450ms',
                }}
              >
                <Translate id="careers.hero.cta">View Open Positions</Translate>
              </button>
            </div>
          </div>
        </div>
      </HeroBackground>

      <section id="jobs" className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative w-full aspect-video bg-black">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                onEnded={() => setIsPlaying(false)}
                src={require("@site/static/img/AboutUs/WebsiteVideoBlur1.mp4").default}
                controls={isPlaying}
              />

              {!isPlaying && (
                <button
                  onClick={handlePlayClick}
                  className="absolute inset-0 w-full h-full flex flex-col items-center justify-center cursor-pointer bg-black/40"
                >
                  <div className="absolute top-[15%] flex flex-col items-center gap-6">
                    <span className="text-[var(--ifm-color-primary)] text-sm md:text-base font-medium uppercase" style={{ letterSpacing: '0.15em' }}>
                      <Translate id="careers.video.joinTeam">JOIN OUR TEAM</Translate>
                    </span>
                    <span className="text-white text-2xl md:text-3xl font-medium uppercase" style={{ letterSpacing: '0.15em' }}>
                      <Translate id="careers.video.applyToday">APPLY TODAY</Translate>
                    </span>
                  </div>

                  <div
                    className="flex items-center justify-center transition-transform hover:scale-110 w-20 h-20 rounded-full"
                    style={{ border: '1px solid white' }}
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

            <div className="mt-12 md:mt-16 w-full sm:w-4/5 mx-auto">
              {allJobs.map((job, index) => (
                <div
                  key={job.id}
                  onClick={() =>
                    openLinkInNewWindow(
                      require(`@site/static/career/${locale}/${job.url}`).default
                    )
                  }
                  className="cursor-pointer group"
                >
                  <div className="flex items-center pt-6 pb-2 pr-8 md:pr-12 transition-all duration-300" style={{ borderBottom: "1px solid #6b7280" }}>
                    <span className="text-gray-600 text-sm md:text-base font-normal w-10 flex-shrink-0 transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-grow flex justify-center">
                      <span className="w-full sm:w-72 md:w-96 text-left">
                        <span className="block text-gray-600 text-sm md:text-base font-normal transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)]">
                          {getLocalizedField(job, "title", locale) as string}
                        </span>
                        <span className="block text-gray-400 text-xs font-normal transition-colors duration-300 group-hover:text-gray-500">
                          {getLocalizedField(job, "location", locale) as string}
                        </span>
                      </span>
                    </span>

                    <span className="text-gray-600 flex-shrink-0 transition-all duration-300 group-hover:text-[var(--ifm-color-primary)] group-hover:translate-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20">
              <h2 className="text-gray-600 text-3xl md:text-4xl font-normal text-left mb-12">
                <Translate id="careers.whoweare.title">Who we are</Translate>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {whoWeAre.map((item, index) => (
                  <div
                    key={item.key}
                    className="flex flex-col group cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-center">
                      <div className="w-full aspect-square max-w-40 rounded-full mb-4 overflow-hidden relative transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg">
                        <img src={item.imageSrc} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                    <h3 className="text-gray-600 text-sm md:text-base font-normal mb-3 text-left transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)]">
                      <Translate id={`careers.whoweare.item.title.${item.key}`}>{item.name}</Translate>
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm font-normal text-left transition-colors duration-300 group-hover:text-gray-700">
                      <Translate id={`careers.whoweare.item.description.${item.key}`}>{item.position}</Translate>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="alternative-background py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-[var(--ifm-color-primary)] text-sm md:text-base font-normal uppercase mb-2 text-center">
              <Translate id="careers.facts.label">Key Facts</Translate>
            </p>
            <h2 className="text-white text-xl md:text-2xl font-light uppercase mb-16 text-center tracking-widest">
              <Translate id="careers.facts.title">Why you should work with us</Translate>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center md:items-end md:text-right">
                <span className="text-[var(--ifm-color-primary)] text-2xl md:text-3xl font-normal uppercase">
                  <Translate id="careers.facts.stat1.value">2024</Translate>
                </span>
                <span className="text-gray-400 text-xs uppercase mt-1">
                  <Translate id="careers.facts.stat1.label">Founded</Translate>
                </span>
                <span className="text-[var(--ifm-color-primary)] text-2xl md:text-3xl font-normal uppercase mt-8">
                  <Translate id="careers.facts.stat2.value">Cutting Edge Technologies</Translate>
                </span>
                <span className="text-gray-400 text-xs uppercase mt-1">
                  <Translate id="careers.facts.stat2.label">Brand-new products found nowhere else</Translate>
                </span>
              </div>

              <div className="flex items-center justify-center">
                <NeuralNetworkSimple width={180} height={180} autoRotate={true} />
              </div>

              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <span className="text-[var(--ifm-color-primary)] text-2xl md:text-3xl font-normal">
                  <Translate id="careers.facts.stat3.value">15</Translate>
                </span>
                <span className="text-gray-400 text-xs uppercase mt-1">
                  <Translate id="careers.facts.stat3.label">Employees</Translate>
                </span>
                <span className="text-[var(--ifm-color-primary)] text-2xl md:text-3xl font-normal uppercase mt-8">
                  <Translate id="careers.facts.stat4.value.l1">We Value</Translate>
                  <br />
                  <Translate id="careers.facts.stat4.value.l2">Creativity</Translate>
                </span>
                <span className="text-gray-400 text-xs uppercase mt-1">
                  <Translate id="careers.facts.stat4.label">Bring your ideas, shape what we build</Translate>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-gray-600 text-xl md:text-2xl font-light uppercase mb-12 text-center tracking-widest">
              <Translate id="careers.stories.title">Employee Story</Translate>
            </h2>

            <div className="bg-gray-200 p-6 sm:p-8 md:p-12 pb-6 overflow-hidden">
              <div
                className={`story-content ${
                  slidePhase === 'exit'
                    ? slideDirection === 'right' ? 'slide-exit-left' : 'slide-exit-right'
                    : slidePhase === 'enter'
                    ? slideDirection === 'right' ? 'slide-enter-right' : 'slide-enter-left'
                    : ''
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-8 lg:gap-24">
                  <div className="flex flex-col justify-center text-center lg:text-left">
                    <p className="text-gray-600 text-base md:text-lg italic leading-relaxed min-h-[8rem]">
                      "{getLocalizedField(EMPLOYEE_STORIES[displayedStory], "quote", locale) as string}"
                    </p>

                    <div className="mt-8 flex items-start gap-8">
                      <span className="text-[var(--ifm-color-primary)] text-4xl sm:text-5xl md:text-6xl font-bold italic" style={{ lineHeight: 0.7 }}>
                        "
                      </span>
                      <div className="space-y-1">
                        <span className="text-gray-700 text-sm md:text-base font-normal block">
                          {EMPLOYEE_STORIES[displayedStory].name}
                        </span>
                        <span className="text-gray-500 text-sm md:text-base block">
                          {getLocalizedField(EMPLOYEE_STORIES[displayedStory], "position", locale) as string}
                        </span>
                        <span className="text-[var(--ifm-color-primary)] text-sm md:text-base block">
                          {getLocalizedField(EMPLOYEE_STORIES[displayedStory], "cyanText", locale) as string}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="order-first lg:order-none">
                    <div className="w-full aspect-square max-w-xs mx-auto lg:max-w-none lg:h-full relative overflow-hidden">
                      {EMPLOYEE_STORIES[displayedStory].image && (
                        <img
                          src={EMPLOYEE_STORIES[displayedStory].image}
                          alt={EMPLOYEE_STORIES[displayedStory].name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {EMPLOYEE_STORIES.length > 1 && (
                <div className="flex justify-center items-center gap-8 mt-8">
                  <svg
                    onClick={() => handleStoryChange(activeStory - 1 < 0 ? EMPLOYEE_STORIES.length - 1 : activeStory - 1)}
                    className="w-5 h-5 cursor-pointer text-[var(--ifm-color-primary)] hover:-translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  <div className="flex gap-3">
                    {EMPLOYEE_STORIES.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handleStoryChange(index)}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                          index === activeStory ? "bg-[var(--ifm-color-primary)]" : "bg-neutral-300 hover:bg-neutral-400"
                        }`}
                      />
                    ))}
                  </div>
                  <svg
                    onClick={() => handleStoryChange(activeStory + 1 >= EMPLOYEE_STORIES.length ? 0 : activeStory + 1)}
                    className="w-5 h-5 cursor-pointer text-[var(--ifm-color-primary)] hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#00FFD1] py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-gray-700 text-xl md:text-2xl font-light uppercase mb-12 text-center tracking-widest">
              <Translate id="careers.companies.title">Known From</Translate>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
              {featuredIn.map((item) => (
                <a
                  key={item.key}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-32 sm:w-44 h-12 sm:h-16 bg-black overflow-hidden relative transition-all duration-300 hover:scale-110 hover:opacity-80 cursor-pointer"
                >
                  <img src={item.imageSrc} alt="" className="absolute inset-0 w-full h-full object-contain p-2" loading="lazy" />
                </a>
              ))}
            </div>

            {/* <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="w-24 sm:w-32 h-8 sm:h-10 bg-black transition-all duration-300 hover:scale-110 hover:opacity-80 cursor-pointer"
                />
              ))}
            </div> */}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .story-content {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        .slide-exit-left {
          transform: translateX(-60px);
          opacity: 0;
        }

        .slide-exit-right {
          transform: translateX(60px);
          opacity: 0;
        }

        .slide-enter-right {
          animation: enterFromRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .slide-enter-left {
          animation: enterFromLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes enterFromRight {
          from {
            transform: translateX(60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes enterFromLeft {
          from {
            transform: translateX(-60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  );
}
