import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import HeaderV5 from "../../components/header/HeaderV5";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json";
import ThemeDark from "../../components/switcher/ThemeDark";

interface PortfolioItem {
    id: number;
    thumb: string;
    title: string;
    tag: string;
    thumbFull?: string;
}

const CategoryDetailsPage = () => {
    const { category } = useParams<{ category: string }>();

    // Filter projects by category
    const filteredProjects = useMemo(() => {
        if (!category) return [];
        const decodedCategory = decodeURIComponent(category);
        return (PortfolioV4Data as PortfolioItem[]).filter(item => item.tag === decodedCategory);
    }, [category]);

    const categoryTitle = category ? decodeURIComponent(category) : '';

    return (
        <>
            <Helmet>
                <title>Dixor - {categoryTitle} Projects</title>
            </Helmet>

            <HeaderV5 />
            <Breadcrumb 
                title={`${categoryTitle} Projects`} 
                breadCrumb={`Portfolio / ${categoryTitle}`} 
            />
            
            <div className="portfolio-grid-area default-padding">
                <div className="container-full no-gap">
                    <div className="row">
                        <div className="col-lg-12">
                            {filteredProjects.length > 0 ? (
                                <div className="grid-gallery-style-two">
                                    {filteredProjects.map((project, index) => (
                                        <div 
                                            key={project.id} 
                                            className={`grid-item ${index % 2 === 0 ? 'grid-item-large' : ''}`}
                                        >
                                            <div className="portfolio-style-four">
                                                <div className="thumb">
                                                    <img 
                                                        src={`/assets/img/portfolio/${project.thumb}`} 
                                                        alt={project.title} 
                                                        width={700} 
                                                        height={600} 
                                                    />
                                                    <div className="content">
                                                        <span>{project.tag}</span>
                                                        <h2>{project.title}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <h3 style={{ color: '#999' }}>No projects found in the {categoryTitle} category.</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default CategoryDetailsPage;
