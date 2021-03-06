// @ts-check
import React from 'react';
import { Machine } from 'xstate';
import { assign } from 'xstate/lib/actions';
import { interpret } from 'xstate/lib/interpreter';
import styled from 'styled-components';
import { Exercise } from '../Exercise';

export class InternalExternalApp extends React.Component {
  actions = {};
  machine = Machine(
    {
      key: 'greeting',
      initial: 'count',
      states: {
        count: {}
      }
    },
    { actions: this.actions },
    { count: 0, total: 0 }
  );
  state = {
    appState: this.machine.initialState
  };
  interpreter = interpret(this.machine, appState => {
    this.setState({ appState });
  });
  componentDidMount() {
    this.interpreter.init();
  }
  render() {
    const { appState } = this.state;

    return (
      <Exercise
        title="Internal/External Transitions"
        machine={this.machine}
        state={this.state.appState}
      >
        Create a counting app with an "Add" button, that adds the current
        counter to the total, and then resets the counter.
      </Exercise>
    );
  }
}
