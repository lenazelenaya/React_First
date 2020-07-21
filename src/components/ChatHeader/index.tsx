import React from "react";
import PropTypes from "prop-types";

interface headerState {}

interface headerProps {
    name: string;
    participants: number;
    messages: number;
    lastMessage: string;
}

class ChatHeader extends React.Component<headerProps, headerState>{
    static prop ={
        name: PropTypes.string,
        participants: PropTypes.number,
        messages: PropTypes.number,
        lastMessage: PropTypes.string,
    };

    render(){
        return(
            <div className="chat-header">
                <div>
                    {this.props.name}
                </div>
                <div>
                    <span>participants: {this.props.participants}</span>
                </div>
                <div>
                    <span>messages: {this.props.messages}</span>
                </div>
                <div>
                    <span>LastMessage at: {this.props.lastMessage}</span>
                </div>
            </div>
        );
    }
}