import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json";
import SinglePortfolioV4NoLink from "../../components/portfolio/SinglePortfolioV4NoLink";
import ThemeDark from "../../components/switcher/ThemeDark";

const CategoryDetailsPage = () => {
    const { category } = useParams<{ category: string }>();

    // Filter projects by category
    const filteredProjects = useMemo(() => {
        if (!category) return [];
        const decodedCategory = decodeURIComponent(category);
        console.log('Filtering for category:', decodedCategory); // Debug log
        return PortfolioV4Data.filter(item => {
            console.log('Comparing:', item.tag, '===', decodedCategory, '=', item.tag === decodedCategory);
            return item.tag === decodedCategory;
        });
    }, [category]);

    return (
        <>
            <Helmet>
                <title>Dixor - {category}</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb title={`${decodeURIComponent(category || '')} Projects`} breadCrumb={category || 'projects'} />
                
                <div className="portfolio-grid-area default-padding">
                    <div className="container">
                        <div className="row">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map(project => (
                                    <div key={project.id} className="col-lg-4 col-md-6 col-sm-12">
                                        <SinglePortfolioV4NoLink portfolio={project} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                        No projects found in this category. (Filtered for: {decodeURIComponent(category || '')})
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DarkClass />
                <ThemeDark />
            </LayoutV1>
        </>
    );
};

export default CategoryDetailsPage;
