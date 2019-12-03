import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SingleDatePicker } from 'react-dates';
import {
  Sticky, Segment, Input, TextArea, Progress, Form, Button, Checkbox, Ref, Grid, Header, Menu,
} from 'semantic-ui-react';
import moment from 'moment';
import MakingItem from '../../components/MakingPage/MakingItem';
import * as actionCreators from '../../store/actions/index';
import ProfileButton from '../../components/ProfileButton/ProfileButton';
import './MakingPage.css';
import { TopBar } from '../../components/TopBar/TopBar';

export const mapDispatchToProps = (dispatch) => ({
  checklogIn: () => dispatch(actionCreators.checklogIn()),
  onSubmitSurvey: (survey) => dispatch(actionCreators.addOngoingSurvey(survey)),
  getUserInfo: () => dispatch(actionCreators.getUserInfo()),
});

export const mapStateToProps = (state) => ({
  username: state.us.info.username,
  point: state.us.info.point,
});

const genders = [
  { key: 'm', text: 'Male', value: 'M' },
  { key: 'f', text: 'Female', value: 'F' },
  { key: 'o', text: 'Other', value: 'O' },
];

const ages = [
  { key: 'a', text: '10', value: { start: 10, end: 19 } },
  { key: 'b', text: '20', value: { start: 20, end: 29 } },
  { key: 'c', text: '30', value: { start: 30, end: 39 } },
  { key: 'd', text: '40', value: { start: 40, end: 49 } },
  { key: 'e', text: 'All', value: { start: 1, end: 100 } },
];

export class MakingPage extends Component {
    contextRef = createRef()

    state= {
      title: '',
      content: '',
      target_gender: 'M',
      target_age: [1, 100],
      gender_check: true,
      age_check: true,
      response_count: 0,
      due_date: moment(),
      open_date: moment(),
      item_count: 1,
      item_list: [
        {
          number: 1, title: '', question_type: 'Subjective', multiple_choice: false, selection: [],
        },
      ],
      open_date_focused: false,
      due_date_focused: false,
      scrollBound: [200, 300],
    }


    componentDidMount() {
      this.listenToScrollEvent();
      this.props.checklogIn()
        .then(() => {
          this.props.getUserInfo();
        })
        .catch(() => { this.props.history.push('/login/'); });
    }

    questionTypeToggler = (number) => {
      if (this.state.item_list[number - 1].question_type == 'Subjective') {
        const new_list = this.state.item_list;
        new_list[number - 1].question_type = 'Selection';
        new_list[number - 1].selection = [{ number: 1, content: '' }];
        this.setState({ item_list: new_list });
      } else {
        const new_list = this.state.item_list;
        new_list[number - 1].question_type = 'Subjective';
        new_list[number - 1].selection = [];
        this.setState({ item_list: new_list });
      }
    }

    multipleSelectionToggler = (number) => {
      const new_list = this.state.item_list;
      if (this.state.item_list[number - 1].multiple_choice == false) {
        new_list[number - 1].multiple_choice = true;
        this.setState({ item_list: new_list });
      } else {
        new_list[number - 1].multiple_choice = false;
        this.setState({ item_list: new_list });
      }
    }

    genderCheckToggler = () => {
      this.setState({ gender_check: !this.state.gender_check });
    }

    ageCheckToggler = () => {
      this.setState({ age_check: !this.state.age_check });
    }

    submitHandler = () => {
      const survey = {
        title: this.state.title,
        content: this.state.content,
        survey_start_date: moment().format('YYYY/MM/DD'),
        survey_end_date: this.state.due_date.format('YYYY/MM/DD'),
        open_date: this.state.open_date.format('YYYY/MM/DD'),
        item: this.state.item_list,
        target_age_start: this.state.age_check ? 1 : this.state.target_age[0],
        target_age_end: this.state.age_check ? 100 : this.state.target_age[1],
        target_gender: this.state.gender_check ? 'A' : this.state.target_gender,
        target_respondant_count: this.state.response_count,
      };
      this.props.onSubmitSurvey(survey);
      this.props.history.push('/main/');
    }

    addItemHandler = () => {
      const new_item = {
        number: this.state.item_list.length + 1,
        title: '',
        question_type: 'Subjective',
        multiple_choice: false,
        selection: [],
      };
      this.state.item_list.push(new_item);
      this.forceUpdate();
    };

    dataCallBackHandler = (data, number) => {
      this.state.item_list[number - 1].title = data.title;
      this.state.item_list[number - 1].selection = data.selection_list;
      this.setState({ ...this.state });
    }

    Items = () => this.state.item_list.map((item) => (
      <MakingItem
        number={item.number}
        question_type={item.question_type}
        multiple_choice={item.multiple_choice}
        stateSender={this.dataCallBackHandler}
        multipleSelectionToggler={this.multipleSelectionToggler}
        questionTypeToggler={this.questionTypeToggler}
      />
    ));

