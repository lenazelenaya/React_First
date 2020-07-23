import React from "react";
import "./index.css";

interface HeaderState {}

interface HeaderProps {
  name: string;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  shouldComponentUpdate(nextProps: HeaderProps) {
    if (nextProps.name === this.props.name) {
      return false;
    } else return true;
  }

  render() {
    return (
      <header className="header">
        <span>{this.props.name}</span>
      </header>
    );
  }
}
