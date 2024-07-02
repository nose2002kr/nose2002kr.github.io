import React, { useEffect } from "react";
import { get_most_lang, get_most_lang_svg } from "../api";

import "./most-lang.css";

export const MostLanguage = () => {
    useEffect(() => {
        get_most_lang_svg().then((data) => {
            document.getElementById("svg_placeholder").innerHTML = data;
        });
    }, []);

    useEffect(() => {
        get_most_lang().then((data) => {
            document.getElementById("most_lang_desc").innerHTML = "";
            document.getElementById("most_lang_desc").style.display = "none";
            document.getElementById("most_lang_placeholder").innerHTML = Object.keys(data)[0];
            document.getElementById("most_lang_placeholder").style.display = "block";
            
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

export const Top3Language = () => {
    useEffect(() => {
        get_most_lang().then((data) => {
            
            Object.entries(data).forEach(([k,v], i) => {
                console.log("The key: ", k)
                console.log("The value: ", v)
                console.log("index: ", i)
                document.getElementById(`top${i+1}`).children[0].innerHTML = k +': ';
                //document.getElementById(`top${i+1}`).children[1].innerHTML = v;
                document.getElementById(`top${i+1}`).children[1].style.setProperty('--num', v);
            })
        });
    }, []);

    return (
        <div className="h100">
            <div className="card_title text_align_left">Favorite Languages</div>
            <div className="text_align_left">
                <div id="top1">
                    <span className="lang_name"></span>
                    <span className="lang_used"></span>
                </div>
                <div id="top2">
                    <span className="lang_name"></span>
                    <span className="lang_used"></span>
                </div>
                <div id="top3">
                    <span className="lang_name"></span>
                    <span className="lang_used"></span>
                </div>
            </div>
        </div>
    )
}

export default MostLanguage;