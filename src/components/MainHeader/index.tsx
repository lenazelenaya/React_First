import React from "react";

interface HeaderState {}

interface HeaderProps {
  name: string,
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <header className="header">
        <span>{this.props.name}</span>
      </header>
    );
  }
}
