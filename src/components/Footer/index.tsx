import React from "react";

interface FooterState {}

interface FooterProps {}

export default class Footer extends React.Component<FooterProps, FooterState> {
  render() {
    return (
      <footer className="footer">
        <span>© Powered by EZ for BSA homework</span>🚀
      </footer>
    );
  }
}
