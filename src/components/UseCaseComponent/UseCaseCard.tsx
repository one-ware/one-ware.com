import useBaseUrl from "@docusaurus/useBaseUrl";
import Translate from "@docusaurus/Translate";

export default function UseCaseCard(props) {

    let isActive : boolean = props.isActive;
    let useCase = props.data;

    return (
        <div
            className={`relative w-full rounded-2xl transition-all duration-500 ease-in-out transform ${isActive ? 'scale-100' : 'scale-90 opacity-60'}`}
            style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%), url(${useBaseUrl(useCase.image)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* ... der innere Content der Slide bleibt unverändert ... */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-12 min-h-[550px] md:min-h-[500px] flex flex-col justify-between bg-gray-900/20 rounded-2xl border border-white/10">

                {/* Content Wrapper für Desktop Layout */}
                <div className="flex flex-col lg:flex-row lg:gap-8">

                    {/* Text Section - links auf Desktop */}
                    <div className="text-left lg:flex-1 lg:max-w-[60%]">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold primary-text mb-2">
                            <Translate id={useCase.titleId}>
                                {useCase.title}
                            </Translate>
                        </h3>
                        <h4 className="text-lg sm:text-xl lg:text-2xl text-gray-300 font-medium mb-4">
                            <Translate id={useCase.subtitleId}>
                                {useCase.subtitle}
                            </Translate>
                        </h4>
                        <p className="text-base sm:text-lg text-gray-200 leading-relaxed mb-6">
                            <Translate id={useCase.descriptionId}>
                                {useCase.description}
                            </Translate>
                        </p>
                    </div>

                    {/* Metrics & Button Section - rechts auf Desktop */}
                    <div className="lg:flex-shrink-0 lg:w-[40%] flex flex-col justify-end">
                        <div className="flex flex-col gap-4">
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-2 w-full">
                                {useCase.metrics.map((metric, metricIdx) => (
                                    <div key={metricIdx} className="p-3 bg-black/40 border border-white/10 rounded-lg text-center">
                                        <h5 className="text-xl sm:text-2xl font-bold primary-text">
                                            {metric.value}
                                        </h5>
                                        <p className="text-sm sm:text-base text-gray-300">
                                            <Translate id={metric.labelId}>
                                                {metric.label}
                                            </Translate>
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Button */}
                            <a
                                href={useCase.whitepaper}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-[#00FFD1] text-black font-bold rounded-lg hover:bg-[#00e4ba] transition-all duration-300 transform hover:scale-105 text-sm lg:text-base w-full justify-center shrink-0"
                            >
                                <Translate id={useCase.linkTextId}>
                                    {useCase.linkText}
                                </Translate>
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Use Cases - Unten über die gesamte Breite, ausgeblendet auf Mobile */}
                <div className="mt-6 pt-6 border-t border-white/10 hidden md:block">
                    <h6 className="text-xl font-semibold text-gray-300 mb-4 text-center lg:text-left">
                        <Translate id="homepage.related.title">
                            Related Use Cases:
                        </Translate>
                    </h6>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {useCase.relatedUseCases.map((related, relatedIdx) => (
                            <div key={relatedIdx} className="p-4 bg-[#00FFD1]/10 border border-[#00FFD1]/30 rounded-lg hover:bg-[#00FFD1]/20 transition-colors cursor-pointer text-center flex justify-center align-center">
                                <div className="font-semibold text-[#00FFD1] text-sm lg:text-base">
                                    <Translate id={related.titleId}>
                                        {related.title}
                                    </Translate>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>  
    );
}