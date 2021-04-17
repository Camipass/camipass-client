import React, {useEffect} from 'react';
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js';

export default function Home() {

    useEffect(() => {
        bulmaCarousel.attach('#homecarousel', {
            slidesToScroll: 1,
            slidesToShow: 1,
            autoplay: true,
            loop: true,
            duration: 1500,
            navigation: true,
            autoplaySpeed: 7000
        });
    });

    return (
        <div>
            <div className='carousel carousel-animated carousel-animate-slide'>
                <div className='carousel-container carouselhome' id="homecarousel">
                    <img className="item-1" src="img/slide1.png" alt=""/>
                    <img className="item-2" src="img/slide2.png" alt=""/>
                    <img className="item-3" src="img/slide3.png" alt=""/>
                    <img className="item-3" src="img/slide4.png" alt=""/>
                </div>
            </div>
        </div>
    );
}
