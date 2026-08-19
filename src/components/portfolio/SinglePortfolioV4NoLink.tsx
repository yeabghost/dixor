interface DataType {
    id?: number;
    thumb?: string;
    title?: string;
    tag?: string;
}

const SinglePortfolioV4NoLink = ({ portfolio }: { portfolio: DataType }) => {
    const { thumb, tag, title } = portfolio

    return (
        <>
            <div className="portfolio-style-four">
                <div className="thumb">
                    <img src={`/assets/img/portfolio/${thumb}`} alt="Image Not Found" width={700} height={600} />
                    <div className="content">
                        <span>{tag}</span>
                        <h2>{title}</h2>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SinglePortfolioV4NoLink;
