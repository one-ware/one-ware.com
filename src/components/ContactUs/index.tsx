import { CiLinkedin, CiMail } from "react-icons/ci";

export default function ContactUs(): JSX.Element {
  return (
    <div className="text-center max-w-4xl m-auto">
      <h2 className="text-3xl md:text-5xl font-bold mt-20">Interested? Contact us!</h2>

      <div className="grid grid-flow-col auto-cols-max mx-auto justify-center gap-5 text-7xl">
        <div>
          <a className="text-stone-50" href="https://www.linkedin.com/company/one-ware/" target="_blank">
            <CiLinkedin />
          </a>
        </div>
        <div>
          <a className="text-stone-50" href="/docs/contact">
            <CiMail />
          </a>
        </div>
      </div>
    </div>
  );
}
