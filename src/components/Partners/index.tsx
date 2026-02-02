export default function Partners(): JSX.Element {
  return (
    <div className="text-center max-w-2xl m-auto lg:mt-10">
      <h3 className="text-3xl mt-0 col">Our Partners</h3>
      <div className="md:grid md:grid-cols-4 text-center py-5 mb-5 gap-5">
        <div className="bg-white rounded-xl p-2 m-5 sm:m-1">
          <img
            className="m-auto md:mt-0"
            src={require('@site/static/img/Partner/Partner1.jpg').default}
            alt="EXIST"
          />
        </div>
        <div className="bg-white rounded-xl p-2 m-5 sm:m-1">
          <img
            className="m-auto md:mt-0"
            src={require('@site/static/img/Partner/Partner2.jpg').default}
            alt="European Union"
          />
        </div>
        <div className="bg-white rounded-xl p-2 m-5 sm:m-1">
          <img
            className="m-auto md:mt-0"
            src={require('@site/static/img/Partner/Partner3.jpg').default}
            alt="Bundesregierung für Wirtschaft und Klimaschutz"
          />
        </div>
        <div className="bg-white rounded-xl p-2 m-5 sm:m-1">
          <img
            className="m-auto md:mt-0"
            src={require('@site/static/img/Partner/Partner4.jpg').default}
            alt="ESF"
          />
        </div>
      </div>
    </div>
  );
}
