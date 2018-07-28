import React from 'react';
import { Input, Icon, Select } from 'antd';

class EditableCell extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: false,
      compType: this.props.compType,
      optionList: this.props.optionList || [],
      displayValue: (this.props && this.props.optionList && this.props.optionList.length > 0) ? (this.props.optionList.filter((item) => item.value === this.props.value))[0].label : ''
    }
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  handleSelect = (value) => {
    this.setState({ value: value, displayValue: (this.props.optionList.filter((item) => item.value === value))[0].label });
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange( value );
    }  
  } 
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable, compType, optionList, displayValue } = this.state;
    let comp = '';
    switch (compType) {
      case 'selection':
        comp = <Select defaultValue={value} style={{width: "80%"}} onSelect={this.handleSelect}>
                {optionList.map((option) => <Select.Option key={option.value} value={option.value}>{option.label}
              </Select.Option>)}</Select>;
        break;
      default:
        comp = (<div className="editable-cell"><div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div></div>);
    }
    return (
          editable ?
            comp
            :
          <div className="editable-cell">
            <div className="editable-cell-text-wrapper">
              {displayValue || value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
          </div>
    );
  }
}

export default EditableCell;
