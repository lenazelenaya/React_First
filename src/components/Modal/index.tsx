import React from "react";
import PropTypes from "prop-types";

import "./index.css";
import Message from "../../types/message";

interface ModalProps {
  message: Message;
  toggle: Function;
  editMessage: Function;
}

interface ModalState {
  text: string;
}

export default class Modal extends React.Component<ModalProps, ModalState> {
  static propTypes = {
    message: PropTypes.object,
    toggle: PropTypes.func,
    editMessage: PropTypes.func,
  };
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      text: this.props.message.text,
    };
  }

  setText(text: string){
      this.setState({ text });
  }

  handleEditClick() {
    this.setText("");
    this.props.toggle();
    this.props.editMessage(this.props.message, this.state.text);
  }

  render() {
    return (
      <div className="modal-layer">
        <div className="modal-root">
          <div className="modal-header">
            <span>Edit Message</span>
            <div className="close-btn" onClick={this.props.toggle()}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
          <div className="modal-body">
            <div className="edit-form">
              <input
                type="text"
                className="edit-text-area"
                value={this.state.text}
                onChange={(event) => this.setText(event.target.value)}
              />
              <button className="edit-btn" onClick={this.handleEditClick}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
