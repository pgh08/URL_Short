import React from "react";

export default function RenderArrayofOjects(props) {

    return (
        <div className="container-short">
            <div id="shortned-show">
                <p className="container">{props.shortURL}</p>
                <button type="button" class="btn btn-outline-primary mr-5">Primary</button>

            </div>
            <div data-bs-theme="dark">
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
        </div>
    );
}