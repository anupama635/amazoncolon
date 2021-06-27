import React from 'react';
import "./Home.css";
import Product from './Product';

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <img
                    className="home__image"
                    src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220.jpg"
                    alt=""
                />

                <div className="home__row">
                    <Product
                        id='12345'
                        title="the lean startup"
                        price={29.99}
                        image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
                        rating={5} />
                    <Product
                        id="12354"
                        title="kenwood KMix Stand Mixer for baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Wishl, 5 Liter Glass Bowl "
                        price={239.0 }
                        image="data:image/jpeg;base64,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"
                        rating={4}
                    />
                </div>

                <div className="home__row">
                <Product
                        id="123546"
                        title="Smasung LC49RG90SSUXEN 49 Curved LED Gaming Montior "
                        price={199.99 }
                        image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SY466_.jpg"
                        rating={3}
                    />
                  <Product
                        id="1235455"
                        title=" Amazon Echo (3rd Generation) | Smart speaker with Alexa, Charcoal Fabric"
                        price={98.99 }
                        image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex25 "
                        rating={5}
                    />
                  <Product
                        id="1235466"
                        title=" New Apple iPad Pro (12.9-inch, WiFi, 128GB) - Silver (4th Generation)"
                        price={598.99 }
                        image=" https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SY385_.jpg"
                        rating={4}
                    />

                </div>
                <div className="home__row">

                <Product
                      id="1234567"
                      title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440 "
                      price={1094.98}
                      image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
                    />

                </div>
            </div>
        </div>
    )
}

export default Home
