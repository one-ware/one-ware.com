export default function Partners(): JSX.Element {
  return (
    <div className="text-center max-w-2xl m-auto lg:mt-10">
      <h3 className="text-3xl mt-0 col">Our Partners</h3>
      <div className="md:grid md:grid-cols-4 text-center bg-white py-10 mb-5 whitebackgroundhack">
        <div>
          <img
            className="m-auto md:mt-0"
            src={"/img/Partner/Partner1.jpg"}
            alt="EXIST"
          />
        </div>
        <div>
          <img
            className="m-auto md:mt-0"
            src={"/img/Partner/Partner2.jpg"}
            alt="European Union"
          />
        </div>
        <div>
          <img
            className="m-auto md:mt-0"
            src={"/img/Partner/Partner3.jpg"}
            alt="Bundesregierung für Wirtschaft und Klimaschutz"
          />
        </div>
        <div>
          <img
            className="m-auto md:mt-0"
            src={"/img/Partner/Partner4.jpg"}
            alt="ESF"
          />
        </div>
      </div>
    </div>
  );
}
