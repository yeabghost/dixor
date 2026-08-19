import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PortfolioDetailsContent from "../../components/portfolio/PortfolioDetailsContent";
import ThemeDark from "../../components/switcher/ThemeDark";
import PortfolioV2Data from "../../../src/assets/jsonData/portfolio/PortfolioV2Data.json";

const PortfolioDetailsPage = () => {
    const { id } = useParams();
    const projectInfo = PortfolioV2Data.find(p => p.id === parseInt(id || "1", 10));

    return (
        <>
            <Helmet>
                <title>{projectInfo?.text || "Portfolio Details"}</title>
            </Helmet>
            <LayoutV1>
                <Breadcrumb
                    title={projectInfo?.text || "Project Details"}
                    breadCrumb="Portfolio Details"
                />
                <PortfolioDetailsContent projectInfo={projectInfo} />
            </LayoutV1>
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default PortfolioDetailsPage;
