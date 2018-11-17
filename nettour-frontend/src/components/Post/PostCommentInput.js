import React, { Component } from 'react';
import TextareaAutosize from 'react-autosize-textarea';
import { Comment_InputCss, Button_wrapperCss } from 'css/PostComments';

class PostCommentInput extends Component {
  static defaultProps = {
    showCancel: false,
    onCancel: () => null,
    defaultValue: '댓글을 입력하세요',
  };

  state = {
    input: '',
    focused: false,
    waiting: false,
  };

  constructor(props: Props) {
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

  onChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  onWriteButtonClick = async () => {
    const { onWriteComment, replyTo } = this.props;
    const { input } = this.state;
    try {
      this.setState({
        input: '',
      });
      if (this.props.onCancel) {
        this.props.onCancel();
      }
      await onWriteComment(input, replyTo);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { showCancel, onCancel, editing } = this.props;
    const { focused, input, waiting } = this.state;

    return (
      <Comment_InputCss className="PostCommentInput">
        <TextareaAutosize
          rows={focused || input !== '' ? 4 : 1}
          maxRows={20}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          value={input}
        />
        <Button_wrapperCss className="button-wrapper">
          <button onClick={this.onWriteButtonClick}>
            {editing ? '수정하기' : '댓글 작성'}
          </button>
          {showCancel && (
            <button cancel onMouseDown={onCancel}>
              취소
            </button>
          )}
        </Button_wrapperCss>
      </Comment_InputCss>
    );
  }
}

export default PostCommentInput;