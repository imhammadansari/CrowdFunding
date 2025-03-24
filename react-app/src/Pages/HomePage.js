import React from 'react';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import AboutUs from '../Components/AboutUs';
import WhyUs from '../Components/WhyUs';
import HowItWorks from '../Components/HowItWorks';
import Testimonials from '../Components/Testimonials';
import FAQs from '../Components/FAQs';

function App() {
    return (
        <div className="App">
            <Header />
            <Banner />
            <AboutUs />
            <WhyUs />
            <HowItWorks />
            <Testimonials />
            <FAQs />
        </div>
    );
}

export default App;