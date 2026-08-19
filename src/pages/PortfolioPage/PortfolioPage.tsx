import { Helmet } from "react-helmet-async";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import DarkClass from "../../components/classes/DarkClass";
import LayoutV1 from "../../components/layouts/LayoutV1";
import PortfolioV2 from "../../components/portfolio/PortfolioV2";
import ThemeDark from "../../components/switcher/ThemeDark";

const PortfolioPage = () => {
    return (
        <>
            <Helmet>
                <title>Portfolio</title>
            </Helmet>
            <LayoutV1>
                <Breadcrumb title="Our Work" breadCrumb="Portfolio" />
                <PortfolioV2 moreBtn={true} sectionClass="default-padding-bottom" />
            </LayoutV1>
            <DarkClass />
            <ThemeDark />
        </>
    );
};

export default PortfolioPage;