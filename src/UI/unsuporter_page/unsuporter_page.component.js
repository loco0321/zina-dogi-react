import React from 'react'
import chrome_logo from '../../assets/imgs/chrome.svg';
import firefox_logo from '../../assets/imgs/firefox.svg';
import edge_logo from '../../assets/imgs/edge.svg';

export default ({browser}) => {
    return (
        <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
                <div>
                    {`You are seeing this page because you are using unsupported browser ${
                        browser.name
                        } ${browser.version}.`}
                    <br />
                    {`Currently we suport the following browsers: `}
                    <br />
                    <br />
                    <ul className="list-group">
                        <li className="list-group-item">
                            <a href="https://www.google.com/chrome/">
                                <img
                                    src={chrome_logo}
                                    alt="chrome"
                                    width="32"
                                />{' '}
                                Google Chrome
                                        </a>
                        </li>
                        <li className="list-group-item">
                            <a href="https://www.mozilla.org/es-ES/firefox/new/">
                                <img
                                    src={firefox_logo}
                                    alt="firefox"
                                    width="32"
                                />{' '}
                                Firefox
                                        </a>
                        </li>
                        <li className="list-group-item">
                            <img
                                src={edge_logo}
                                alt="edge"
                                width="32"
                            />{' '}
                            Microsoft Edge
                                    </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
