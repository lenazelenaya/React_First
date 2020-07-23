import React from "react";

import "./index.css";

interface FooterState {}

interface FooterProps {}

export default class Footer extends React.Component<FooterProps, FooterState> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <footer className="footer">
        <span>© Powered by EZ for BSA homework</span>
      </footer>
    );
  }
}
