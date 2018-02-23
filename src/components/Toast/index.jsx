import React, { Component } from 'react';
import { string } from 'prop-types';
import classNames from 'classnames';
import WarningSvg from '../../svg-components/Warning';
import './style.scss';

class Toast extends Component {
  state = {
    isOpen: true,
  };

  close = () => this.setState({ isOpen: false })
  open = () => this.setState({ isOpen: true })

  render() {
    const classList = classNames('Toast', {
      'Toast--open': this.state.isOpen,
    });

    return (
      <section className={classList}>
        <WarningSvg className="Toast__icon" onClick={this.open} />

        <p className="Toast__text">{this.props.text}</p>

        <button aria-label="close-notification" className="Toast__close" onClick={this.close} />
      </section>
    );
  }
}

Toast.propTypes = {
  text: string,
};

export default Toast;
