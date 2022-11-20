import React from 'react';
import { useRouteError } from 'react-router-dom';

const DisplayError = () => {
    const error = useRouteError();
    // const {}

    return (
        <div>
            <p>Something went wrong</p>
            <p>{error.statusText || error.message}</p>
        </div>
    );
};

export default DisplayError;