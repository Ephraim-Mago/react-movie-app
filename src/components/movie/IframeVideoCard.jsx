export default function IframeVideoCard({ video, show, setShow }) {
    return (
        <>
            {show && (
                <div
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                    className="fixed top-0 left-0 w-full h-full flex items-center shadow-lg overflow-y-auto transition ease-in-out duration-150"
                >
                    <div className="container mx-auto lg:px-32 rounded-lg overflow-y-auto">
                        <div className="bg-gray-900 rounded">
                            <div className="flex justify-end pr-4 pt-2">
                                <button
                                    onClick={() => setShow(false)}
                                    className="text-3xl leading-none hover:text-gray-300"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body px-8 py-8">
                                <div
                                    className="responsive-container overflow-hidden relative"
                                    style={{
                                        paddingTop: "56.25%",
                                    }}
                                >
                                    <iframe
                                        width="560"
                                        height="315"
                                        className="responsive-iframe absolute top-0 left-0 w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.key}`}
                                        style={{
                                            border: 0,
                                        }}
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen={true}
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
