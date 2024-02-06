import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./plc-one.module.css";
import Link from "@docusaurus/Link";
import { RiPlantLine } from "react-icons/ri";
import { TfiWorld } from "react-icons/tfi";

export default function Studio(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="PLC ONE" description="Empowering Industry 5.0">

      <header>
        <div className="flex">
          <div className="flex justify-center mx-auto w-screen">
            <img
              src={"/img/plc/Schaltschrank.png"}
              alt="PLC Logo" 
            />
            <div className="absolute flex justify-center w-full h-full">
              <img
                src={"/img/plc/Logo_SVG-ONE-plc.svg"}
                alt="PLC Logo"
                className="drop-shadow-4xl"
                width={760}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="pb-0 m-0 overflow-hidden">
        <div className="container m-auto text-white mb-24">
          <div className="grid grid-cols-3 text-center mt-20 md:mx-20">
            <div>
              <img src="/img/plc/Fast.png" height={150} />
            </div>
            <div>
              <img src="/img/plc/Efficient.png" height={150} />
            </div>
            <div>
              <img src="/img/plc/Simple.png" height={150} />
            </div>
          </div>

          <div className="flex">
            <img
              className="m-auto mt-10"
              alt="PLC ONE CASE"
              src={"/img/plc/Case.png"}
              width={1100}
            />
          </div>

          <div className="text-center max-w-4xl m-auto mt-24">
            <h2 className="text-4xl font-bold mt-10">
              One Simple Solution for the Tasks of the Future
            </h2>
            <img src={"/img/plc/Compare.png"} className="mt-10" alt="Compare" />
            <div className="text-xl mt-12">
              With a completely new processing architecture, we create the first Industry 5.0 ready industrial controller. Up to 1 Mio. times higher processing speeds in a small, efficient and affordable controller, enable the implementation of AI in every factory, robot, vehicle or drone.
            </div>
          </div>

          <div className="text-center max-w-4xl m-auto mt-24 lg:mt-32">
            <h2 className="text-4xl font-bold mt-10">
              All You Need in One Modular System
            </h2>
            <img
              src={"/img/plc/PLC_Example.png"}
              className="mt-10"
              alt="Compare"
              style={{ maxHeight: 500 }}
            />
            <div className="text-xl mt-12">
              All extensions are compliant with the CRUVI Standard. Use not just
              our modules, but also extensions from industry leaders in the FPGA
              development space. Process data from a camera on the same chip
              that runs your industrial plant.
            </div>
          </div>

          <div className="text-center max-w-4xl m-auto mt-24 lg:mt-32">
            <h2 className="text-4xl font-bold mt-10">
              All You Need in One Modular System
            </h2>
            <img
              src={"/img/plc/PLC_System.png"}
              className="mt-10"
              alt="Compare"
              height={500}
            />
            <div className="text-xl mt-12">
              The PLC ONE is not an ordinary Industrial Controller. Process data
              from a camera with an AI on the same chip that runs your
              industrial plant. The low price and small form factor also allows
              the direct integration in robots, drones or other mobile systems
              as PCB. Everything with just few universal modular building
              blocks.
            </div>
          </div>

          <div className="text-center max-w-4xl m-auto mt-24 lg:mt-32">
            <h2 className="text-4xl font-bold mt-10">We Only Have One Earth</h2>
            <div className="md:grid md:grid-cols-3 gap-3 text-center mt-10">
              <div>
                <TfiWorld
                  style={{ height: 140, width: 140, color: "#0092db" }}
                  className="text-center m-auto p-3"
                />
                <h2 className="font-bold text-2xl">Minimalistic</h2>
                <span>
                  One chip and power supply, less electronics, more performance
                </span>
              </div>
              <div>
                <img
                  className="m-auto mt-10 md:mt-0"
                  src={"/img/plc/Modular.png"}
                  alt="Modular"
                  height={140}
                  width={140}
                />
                <h2 className="font-bold text-2xl">Fully Modular</h2>
                <span>Only replace what is necessary</span>
              </div>
              <div>
                <RiPlantLine
                  style={{ height: 140, width: 140, color: "#1ED760" }}
                  className="text-center m-auto mt-10 md:mt-0"
                />
                <h2 className="font-bold text-2xl">Best Energy Efficiency</h2>
                <span>
                  Run data processing for a whole industrial plant of just one
                  small battery pack
                </span>
              </div>
            </div>
          </div>

          <div className="text-center max-w-2xl m-auto mt-24 lg:mt-32">
            <h2 className="text-4xl font-bold mt-10">Our Team</h2>
            <div className="md:grid md:grid-cols-3 text-center mt-10">
              <div>
                <div className="m-auto md:mt-0">
                  <img
                    className="m-auto md:mt-0"
                    src={"/img/plc/Leon.png"}
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
              <div>
                <div className="m-auto md:mt-0">
                  <img
                    className="m-auto md:mt-0"
                    src={"/img/plc/Leo.png"}
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
              <div>
                <div className="m-auto md:mt-0">
                  <img
                    className="m-auto md:mt-0"
                    src={"/img/plc/Ali.png"}
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

          <div className="text-center max-w-2xl m-auto mt-24 lg:mt-32">
            <h2 className="text-4xl font-bold mt-10">
              The Story Behind our Idea
            </h2>
            <div className="mt-10 text-lg">
              Our experience with other PLCs led to PLC One. We were tired of
              old IDEs and complex PLCs that cost a fortune. We thought about
              how we can make PLCs as simple as possible and created a
              revolutionary modular and environmentally friendly Controller. Our
              focus was to deliver the easiest solution starting from the
              purchase process all the way to installation and maintenance.
            </div>
          </div>

          <div className="mt-10 text-center text-sm">
            *Compared to a system that uses a Cyclone V FPGA with embedded ARM
            processor and RTOS which is similar to common PLCs, running a
            typical program with a cycle time of 100 ms. The FPGA in the PLC ONE
            needs less than 100 ns to process the data. Price includes only
            production costs of named examples.
          </div>
        </div>

      </main>
    </Layout>
  );
}
