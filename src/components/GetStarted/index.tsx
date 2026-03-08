import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import HeroBackground from "@site/src/components/HeroBackground";

export default function GetStarted() {
  return (
    <HeroBackground className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="dark:text-white text-gray-900 text-2xl md:text-4xl font-normal mb-8">
            <Translate id="oneai.getstarted.heading">
              Get Started in 3 Simple Steps:
            </Translate>
          </h2>

          <div className="space-y-4 dark:text-gray-300 text-gray-700 text-lg md:text-xl mb-8">
            <div>
              <span className="font-medium">1.</span>{" "}
              <a href="/docs/one-ai/quick-start-guide#free-download" target="_blank" className="underline hover:no-underline primary-text">
                <Translate id="oneai.getstarted.step2.download">
                  Download
                </Translate>
              </a>{" "}
              <Translate id="oneai.getstarted.step2.text">
                ONE WARE Studio with the ONE AI Extension.
              </Translate>
            </div>
            <div>
              <span className="font-medium">2.</span>{" "}
              <a href="https://cloud.one-ware.com/Account/Register" target="_blank" className="underline hover:no-underline primary-text">
                <Translate id="oneai.getstarted.step1.signup">
                  Sign up
                </Translate>
              </a>
              <Translate id="oneai.getstarted.step1.text">
                , and verify your account.
              </Translate>
            </div>
            <div>
              <span className="font-medium">3.</span>{" "}
              <Translate id="oneai.getstarted.step3">
                Build your first AI models for free.
              </Translate>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link
              to="/docs/one-ai/getting-started/quick-start-guide"
              className="button button--primary button--lg"
            >
              <Translate id="oneai.getstarted.cta.tutorial">Quick Start Guide</Translate>
            </Link>
          </div>

          <div className="border-t dark:border-gray-700 border-gray-300 pt-6 mt-6">
            <p className="dark:text-gray-400 text-gray-600 text-base md:text-lg">
              <Translate id="oneai.getstarted.contact.or">Or</Translate>{" "}
              <a href="mailto:sales@one-ware.com?subject=Docker Container Request for Local AI Training" className="primary-text underline hover:no-underline font-medium">
                <Translate id="oneai.getstarted.contact.sales">Contact sales</Translate>
              </a>{" "}
              <Translate id="oneai.getstarted.contact.text">to request a docker container for local AI training</Translate>
            </p>
          </div>
        </div>
      </div>
    </HeroBackground>
  );
}
