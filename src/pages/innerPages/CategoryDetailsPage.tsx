import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import HeaderV5 from "../../components/header/HeaderV5";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json";
import SinglePortfolioV4NoLink from "../../components/portfolio/SinglePortfolioV4NoLink";
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
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="site-heading text-center" style={{ marginBottom: '50px' }}>
                                <h2 className="title">{categoryTitle}</h2>
                                <p>Explore our {categoryTitle.toLowerCase()} projects</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map(project => (
                                <div key={project.id} className="col-lg-4 col-md-6 col-sm-12" style={{ marginBottom: '40px' }}>
                                    <SinglePortfolioV4NoLink portfolio={project} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12">
                                <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                    No projects found in the {categoryTitle} category.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default CategoryDetailsPage;
