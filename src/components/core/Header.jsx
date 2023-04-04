import { NavLink } from "react-router-dom";
import SearchDropdown from "../search/SearchDropdown";

export default function Header() {
    const navigation = [
        { name: "Home", to: "/" },
        { name: "Movies", to: "/movies" },
        { name: "TV Shows", to: "/tv-shows" },
        { name: "Actors", to: "/actors" },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    return (
        <>
            <nav className="border-b border-gray-800">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6">
                    <ul className="flex flex-col md:flex-row items-center">
                        <li>
                            <NavLink to="/">
                                <i className="fa fa-film fa-2x me-1"></i>
                                <span className="font-bold">MovieApp</span>
                            </NavLink>
                        </li>
                        {navigation.map((item) => (
                            <li
                                key={item.name}
                                className="md:ml-16 mt-3 md:mt-0"
                            >
                                <NavLink
                                    to={item.to}
                                    // className="hover:text-gray-300 active:text-orange-500"
                                    className={({ isActive }) =>
                                        classNames(
                                            isActive
                                                ? "text-orange-500 font-semibold"
                                                : "text-white hover:text-gray-300"
                                        )
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col md:flex-row items-center">
                        <SearchDropdown />

                        <div className="md:ml-4 mt-3 md:mt-0">
                            <a href="#">
                                <i
                                    className="fa fa-user-circle rounded-full w-8 h-8"
                                    style={{ fontSize: "1.8rem" }}
                                ></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
