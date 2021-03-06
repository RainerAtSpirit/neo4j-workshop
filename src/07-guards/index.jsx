// @ts-check
import React from 'react';
import { Machine } from 'xstate';
import { assign } from 'xstate/lib/actions';
import { interpret } from 'xstate/lib/interpreter';
import styled from 'styled-components';
import { Exercise } from '../Exercise';

export class GuardsApp extends React.Component {
  actions = {};
  machine = Machine(
    {
      initial: 'idle',
      states: {
        idle: {}
      }
    },
    { actions: this.actions },
    { query: '', results: undefined }
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
    return (
      <Exercise
        title="Guards (Conditional Transitions)"
        machine={this.machine}
        state={this.state.appState}
      >
        Create a form that only executes a search when the search input is not
        empty. <br />
        <br />
        Also, our server is pretty flakey, and sometimes shows zero results.
        Create a retry button that retries the search when there are no results.
      </Exercise>
    );
  }
}
