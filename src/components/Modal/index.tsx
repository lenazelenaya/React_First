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

export default class EditModal extends React.Component<ModalProps, ModalState> {
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
    this.setText = this.setText.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }

  setText(text: string) {
    this.setState({ text });
  }

  handleEditClick() {
    this.setText("");
    this.props.toggle();
    this.props.editMessage(this.props.message, this.state.text);
  }

  handleTyping(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ text: event.currentTarget.value });
  }

  render() {
    let text = this.state.text;
    return (
      <div className="modal-layer">
        <div className="modal-root">
          <div className="modal-header">
            <span>Edit Message</span>
          </div>
          <div className="modal-body">
            <div className="edit-form">
              <input
                type="text"
                className="edit-text-area"
                value={text}
                onChange={() => this.handleTyping}
              />
              <button className="edit-btn" onClick={this.handleEditClick}>
                Edit
              </button>
              <button className="cancel-btn" onClick={() => this.props.toggle()}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
