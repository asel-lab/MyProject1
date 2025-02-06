import { Link, Outlet } from "react-router-dom";
const Layout = () => {
    return (
        <>
            <header className="bg-dark text-white">
                <Link to="/">Home</Link>
                <Link to="/workers">Workers</Link>
                <Link to="/edu">Education</Link>
                <Link to="/about">About</Link>
            </header>
            <main className="conteiner">
                <Outlet />
            </main>

            <footer>2025</footer>
        </>
    );
};

export { Layout };