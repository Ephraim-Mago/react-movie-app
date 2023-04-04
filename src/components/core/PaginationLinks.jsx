export default function PaginationLinks({ meta, onPageClick, type = "" }) {
    const prev = () => {
        if (meta.page != 1) {
            type
                ? onPageClick(meta.page - 1, type)
                : onPageClick(meta.page - 1);
        }
    };
    const next = () => {
        if (meta.page < meta.total_pages) {
            type
                ? onPageClick(meta.page + 1, type)
                : onPageClick(meta.page + 1);
        }
    };

    return (
        <>
            <div className="flex justify-between py-10">
                <a
                    onClick={prev}
                    className={`cursor-pointer ${
                        meta.page == 1 ? "text-gray-400" : ""
                    }`}
                >
                    Previous
                </a>
                <a
                    onClick={next}
                    className={`cursor-pointer ${
                        meta.page == meta.total_pages ? "text-gray-400" : ""
                    }`}
                >
                    Next
                </a>
            </div>
        </>
    );
}
