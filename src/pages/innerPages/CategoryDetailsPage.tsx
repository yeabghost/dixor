import { useParams } from "react-router-dom";
import { useMemo, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
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
    const { category } = useParams();
    const [filteredProjects, setFilteredProjects] = useState<PortfolioItem[]>([]);

    useEffect(() => {
        if (!category) {
            setFilteredProjects([]);
            return;
        }

        const decodedCategory = decodeURIComponent(category);
        console.log('Category from URL:', category);
        console.log('Decoded category:', decodedCategory);
        console.log('Available tags in data:', Array.from(new Set((PortfolioV4Data as PortfolioItem[]).map(item => item.tag))));

        const filtered = (PortfolioV4Data as PortfolioItem[]).filter(item => {
            const matches = item.tag === decodedCategory;
            if (!matches) {
                console.log(`"${item.tag}" !== "${decodedCategory}"`);
            }
            return matches;
        });

        console.log('Filtered results:', filtered);
        setFilteredProjects(filtered);
    }, [category]);

    return (
        <>
            <Helmet>
                <title>Dixor - {category}</title>
            </Helmet>

            <LayoutV1>
                <Breadcrumb 
                    title={`${decodeURIComponent(category || '')} Projects`} 
                    breadCrumb={category || 'projects'} 
                />
                
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
                                        No projects found in category: <strong>{decodeURIComponent(category || '')}</strong>
                                        <br />
                                        <small>Check console for debugging info</small>
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
