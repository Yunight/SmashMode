import React,{useEffect} from "react";
import FightersBuild from "./Components/FightersBuild";
import ReactGA from "react-ga";  //Google Analytics


export default function SmashNOL() {

    useEffect(() => {
        ReactGA.initialize('UA-171288298-1');
        ReactGA.pageview(window.location.pathname);
    });


    return (
        <FightersBuild/>
    );


}
