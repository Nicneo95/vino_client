import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  return (
    <React.Fragment>
      <div className="sliderBox">
        <Carousel>
          <Carousel.Item interval={10000}>
            <img
              className="d-block w-100"
              src={require("../assets/images/slider_3.jpeg")}
              style={{ height: "80vh"}}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>The wine club</h3>
              <p>Merge your story with ours by becoming part of Vino Community.
                 <br></br>Connect with fellow Singaporean wine lovers while 
                 <br></br>experiencing our premium products.</p>
              <button type="button" className="btn"> SHOP NOW </button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={18000}>
            <img
              className="d-block w-100"
              src={require("../assets/images/slider_2.jpeg")}
              style={{ height: "80vh"}}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Welcome to our definition of tradition.</h3>
              <p>With every extraordinary bottle in our portfolio, we invite you to become a part <br></br> of the ongoing history and heritage of Vino Wine.</p>
              <button type="button" className="btn"> SHOP NOW </button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={require("../assets/images/slider_1.jpeg")}
              style={{ height: "80vh"}}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Good Pairs Days</h3>
              <p>Discover wines, paired to your taste, delivered to your door</p>
              <button type="button" className="btn"> SHOP NOW </button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </React.Fragment>
  );
}
