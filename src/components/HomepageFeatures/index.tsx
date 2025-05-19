import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    Svg: null, //require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    Svg: null,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: "Powered by React",
    Svg: null,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center"></div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={`${styles.features} container my-20`}>
      <div className="grid md:grid-cols-2 my-20 md:my-10 bottomsplit pb-20">
        <div data-aos="fade-left" className="md:px-10">
          <img src={require('@site/static/img/ai/Capture.png').default} />
        </div>

        <div
          className="md:p-5 flex-col flex gap-1 justify-center relative"
          data-aos="fade-right"
        >
          <span className="text-3xl text-center md:text-left">
            <h2 className="primary-text text-4xl">ONE AI</h2>
            <p className="mb-5">
            See how ONE AI creates custom neural networks in seconds that fit your exact Hardware, performance and use case requirements.
            </p>
            
          </span>

          <div>
            <Link
              className="button button--primary button--outline button--lg w-full md:w-fit"
              href="/one-ai"
            >
              ONE AI
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 md:my-10 md:pt-10">        <div className="p-5 md:order-2" data-aos="fade-right">
          <img src={require('@site/static/img/studio/slides2/simulator.png').default} />
        </div>

        <div
          className="md:p-5 flex-col flex gap-1 justify-center relative"
          data-aos="fade-left"
        >
          <span className="text-3xl text-center md:text-left">
            <h2 className="primary-text text-4xl">ONE WARE Studio</h2>
            <p className="mb-5">
              See how to integrate AI in your embedded systems and speed up the
              development with ONE WARE Studio
            </p>
          </span>

          <div>
            <Link
              className="button button--primary button--outline button--lg w-full md:w-fit"
              href="/studio"
            >
              ONE WARE Studio
            </Link>
          </div>
        </div>
      </div>

      {/* 
      <div className="grid md:grid-cols-2 mt-10 md:mt-10">        <div className="p-5 md:order-2" data-aos="fade-left">
          <img src={require('@site/static/img/start/PLC_Schrank.png').default} />
        </div>

        <div
          className="md:p-5 flex-col flex gap-1 justify-center relative"
          data-aos="fade-right"
        >          <div className="absolute top-5 left-0 -rotate-12 hidden xl:block">
            <img src={require('@site/static/img/start/drone_transparent.png').default} width={200} />
          </div>

          <span className="text-3xl text-center md:text-left">
            See how to get started with custom electronics for
            the <span className="font-bold primary-text">Industry 5.0</span>
            <p className="flex flex-row text-center justify-center md:justify-normal">
              with{" "}
              <img
                height={37}
                className="ml-2"
                src={require('@site/static/img/start/PLC_One_Logo.png').default}
              />
            </p>
          </span>

          <div>
            <Link
              className="button button--primary button--outline button--lg w-full md:w-fit"
              href="/plc-one"
            >
              Our Hardware Solutions
            </Link>
          </div>
        </div>
      </div> */}
    </section>
  );
}