    listenToScrollEvent = () => {
      document.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
          this.scroll();
        });
      });
    }

    scroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = this.getDocHeight();
      const totalDocScrollLength = docHeight - winHeight;
      if (totalDocScrollLength < 1000) {
        this.setState({ scrollBound: [300, 400] });
      } else {
        this.setState({ scrollBound: [500, 850] });
      }
    }

    getDocHeight = () => Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight,
    )

    render() {
      const items = this.Items();
      return (
        <Ref className="MakingPage" innerRef={this.contextRef}>
          <div>
            <TopBar history={this.props.history} context={this.contextRef} username={this.props.username} point={this.props.point} />
            <Sticky offset={130} context={this.contextRef}>
              <Segment
                border="none"
                style={{
                  height: '50px', marginTop: '15px', borderBottom: 'none', borberTop: 'none',
                }}
              >
                <Progress style={{ marginTop: '0px' }} id="progressBar" color="teal" value={window.pageYOffset <= this.state.scrollBound[0] ? '1' : (window.pageYOffset < this.state.scrollBound[1] ? '2' : '3')} total="3" progress="ratio" />
              </Segment>
            </Sticky>
            <Segment className="Item">
              <h3 style={{ marginBottom: 0 }}><span style={{ padding: '5px', backgroundColor: '#E0E7E9', 'border-radius': 5 }}>1. Explain your survey!</span></h3>
              <br />
              <p style={{ 'font-size': '20px', marginBottom: 5 }}>Title </p>
              <Input className="SurveyTitle" style={{ width: '500px' }} onChange={(event) => this.setState({ title: event.target.value })} />
              <br />
              <br />
              <p style={{ 'font-size': '19px', marginBottom: 5 }}>Content </p>
              <TextArea
                className="SurveyContent"
                rows={4}
                onChange={(event) => this.setState({ content: event.target.value })}
              />
              <br />
              <br />
              <p style={{ 'font-size': '17px', marginBottom: 5 }}>Due Date </p>
              <SingleDatePicker
                borderRadius={5}
                numberOfMonths={1}
                onDateChange={(due_date) => this.setState({ due_date })}
                onFocusChange={({ focused }) => this.setState({ due_date_focused: focused })}
                focused={this.state.due_date_focused}
                date={moment(this.state.due_date)}
              />
              <p style={{ 'font-size': '17px', marginBottom: 5, marginTop: 5 }}>Open Date </p>
              <SingleDatePicker
                borderRadius={5}
                numberOfMonths={1}
                onDateChange={(open_date) => this.setState({ open_date })}
                onFocusChange={({ focused }) => this.setState({ open_date_focused: focused })}
                focused={this.state.open_date_focused}
                date={moment(this.state.open_date)}
              />
            </Segment>

            <Segment style={{ backgroundColor: '#A3C6C4' }}>
              <h3 color="#354649" style={{ marginBottom: 0 }}><span style={{ padding: '5px', backgroundColor: '#E0E7E9', 'border-radius': 5 }}>2. Survey Target Settings!</span></h3>
              <br />
              <p style={{ 'font-size': '15px', marginBottom: 5, fontWeight: 'bold' }}>Gender </p>
              <Form.Select className="genderSelect" disabled={this.state.gender_check} value={this.state.target_gender} options={genders} onChange={(e, { value }) => { this.setState({ target_gender: value }); }} placeholder="Gender" />
              <div id="Gender">
                <Checkbox className="genderCheck" checked={this.state.gender_check} onClick={this.genderCheckToggler} />
                {' '}
                Won't input gender option
              </div>
              <p style={{
                'font-size': '15px', marginBottom: 5, marginTop: 6, fontWeight: 'bold',
              }}
              >
Age
              </p>
              <Form.Select className="ageSelect" disabled={this.state.age_check} value={{ start: this.state.target_age[0], end: this.state.target_age[1] }} options={ages} onChange={(e, { value }) => { this.setState({ target_age: [value.start, value.end] }); }} placeholder="Age" />
              <Checkbox className="ageCheck" checked={this.state.age_check} onClick={this.ageCheckToggler} />
            Won't input age option
              <p style={{ marginTop: 10, marginBottom: 5, fontWeight: 'bold' }}>Target Response count:</p>
              <Input
                className="targetCount"
                type="text"
                error={this.state.response_count == '' || !Number.isInteger(+this.state.response_count) || this.state.response_count < 0 || this.state.response_count > 50}
                onChange={(event) => this.setState({ response_count: event.target.value })}
                placeholder="... How many Responses?"
              />
            </Segment>
            <h3>3. Items</h3>
            <Button className="addItemButton" onClick={this.addItemHandler}>
            Add Question Item
            </Button>
            { items }
            <Button className="submitButton" onClick={this.submitHandler}>
            Submit
            </Button>
          </div>
        </Ref>
      );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MakingPage));