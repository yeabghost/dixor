import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import HeaderV5 from "../../components/header/HeaderV5";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json";
import ThemeDark from "../../components/switcher/ThemeDark";
import "../../styles/category-grid.css";

interface PortfolioItem {
    id: number;
    thumb: string;
    title: string;
    tag: string;
    date?: string;
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
            
            <div className="category-portfolio-section">
                <div className="container-full">
                    {filteredProjects.length > 0 ? (
                        <div className="category-grid">
                            {filteredProjects.map((project) => (
                                <div key={project.id} className="category-grid-item">
                                    <div className="category-card">
                                        <div className="category-card-image">
                                            <img 
                                                src={`/assets/img/portfolio/${project.thumb}`} 
                                                alt={project.title} 
                                                width={700} 
                                                height={600} 
                                            />
                                        </div>
                                        <div className="category-card-content">
                                            <div className="card-meta">
                                                <span className="category-badge">{project.tag}</span>
                                                {project.date && <span className="card-date">{project.date}</span>}
                                            </div>
                                            <h3 className="card-title">{project.title}</h3>
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

            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default CategoryDetailsPage;
