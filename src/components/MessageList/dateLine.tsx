import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

interface LineState {}

interface LineProps {
  date: string;
}

export default class DateLine extends React.Component<LineProps, LineState> {
  static propTypes = {
    date: PropTypes.string,
  };

  render() {
    return (
      <div className="separator">
        <span>{this.props.date}</span>
      </div>
    );
  }
}