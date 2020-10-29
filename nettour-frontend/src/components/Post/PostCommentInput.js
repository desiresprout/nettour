import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import {
  Postcomment_inputcss,
  Button_wrapperCss,
  Button_commentCss,
} from "css/PostComments";

class PostCommentInput extends Component {
  static defaultProps = {
    showCancel: false,
    onCancel: () => null,
    defaultValue: "댓글을 입력하세요",
  };

  state = {
    input: "",
    focused: false,
    waiting: false,
  };

  constructor(props) {
    super(props);
    if (props.defaultValue) {
      this.state.input = props.defaultValue;
    }
  }

  onFocus = () => {
    this.setState({
      focused: true,
    });
  };

  onBlur = () => {
    this.setState({
      focused: false,
    });
  };

  onChange = e => {
    this.setState({
      input: e.target.value,
    });
  };

  onWriteButtonClick = async () => {
    const { onWriteComment } = this.props;
    const { input } = this.state;

    try {
      this.setState({
        input: "",
      });
      if (this.props.onCancel) {
        this.props.onCancel();
      }
      await onWriteComment(input);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { WriteComment, showCancel, onCancel, editing } = this.props;
    const { focused, input, waiting } = this.state;

    return (
      <Postcomment_inputcss className="PostCommentInput">
        <TextareaAutosize
          rows={focused || input !== "" ? 3 : 1}
          maxRows={20}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={input}
        />
        <Button_wrapperCss className="button_wrapper">
          <Button_commentCss edit onClick={this.onWriteButtonClick}>
            {editing ? "댓글수정하기" : "댓글작성"}
          </Button_commentCss>
          {showCancel && (
            <Button_commentCss cancel onMouseDown={onCancel}>
              취소
            </Button_commentCss>
          )}
        </Button_wrapperCss>
      </Postcomment_inputcss>
    );
  }
}

export default PostCommentInput;
