import React from "react";

export default function Footer() {
    const date = new Date().getFullYear();
    return(
        <div className="bottom">
            <div className="container">
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <div className="copy">
                            <p>&copy; {date} Coockbook. Made with <i className="fas fa-heart"></i> by Max&Maria
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ul className="bottom-nav">
                            <li><a href="/">Home</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms and Conditions</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}