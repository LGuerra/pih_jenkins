import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

class Modal extends React.Component{
  constructor(props) {
    super(props);
  }
  show() {
    $(ReactDOM.findDOMNode(this)).modal('show');
  }
  componentDidMount() {
    $(ReactDOM.findDOMNode(this)).modal('show');
  }
  componentWillUnmount() {
    $(ReactDOM.findDOMNode(this)).off('hidden');
  }
  handleClick(e) {
    e.stopPropagation();
  }
  static memoizeRender(renderFunction) {
    var modal;
    function memoizedHandler() {
      var args = _.toArray(arguments);
      var callback;
      var showArgs = args;
      if (_.isFunction(_.last(args))) {
        callback = _.last(args);
        showArgs = _.initial(args);
      }


      if (modal === undefined) {
        modal = renderFunction.apply(null, showArgs);
      } else {
        modal.show.apply(modal, showArgs);
      }

      if (_.isFunction(callback)) {
        callback();
      }
    }

    return memoizedHandler;
  }
  render() {
    var height = this.props.height || 300;

    var modalStyle = {
      position: 'absolute',
      left: '0',
      right: '0',
      marginRight: 'auto',
      marginLeft: 'auto',
      top: 'calc(100vh / 3  - (' + height + 'px/2))',
      width: this.props.width,
      height: height
    };

    return (
      <div
        onClick={this.handleClick}
        className='modal fade'
        role='dialog'
        id={this.props.id} >
        <div className='modal-dialog' style={modalStyle}>
          <div className='modal-content'>
            <div className='modal-body' style={{height: 'auto'}}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default Modal;
