import { useState } from 'react';
import PortfolioV5Data from '../../../src/assets/jsonData/portfolio/PortfolioV5Data.json';
import useUpDownScroll from '../../hooks/useUpDownScroll';
import SinglePortfolioV5 from './SinglePortfolioV5';
import shape2 from "/assets/img/shape/2.png";

interface DataType {
    hasShape?: boolean;
}

const INITIAL_COUNT = 4;
const LOAD_MORE_COUNT = 4;

const PortfolioV5 = ({ hasShape }: DataType) => {
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    useUpDownScroll(".upDownScrol");

    const visibleItems = PortfolioV5Data.slice(0, visibleCount);
    const hasMore = visibleCount < PortfolioV5Data.length;

    return (
        <div className="portfolio-style-five-area default-padding bg-gray">

            {hasShape && (
                <div className="upDownScrol">
                    <img src={shape2} alt="Image Not Found" />
                </div>
            )}

            <div className="container">
                <div className="portfolio-style-five-items title-animation">
                    <div className="title-fixed text-center">
                        <h2>Work</h2>
                    </div>
                    <div className="portfolio-style-five-items">
                        <div className="row gutter-xl">

                            {visibleItems.slice(0, 2).map(portfolio => (
                                <div className="col-lg-6 portfolio-style-five-item" key={portfolio.id}>
                                    <SinglePortfolioV5 portfolio={portfolio} />
                                </div>
                            ))}

                            {Array.from({ length: Math.ceil((visibleItems.length - 2) / 2) }).map((_, rowIndex) => (
                                <div className="col-lg-10 offset-lg-1" key={rowIndex}>
                                    <div className="row gutter-xl">
                                        {visibleItems.slice(2 + rowIndex * 2, 4 + rowIndex * 2).map(portfolio => (
                                            <div className="col-lg-6 portfolio-style-five-item" key={portfolio.id}>
                                                <SinglePortfolioV5 portfolio={portfolio} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>

                    {hasMore && (
                        <div className="row mt-40">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, PortfolioV5Data.length));
                                        }}
                                        className="btn-round-animation dark mt-80"
                                    >
                                        Load More
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PortfolioV5;