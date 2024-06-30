import { useEffect, useState } from "react";
import { get_most_lang, get_most_lang_svg } from "../api";

import "./most-lang.css";

const MostLanguage = () => {
    const [languageSVG, setLanguageSVG] = useState(null);

    useEffect(() => {
        get_most_lang_svg().then((data) => {
            document.getElementById("svg_placeholder").innerHTML = data;
        });
    }, []);

    useEffect(() => {
        get_most_lang().then((data) => {
            document.getElementById("most_lang_desc").innerHTML = "";
            document.getElementById("most_lang_placeholder").innerHTML = Object.keys(data)[0];
        });
    });

    return (
        <div className="h100">
            <div id="svg_placeholder"></div>
            <div id="most_lang_desc">Most used language</div>
            <div id="most_lang_placeholder"></div>
        </div>
    )
}

export default MostLanguage;