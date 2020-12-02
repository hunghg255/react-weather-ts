import React, { Component } from "react";

import Desktop from "../components/city/Desktop";
import { connect } from "react-redux";
import { fetchWeather } from "../actions/ajaxActions";

// match.params.city is URL (react-router) variable
interface FormProps {
  fetchWeather: Function;
  match: {
    params: {
      city: string;
    };
  };
  weather: Record<string, any>;
}

interface FormState {
  imageSrc: string;
  random: number;
}

class City extends Component<FormProps, FormState> {
  constructor(props: any) {
    super(props);

    if (
      this.props.match.params.city !== "HaNoi" &&
      this.props.match.params.city !== "HoChiMinh" &&
      this.props.match.params.city !== "BacGiang"
    ) {
      window.location.replace("/404");
      return;
    }

    if (!Object.keys(this.props.weather).length) {
      // fetch from api, if city is accessed directly
      this.props.fetchWeather();
    }

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min)) + min;

    this.state = {
      imageSrc: "",
      random: randomInt(1, 3), // choose random photo from 2 available photos
    };
  }

  updateDimensions = () => {
    // change background photo for phone/desktop
    this.setState({
      imageSrc: require(`../assets/${
        window.innerWidth < 768 ? "p" : "d"
      }_${this.props.match.params.city.toLowerCase()}${this.state.random}.jpeg`).default,
    });
  };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  render() {
    return (
      <div
        className="h-screen w-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${this.state.imageSrc})`,
        }}
      >
        <Desktop
          city={this.props.match.params.city}
          info={this.props.weather[this.props.match.params.city]}
        />
      </div>
    );
  }
}

const mstp = (state: { weatherReducer: { weather: {} } }) => ({
  weather: state.weatherReducer.weather,
});

export default connect(mstp, { fetchWeather })(City);
