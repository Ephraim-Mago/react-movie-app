import { useEffect, useState } from "react";

export default function ImageView({ image, onCloseClick }) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        onCloseClick("");
        setShow(false);
    };

    useEffect(() => {
        if (image != "") {
            setShow(true);
        }
    }, [image]);

    return (
        <>
            {show && image && (
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
                                    onClick={handleClose}
                                    className="text-3xl leading-none hover:text-gray-300"
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body px-8 py-8">
                                {image == "" ? (
                                    <p>Image not found</p>
                                ) : (
                                    <img
                                        onClick={handleClose}
                                        src={`https://image.tmdb.org/t/p/original/${image}`}
                                        alt="poster"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
