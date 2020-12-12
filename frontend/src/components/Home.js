import React from "react";
import RecipeList from "./RecipeList";

export default function Home() {
    return(
        <>
        <div className="owl-carousel owl-theme">
            <div className="item">
                <img src="/images/carousel/slide_1.jpg" alt="slide 1"/>
                    <div className="caption">
                        {/*<h2 className="animated bounce">Our 10 Most Popular Recipes</h2>*/}
                        {/*<button className="btn btn-primary">EXPLORE NOW</button>*/}
                    </div>
            </div>
            <div className="item">
                <img src="/images/carousel/slide_2.jpg" alt="slide 2"/>
                    <div className="caption">
                        {/*<h2 className="animated bounce">Best Review Recipe 2019</h2>*/}
                        {/*<button className="btn btn-primary">READ MORE</button>*/}
                    </div>
            </div>
            <div className="item">
                <img src="/images/carousel/slide_3.jpg" alt="slide 3"/>
                    <div className="caption">
                        {/*<h2 className="animated bounce">Most Popular Homemade Recipes</h2>*/}
                        {/*<button className="btn btn-primary">EXPLORE NOW</button>*/}
                    </div>
            </div>
        </div>
            <RecipeList/>
            </>
    )
}