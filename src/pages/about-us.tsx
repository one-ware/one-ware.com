import React, { useRef } from "react";
import "aos/dist/aos.css";
import Slider from "react-slick";
import Layout from "@theme/Layout";
import initWebsiteEffects from "../components/startEffects";

export default function AboutUs(): JSX.Element {
  //initWebsiteEffects();

  return (
    <Layout title="About Us" description="About our Team">
      <main className="container my-20">
        <img src="/img/AboutUs/Team.jpeg" />
        <div className="text-center max-w-5xl m-auto mt-16">
          <h2 className="text-5xl font-bold">Our Team</h2>
          <div className="md:grid md:grid-cols-4 text-center mt-10 gap-10">
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={"/img/AboutUs/Leon.png"}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Leon Beier</div>
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
                  href="mailto:lbeier@plc-one.net"
                >
                  lbeier@plc-one.net
                </a>
              </div>
            </div>
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={"/img/AboutUs/Hendrik.png"}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Hendrik Mennen</div>
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
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={"/img/AboutUs/Leo.png"}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Leo Wiegand</div>
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
                  href="mailto:lwiegand@plc-one.net"
                >
                  lwiegand@plc-one.net
                </a>
              </div>
            </div>
            <div className="mt-10">
              <div className="m-auto md:mt-0">
                <img
                  className="m-auto md:mt-0"
                  src={"/img/AboutUs/Ali.png"}
                  alt="Modular"
                  height={170}
                  width={170}
                />
              </div>
              <div className="text-xl mt-2">Ali Durmaz</div>
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
                  href="mailto:adurmaz@plc-one.net"
                >
                  adurmaz@plc-one.net
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
