import React, { Component } from "react";
import PropTypes from "prop-types";
import FeedbackOptions from "./FeedBackOptions";
import Notification from "./Notification";
import Section from "./Section";
import Statistics from "./Statistics";

export default class Feedback extends Component {
  static defaultProps = {
    message: "No feedback given",
  };

  static propTypes = {
    message: PropTypes.string.isRequired,
  };

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positiveFeedback: 0,
  };

  countTotalFeedback = () => {
    this.setState((state) => ({
      total: state.good + state.neutral + state.bad,
    }));
  };

  countPositiveFeedbackPercentage = () => {
    this.setState((state) => ({
      positiveFeedback: Math.round((state.good / state.total) * 100),
    }));
  };

  onButtonClick = (name) => {
    this.setState((state) => ({ [name]: state[name] + 1, notification: true }));
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();
  };

  render() {
    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions type="button" onLeaveFeedback={this.onButtonClick} />
        </Section>
        <Section title="Statistics">
          {this.state.notification ? (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.state.total}
              positiveFeedback={this.state.positiveFeedback}
            />
          ) : (
            <Notification message={this.props.message} />
          )}
        </Section>
      </>
    );
  }
}
