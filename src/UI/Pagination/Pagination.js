import React from 'react';
import Icon from '../icon/icon.component';
import { Field } from 'formik'

class paginator extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render() {
    if(this.inputRef.current){
      this.inputRef.current.value = this.props.actualPage;
    }
    return (
      <ul className="pagination">
        <li
          className="page-item"
          onClick={() => {
            this.props.previous && this.props.changePage(this.props.previous);
          }}
        >
          <a className="page-link">
            <Icon
              className={btnClass(this.props.previous)}
              icon='chevron-left'
            />
          </a>
        </li>
        <li className="page-item input">
          <React.Fragment>
            <input
              ref={this.inputRef}
              className="form-control paginator"
              type="text"
              onKeyPress={evt => {
                if (evt.key === 'Enter') {
                  let { value } = document.querySelector(
                    '.form-control.paginator'
                  );
                  if (!value || value === '') {
                    value = 1;
                  }
                  value > this.props.pages
                    ? this.props.changePage(this.props.pages)
                    : this.props.changePage(value);
                }
              }}
            />
          </React.Fragment>
        </li>
        <li className="page-item separator">of</li>
        <li className="page-item total">{this.props.pages}</li>
        <li
          className="page-item"
          onClick={() => {
            this.props.next && this.props.changePage(this.props.next);
          }}
        >
          <a className="page-link">
            <Icon
              className={btnClass(this.props.next)}
              icon="chevron-right"
            />
          </a>
        </li>
      </ul>
    );
  }
}

const btnClass = value => {
  let classes = [];
  if (!value) {
    classes.push('disabled');
  }
  return classes.join(' ');
};

export default paginator;
