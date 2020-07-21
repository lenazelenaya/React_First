import React from "react";

interface IState {}

interface IProps {}

export default class Footer extends React.Component<IProps, IState> {
  render() {
    return (
      <footer className="footer">
        <span>© Powered by EZ for BSA homework</span>🚀
      </footer>
    );
  }
}
