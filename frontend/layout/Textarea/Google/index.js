import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleWrapper, TextareaField, Label } from './styles';

export default class Google extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    label: PropTypes.string,
    gridArea: PropTypes.string,
    style: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      labelFocus: false,
      textareaFocus: false,
    };
  }

  onFocus = () => {
    this.textarea.focus();

    this.setState({ labelFocus: true, textareaFocus: true });
  };

  onBlur = () => {
    const { value } = this.props;

    if (value.length > 0) {
      this.setState({ labelFocus: true, textareaFocus: false });
    } else {
      this.setState({ labelFocus: false, textareaFocus: false });
    }
  };

  render() {
    const { labelFocus, textareaFocus } = this.state;
    const {
      style,
      gridArea,
      placeholder,
      label,
      value,
      handleChange,
    } = this.props;

    return (
      <GoogleWrapper
        style={style}
        // funkcje:
        onClick={this.onFocus}
        // styled-components:
        textareaFocus={textareaFocus}
        gridArea={gridArea}
        focus={labelFocus}
      >
        <TextareaField
          // funkcje:
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          onChange={handleChange}
          // textarea:
          ref={textarea => (this.textarea = textarea)}
          value={value}
          textareaFocus={textareaFocus}
          placeholder={placeholder}
        />

        <Label labelFocus={labelFocus} textareaFocus={textareaFocus}>
          {label}
        </Label>
      </GoogleWrapper>
    );
  }
}
