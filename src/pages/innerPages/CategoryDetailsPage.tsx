import { useParams, Navigate, Link } from "react-router-dom";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import ThemeDark from "../../components/switcher/ThemeDark";
import useLeftRightAnimation from "../../hooks/useLeftRightAnimation";
import PortfolioV4Data from "../../assets/jsonData/portfolio/PortfolioV4Data.json";

interface PortfolioItem {
    id: number;
    thumb: string;
    thumbFull?: string;
    title: string;
    tag: string;
    date?: string;
}

const SingleCard = ({ project }: { project: PortfolioItem }) => {
    const { thumb, thumbFull, tag, date, title } = project;
    const containerRef = useLeftRightAnimation();
    const fullImage = `/assets/img/portfolio/${thumbFull ?? thumb}`;
    const thumbImage = `/assets/img/portfolio/${thumb}`;

    return (
        <div className="col-lg-6 item-center">
            <div className="portfolio-style-two">
                <div className="cursor-target">
                    <PhotoView src={fullImage}>
                        <div className="thumb-zoom" style={{ cursor: "zoom-in" }}>
                            <img
                                className="img-reveal"
                                src={thumbImage}
                                width={826}
                                height={1067}
                                alt={title}
                                ref={containerRef}
                            />
                        </div>
                    </PhotoView>
                    <div className="pf-item-info">
                        <div className="content">
                            <div className="pf-tags">
                                <span>{tag}</span>
                                {date && <span>{date}</span>}
                            </div>
                            <h2>{title}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoryDetailsPage = () => {
    const { category } = useParams<{ category: string }>();

    const filteredProjects = useMemo(() => {
        if (!category) return [];
        const decoded = decodeURIComponent(category);
        return (PortfolioV4Data as PortfolioItem[]).filter(
            item => item.tag.toLowerCase() === decoded.toLowerCase()
        );
    }, [category]);

    if (!category) return <Navigate to="/portfolio" replace />;

    const categoryTitle = decodeURIComponent(category);

    return (
        <>
            <Helmet>
                <title>{categoryTitle} – Portfolio</title>
            </Helmet>
            <LayoutV1>
                <Breadcrumb
                    title={`${categoryTitle} Projects`}
                    breadCrumb={`Portfolio / ${categoryTitle}`}
                />
                <div className="portfolio-style-two-area overflow-hidden default-padding-bottom">
                    <div className="container mt--100 mt-xs--50">
                        <PhotoProvider
                            speed={() => 400}
                            easing={(type) =>
                                type === 2
                                    ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                                    : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                            }
                            toolbarRender={({ onScale, scale }) => (
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <svg
                                        onClick={() => onScale(scale + 0.5)}
                                        style={{ cursor: "pointer", width: 24, height: 24, fill: "#fff", opacity: 0.75 }}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zm.5-7H9v2H7v1h2v2h1v-2h2V9h-2z" />
                                    </svg>
                                    <svg
                                        onClick={() => onScale(scale - 0.5)}
                                        style={{ cursor: "pointer", width: 24, height: 24, fill: "#fff", opacity: 0.75 }}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
                                    </svg>
                                </div>
                            )}
                        >
                            {filteredProjects.length > 0 ? (
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row gutter-xl">
                                            {filteredProjects.map(project => (
                                                <SingleCard project={project} key={project.id} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                        <p style={{ color: "#999", padding: "60px 0" }}>
                                            No projects found in this category.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </PhotoProvider>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <Link to="/portfolio" className="btn-round-animation dark mt-80">
                                        Back to Portfolio
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutV1>
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default CategoryDetailsPage;