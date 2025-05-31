import React, { useRef } from "react";
import "aos/dist/aos.css";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import initWebsiteEffects from "../components/startEffects";
import {JSX} from "react";
import Translate, { translate } from "@docusaurus/Translate";

export default function AboutUs(): JSX.Element {
  //initWebsiteEffects();

  return (
    <Layout title="About Us" description="About our Team">
      <main className="container mb-20">
        
        <div className="text-center max-w-5xl m-auto mt-16">
        <h2 className="text-5xl font-bold mb-10"><Translate id="aboutUs.1.text">The Founders</Translate></h2>
        <img src={require('@site/static/img/AboutUs/Team.jpeg').default} />
        <hr className="border-gray-400 my-8 mx-auto max-w-3xl mt-20 h-0.5" />
        <div className="text-4xl mt-8 mb-5" ><Translate id="aboutUs.2.text">Who We Are</Translate></div>
          <div className="md:grid md:grid-cols-4 text-center gap-10">
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={require('@site/static/img/AboutUs/Leon.png').default}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Leon Beier</div>
              <div className="text-l font-bold mt-2">CEO</div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="https://www.linkedin.com/in/leon-beier-55bbb7230/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="mailto:lbeier@one-ware.com"
                >
                  lbeier@one-ware.com
                </a>
              </div>
            </div>
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={require('@site/static/img/AboutUs/Ali.png').default}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Ali Durmaz</div>
              <div className="text-l font-bold mt-2">COO</div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="https://www.linkedin.com/in/ali-durmaz-1a0799215/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="mailto:adurmaz@one-ware.com"
                >
                  adurmaz@one-ware.com
                </a>
              </div>
            </div>
            
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={require('@site/static/img/AboutUs/Leo.png').default}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Leo Wiegand</div>
              <div className="text-l font-bold mt-2">CRO</div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="https://www.linkedin.com/in/leo-wiegand-b27aa0272/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="mailto:lwiegand@one-ware.com"
                >
                  lwiegand@one-ware.com
                </a>
              </div>
            </div>
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={require('@site/static/img/AboutUs/Hendrik.png').default}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Hendrik Mennen</div>
              <div className="text-l font-bold mt-2">CTO</div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="https://www.linkedin.com/in/hendrik-mennen-3b9a04230/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </div>
              <div>
                <a
                  className="text-stone-300 hover:text-stone-100"
                  href="mailto:hmennen@one-ware.com"
                >
                  hmennen@one-ware.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
