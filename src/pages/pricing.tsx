import React, { useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import HeroBackground from "../components/HeroBackground";
import ContactUs from "../components/ContactUs";
import { JSX } from "react";

export default function PricingPage(): JSX.Element {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout
      title={translate({ id: "pricing.meta.title", message: "Pricing" })}
      description={translate({ id: "pricing.meta.description", message: "Start building your custom AI for free. Flexible pricing for every stage." })}
    >
      <HeroBackground
        className="min-h-[50vh] flex items-center"
        style={{
          marginTop: "calc(var(--ifm-navbar-height) * -1)",
          paddingTop: "var(--ifm-navbar-height)",
        }}
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight dark:text-white text-gray-900 leading-none tracking-tight">
              <span
                className="block transition-all duration-700 ease-out"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? "translateY(0)" : "translateY(30px)",
                }}
              >
                <Translate id="pricing.hero.title">Pricing</Translate>
              </span>
            </h1>
            <p
              className="text-lg md:text-xl dark:text-gray-300 text-gray-600 max-w-lg mt-6 transition-all duration-700 ease-out"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: "200ms",
              }}
            >
              <Translate id="pricing.hero.subtitle">Start building your custom AI for free</Translate>
            </p>
          </div>
        </div>
      </HeroBackground>

      <section className="default-background py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="rounded-2xl border border-[var(--ifm-color-primary)] p-8 md:p-12 text-center transition-all duration-300 hover:shadow-lg" style={{ background: "var(--ifm-background-surface-color)" }}>
                <p className="text-[var(--ifm-color-primary)] text-sm font-semibold uppercase tracking-widest mb-4">
                  <Translate id="pricing.free.label">Free</Translate>
                </p>
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-bold dark:text-white text-gray-900">0€</span>
                </div>
                <p className="text-gray-400 mb-8">
                  <Translate id="pricing.free.nocreditcard">No credit card needed</Translate>
                </p>
                <div className="space-y-4 mb-10 text-left max-w-sm mx-auto">
                  {[
                    translate({ id: "pricing.free.feature.credits", message: "3,000 free credits per month" }),
                    translate({ id: "pricing.free.feature.agent", message: "ONE AI Agent" }),
                    translate({ id: "pricing.free.feature.desktop", message: "ONE AI Desktop" }),
                    translate({ id: "pricing.free.feature.projects", message: "Max. 10 Projects" }),
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[var(--ifm-color-primary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="dark:text-gray-300 text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="https://cloud.one-ware.com/Account/Register">
                  <button className="button button--primary button--lg">
                    <Translate id="pricing.free.cta">Get Started</Translate>
                  </button>
                </Link>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[var(--ifm-color-primary)] text-sm font-semibold uppercase tracking-widest mb-4">
                    <Translate id="pricing.credits.title">Credits on Demand</Translate>
                  </p>
                  <div className="flex items-baseline justify-center gap-3 mb-4">
                    <span className="text-5xl md:text-6xl font-bold dark:text-white text-gray-900">20€</span>
                    <span className="text-xl text-gray-400">
                      / 1,000 <Translate id="pricing.credits.unit">credits</Translate>
                    </span>
                  </div>
                  <p className="dark:text-gray-300 text-gray-600 max-w-sm mx-auto">
                    <Translate id="pricing.credits.description">
                      Need more? Purchase additional credits anytime to scale your AI training.
                    </Translate>
                  </p>
                  <p className="dark:text-gray-300 text-gray-600 max-w-sm mx-auto mt-8 pt-8" style={{ borderTop: '1px solid hsla(0,0%,71%,.246)' }}>
                    <span className="text-[var(--ifm-color-primary)] text-sm font-semibold uppercase tracking-widest block mb-2">
                      <Translate id="pricing.student.title">Student Program</Translate>
                    </span>
                    <Translate id="pricing.student.description">
                      Apply to get 10,000 free credits per month
                    </Translate>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HeroBackground className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-light dark:text-white text-gray-900 mb-2">
                <Translate id="pricing.services.title">Our Services</Translate>
              </h2>
              <p className="dark:text-gray-300 text-gray-600 mb-6">
                <Translate id="pricing.services.subtitle">Consulting, custom solutions and hardware support</Translate>
              </p>
              <Link to="/docs/one-ai/services" className="button button--primary button--outline button--lg">
                <Translate id="pricing.services.cta">View Services</Translate>
              </Link>
            </div>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-light dark:text-white text-gray-900 mb-2">
                <Translate id="pricing.opensource.title">Open Source Program</Translate>
              </h2>
              <p className="dark:text-gray-300 text-gray-600 mb-6">
                <Translate id="pricing.opensource.subtitle">Free credits for non-commercial projects</Translate>
              </p>
              <Link to="/docs/one-ai/open-source-program" className="button button--primary button--outline button--lg">
                <Translate id="pricing.opensource.cta">Learn More</Translate>
              </Link>
            </div>
          </div>
        </div>
      </HeroBackground>

      <section id="contact" className="alternative-background py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              <Translate id="pricing.commercial.title">Commercial Use of AI Models</Translate>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              <Translate id="pricing.commercial.description">
                Need a commercial license for your trained AI models? Get in touch with our sales team.
              </Translate>
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <ContactUs />
          </div>
        </div>
      </section>
    </Layout>
  );
}
