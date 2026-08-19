import { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Navigation, FreeMode } from 'swiper/modules';
import PortfolioV4Data from '../../../src/assets/jsonData/portfolio/PortfolioV4Data.json';
import SinglePortfolioV4 from './SinglePortfolioV4';
import SplitText from "../animation/SplitText.jsx"

interface DataType {
    sectionClass?: string;
    hasTitle?: boolean;
}

const PortfolioV4Filtered = ({ sectionClass, hasTitle }: DataType) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Get unique categories from data
    const categories = useMemo(() => {
        const cats = Array.from(new Set(PortfolioV4Data.map(item => item.tag)));
        return ['All', ...cats];
    }, []);

    // Filter data based on selected category
    const filteredData = useMemo(() => {
        if (selectedCategory === 'All') {
            return PortfolioV4Data;
        }
        return PortfolioV4Data.filter(item => item.tag === selectedCategory);
    }, [selectedCategory]);

    return (
        <>
            <div className={`portfolio-style-four-area default-padding-bottom ${sectionClass ? sectionClass : ""}`}>

                {/* Portfolio Title */}
                {hasTitle &&
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="site-heading">
                                    <h4 className="sub-title">Popular Projects</h4>
                                    <h2 className="title split-text">
                                        <SplitText
                                            delay={150}
                                            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                                            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                                            easing="easeOutCubic"
                                            threshold={0.2}
                                            rootMargin="-50px"
                                        >
                                            Featured Works
                                        </SplitText>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {/* Category Filter Buttons */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="portfolio-filter-buttons" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        style={{
                                            padding: '10px 20px',
                                            border: '2px solid',
                                            borderColor: selectedCategory === category ? '#ffa500' : '#ddd',
                                            backgroundColor: selectedCategory === category ? '#ffa500' : 'transparent',
                                            color: selectedCategory === category ? '#fff' : '#333',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-full no-gap">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-style-four-items">

                                {/* Navigation */}
                                <div className="project-four-nav">
                                    <div className="nav-items">
                                        <div className="project-center-button-prev" />
                                        <div className="project-center-button-next" />
                                    </div>
                                </div>

                                {filteredData.length > 0 ? (
                                    <Swiper className="project-center-stage-carousel swiper"
                                        loop={filteredData.length > 2}
                                        freeMode={true}
                                        grabCursor={true}
                                        slidesPerView={1}
                                        centeredSlides={true}
                                        spaceBetween={30}
                                        autoplay={false}
                                        navigation={{
                                            nextEl: ".project-center-button-next",
                                            prevEl: ".project-center-button-prev",
                                        }}
                                        breakpoints={{
                                            991: {
                                                slidesPerView: 2,
                                                spaceBetween: 30,
                                                centeredSlides: false
                                            },
                                            1200: {
                                                slidesPerView: 2.5,
                                                spaceBetween: 60
                                            },
                                            1800: {
                                                slidesPerView: 2.8,
                                                spaceBetween: 80
                                            },
                                        }}
                                        modules={[Navigation, FreeMode, Keyboard]}
                                    >
                                        <div className="swiper-wrapper">
                                            {filteredData.map(portfolio =>
                                                <SwiperSlide key={portfolio.id}>
                                                    <SinglePortfolioV4 portfolio={portfolio} />
                                                </SwiperSlide>
                                            )}
                                        </div>
                                    </Swiper>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                        <p>No projects found in this category.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioV4Filtered;
