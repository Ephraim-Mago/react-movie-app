import { Link } from "react-router-dom";

export default function RouteNotFound() {
    return (
        <main>
            <div className="container">
                <div className="flex justify-center py-28">
                    <div className="text-center mt-4">
                        <img
                            className="mb-4"
                            src="https://startbootstrap.github.io/startbootstrap-sb-admin/assets/img/error-404-monochrome.svg"
                        />
                        <p className="text-sm">
                            Cette URL demandée est introuvable sur ce serveur.
                        </p>
                        <Link to="/">
                            <i className="fa fa-arrow-left me-1"></i>
                            Retourner à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
