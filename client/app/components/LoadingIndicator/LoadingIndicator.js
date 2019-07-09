import React from 'react';
import './style.scss';

const LoadingIndicator = () => (
        <div className="loadoverlay">
            <div className="cont">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
);

export default LoadingIndicator;
