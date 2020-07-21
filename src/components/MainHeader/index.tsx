import React from "react";

interface HeaderState {}

interface HeaderProps {}

export default class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <header className="header">
        <span>LOGO</span>
      </header>
    );
  }
}
