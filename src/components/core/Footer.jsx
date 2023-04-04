export default function Footer() {
    return (
        <>
            <footer className="top pt-5">
                <div>
                    <i className="fa fa-film fa-2x me-1"></i>
                    <span className="font-bold">MovieApp</span>
                </div>
                <div className="links">
                    {/* <div>
                        <h2 className="font-bold">Links</h2>
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div> */}
                </div>
            </footer>

            <footer className="bottom">
                <div className="legal">
                    <span>&copy; 2023 Anonyma Digital. All rights reserved </span>
                    <a href="#">License </a>
                </div>
                <div className="links">
                    <a href="#" className="hover:text-orange-500">
                        <i className="fa fa-github"></i>
                    </a>
                    <a href="#" className="hover:text-orange-500">
                        <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="#" className="hover:text-orange-500">
                        <i className="fa fa-cloud"></i>
                    </a>
                </div>
            </footer>
        </>
    );
}
