import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
    return (
        <React.Fragment>
            {/* Page Footer */}
            <footer className="bg-light text-center text-black flex-shrink-0">
                {/* Grid container */}
                <div className="container p-4 pb-0">
                    {/* Section: Social media */}
                    <section className="mb-3">
                        {/* Email */}
                        <a className="btn btn-outline-dark border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-envelope-fill"></i></a>
                        {/* Linkedin */}
                        <a className="btn btn-outline-dark border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-linkedin"></i></a>
                        {/* Github */}
                        <a className="btn btn-outline-dark border-0 m-1" target="_blank" rel="noreferrer noopener"
                            href="" role="button"><i className="bi bi-github"></i></a>
                    </section>
                    {/* Section: Social media */}
                </div>
                {/* Grid container */}

                {/* Copyright */}
                <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    © {new Date().getFullYear()} Vino. For educational purpose only.
                </div>
                {/* Copyright */}
            </footer>
            {/* Page Footer */}
        </React.Fragment>
    )
}