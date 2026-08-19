import { Link } from "react-router-dom";
import PortfolioV2Data from "../../../src/assets/jsonData/portfolio/PortfolioV2Data.json";

interface DataType {
    id?: number;
    text?: string;
    tag?: string;
    thumbFull?: string;
    date?: string;
}

interface Props {
    projectInfo?: DataType;
}

const PortfolioDetailsContent = ({ projectInfo }: Props) => {
    const { text, tag, id, thumbFull, date } = projectInfo || {};

    const total = PortfolioV2Data.length;
    const currentId = id ? parseInt(id.toString(), 10) : 1;
    const previousId = currentId === 1 ? total : currentId - 1;
    const nextId = currentId === total ? 1 : currentId + 1;

    const previousProject = PortfolioV2Data.find(p => p.id === previousId);
    const nextProject = PortfolioV2Data.find(p => p.id === nextId);

    const getFirstTwoWords = (t?: string) =>
        t?.split(" ").slice(0, 2).join(" ") || "No Title";

    return (
        <>
            {/* Hero Image */}
            <div className="project-details-items default-padding-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-details-thumb">
                                <img src={`/assets/img/portfolio/${thumbFull}`} alt={text} />
                            </div>
                        </div>
                        <div className="col-lg-10 offset-lg-1">
                            <div className="project-details-main-info">
                                <div className="project-single-tags">
                                    <Link to="#">{tag || "Design"}</Link>
                                </div>
                                <h2 className="title">{text}</h2>
                                <div className="project-author-details mt-35">
                                    <ul>
                                        <li>
                                            <div className="left-info"><h3>Category</h3></div>
                                            <div className="right-info"><h3>{tag}</h3></div>
                                        </li>
                                        <li>
                                            <div className="left-info"><h3>Date</h3></div>
                                            <div className="right-info"><h3>{date || "—"}</h3></div>
                                        </li>
                                        <li>
                                            <div className="left-info"><h3>Project Details</h3></div>
                                            <div className="right-info">
                                                <p>
                                                    Describe your project here. What was the brief, what problem
                                                    did you solve, and what was the outcome?
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Sections */}
            <div className="project-details-items bg-gray default-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="item-grid-container">
                                <div className="single-grid">
                                    <div className="item-grid-colum">
                                        <div className="left-info">
                                            <h3><strong>01</strong> Background</h3>
                                        </div>
                                        <div className="right-info">
                                            <p>
                                                Describe the background and context of this project.
                                                What was the starting point and what did the client need?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-grid">
                                    <div className="item-grid-colum">
                                        <div className="left-info">
                                            <h3><strong>02</strong> The Challenge</h3>
                                        </div>
                                        <div className="right-info">
                                            <p>
                                                What challenges did you face? What constraints shaped the work?
                                            </p>
                                            <ul className="list-disc">
                                                <li>Research and strategy</li>
                                                <li>Visual identity and branding</li>
                                                <li>Design execution</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-grid">
                                    <div className="item-grid-colum">
                                        <div className="left-info">
                                            <h3><strong>03</strong> The Solution</h3>
                                        </div>
                                        <div className="right-info">
                                            <p>
                                                Describe the solution you delivered and the final result.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prev / Next Navigation */}
            <div className="project-pagination default-padding-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-paginvation-items">
                                <div className="project-previous">
                                    <Link to={`/portfolio-details/${previousId}`}>
                                        <div className="icon"><i className="fas fa-angle-double-left" /></div>
                                        <div className="nav-title">
                                            Previous
                                            <h5>{getFirstTwoWords(previousProject?.text)}</h5>
                                        </div>
                                    </Link>
                                </div>
                                <div className="project-all">
                                    <Link to="/portfolio"><i className="fas fa-th-large" /></Link>
                                </div>
                                <div className="project-next">
                                    <Link to={`/portfolio-details/${nextId}`}>
                                        <div className="nav-title">
                                            Next
                                            <h5>{getFirstTwoWords(nextProject?.text)}</h5>
                                        </div>
                                        <div className="icon"><i className="fas fa-angle-double-right" /></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioDetailsContent;
