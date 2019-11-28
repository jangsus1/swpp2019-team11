import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Checkbox } from 'semantic-ui-react';
import ResponsingOption from './ResponsingOption';

export class ResponsingItem extends Component {
  render(){
    return (
      <div>
        <Segment>
        <div>{this.props.question}</div>
        {this.props.duplicate && <div>{"(You can select more than one.)"}</div>}
        {
          (this.props.question_type == 'Selection')
          &&
          this.props.selection.map((selection) => {
            return (
              <div>
                <Checkbox />
                
              </div>
            );
            })
        }
        {
          (this.props.question_type == 'Subjective')
          &&
          <input/>
        }
        </Segment>
      </div>
    );
  }
};

export default withRouter(ResponsingItem);