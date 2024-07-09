import React, { useCallback, useEffect, useState } from "react";
import { get_most_lang, get_most_lang_svg } from "../api";
import Tooltip from '@mui/material/Tooltip';

import "./most-lang.css";
import "./error.css";

export const MostLanguage = () => {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        get_most_lang_svg().then((data) => {
            document.getElementById("svg_placeholder").innerHTML = data;
        }).catch((e) => console.log("failed to fetch most_lang_svg: " + e));
    }, []);

    useEffect(() => {
        get_most_lang().then((data) => {
            // document.getElementById("most_lang_desc").innerHTML = "";
            document.getElementById("most_lang_desc").style.opacity = 0;
            document.getElementById("most_lang_placeholder").innerHTML = Object.keys(data)[0];
            document.getElementById("most_lang_placeholder").style.opacity = 1.0
        }).catch((err) => {
            console.log("failed to fetch most lang: " + err)
            setError(true);
        });
    });

    if (error) {
        return (
        <Tooltip title="가장 자주 사용하는 언어를 표시하는데.. 에러가 발생헀어요.." followCursor>
            <div className="error-desc"/>;
        </Tooltip> 
        )
    } 

    return (
        <div className="most_lang">
            <Tooltip title="가장 자주 사용한 언어😎">
            <div id="svg_placeholder"></div>
            </Tooltip>
            <div className="most_lang_box">
                <div id="most_lang_desc">Most used language</div>
                <div id="most_lang_placeholder"></div>
            </div>
        </div>
    )
}

export const Top3Language = () => {
    const [error, setError] = useState(null);
    
    const [ top1Usage, setTop1Usage ] = useState([]);
    const [ top2Usage, setTop2Usage ] = useState([]);
    const [ top3Usage, setTop3Usage ] = useState([]);

    function easeOutQuad(t) {
        return 1 - Math.pow((1 - t), 4);
    }
    
    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' bytes';
    }
    
    const animateValue = useCallback((element, start, end, duration) =>  {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let progress = Math.min(timeElapsed / duration, 1);
            progress = easeOutQuad(progress);
            let value = Math.floor(start + (end - start) * progress);
            element.innerText = formatNumberWithCommas(value);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }, []);


    useEffect(() => {
        get_most_lang().then((data) => {
            const setUsage = [setTop1Usage, setTop2Usage, setTop3Usage];
            Object.entries(data).forEach(([k,v], i) => {
                document.getElementById(`top${i+1}`).children[0].innerHTML = k +': ';
                animateValue(document.getElementById(`top${i+1}`).children[1], 0, v['bytes'], 2000);
                setUsage[i](
                    [
                        v['biggest_project'], 
                        (v['bytes_of_the_biggest_project'] / v['bytes'] * 100).toFixed(2) + '%'
                    ]
                );
            })
        }).catch((err) => {
            console.log("failed to fetch most lang: " + err)
            setError(true)
        });
    }, [animateValue]);
    
    if (error) {
        return (
        <div className="h100">
            <div className="card_title text_align_left h0">Favorite Languages</div>
            <Tooltip title="언어 랭크를 표시하는데.. 에러가 발생헀어요.." followCursor>
                <div className="error-desc"/>;
            </Tooltip> 
        </div>
        )
    } 

    return (
        <div className="h100">
            <div className="card_title text_align_left">Favorite Languages</div>
            <div className="rank">
                <Tooltip title={"이 언어는 주로 " + top1Usage[0] + " 프로젝트에서 " + top1Usage[1] + " 만큼 사용하였습니다."} placement="right-start">
                <div id="top1">
                    <span className="lang_name"></span>
                    <span className="lang_used"></span>
                </div>
                </Tooltip>
                <Tooltip title={"이 언어는 주로 " + top2Usage[0] + " 프로젝트에서 " + top2Usage[1] + " 만큼 사용하였습니다."} placement="right-start">
                <div id="top2">
                    <span className="lang_name"></span>
                    <span className="lang_used"></span>
                </div>
                </Tooltip>
                <Tooltip title={"이 언어는 주로 " + top3Usage[0] + " 프로젝트에서 " + top3Usage[1] + " 만큼 사용하였습니다."} placement="right-start">
                <div id="top3">
                    <span className="lang_name"></span>
                    <span className="lang_used"></span>
                </div>
                </Tooltip>
                </div>
        </div>
    )
}

export default MostLanguage;