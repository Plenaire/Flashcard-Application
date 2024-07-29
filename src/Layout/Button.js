import React from "react";

export const Button = ({ children, danger, ...props }) => {
    const buttonClass = `btn ${danger ? "btn-danger" : "btn-primary"} mb-2 mr-2 mt-2 ${props.className}`;

    return (
        <button {...props} className={buttonClass}>
            {children}
        </button>
    );
};
