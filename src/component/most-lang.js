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
            // document.getElementById("most_lang_desc").innerHTML = "";
            document.getElementById("most_lang_desc").style.opacity = 0;
            document.getElementById("most_lang_placeholder").innerHTML = Object.keys(data)[0];
            document.getElementById("most_lang_placeholder").style.opacity = 1.0
            
        });
    });

    return (
        <div className="most_lang">
            <div id="svg_placeholder"></div>
            <div className="most_lang_box">
                <div id="most_lang_desc">Most used language</div>
                <div id="most_lang_placeholder"></div>
            </div>
        </div>
    )
}

export const Top3Language = () => {
    useEffect(() => {
        get_most_lang().then((data) => {
            
            Object.entries(data).forEach(([k,v], i) => {
                document.getElementById(`top${i+1}`).children[0].innerHTML = k +': ';
                animateValue(document.getElementById(`top${i+1}`).children[1], 0, v, 2000);
            })
        });
    }, []);

    function easeOutQuad(t) {
        return 1 - Math.pow((1 - t), 4);
    }
    
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' bytes';
    }
    
    function animateValue(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let progress = Math.min(timeElapsed / duration, 1);
            progress = easeOutQuad(progress);
            console.log(progress)
            let value = Math.floor(start + (end - start) * progress);
            console.log(value)
            element.innerText = formatNumberWithCommas(value);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }

    
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