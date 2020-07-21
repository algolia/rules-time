import React, { Component } from 'react';
import algoliasearch from 'algoliasearch';
import './App.css';
import moment from 'moment';
import {appID, API_KEY, indexName} from './config.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appID: appID || "932LAAGOT3",
      API_KEY: API_KEY || "API_KEY",
      indexName: indexName || "atis-prods",
      query: "",
      rules: [],
      rule: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setRule = this.setRule.bind(this);
  }

  handleChange(e) {
    switch (e.target.name) {
      case "appID":
        this.setState({ appID: e.target.value });
        break;
      case "API_KEY":
        this.setState({ API_KEY: e.target.value });
        break;
      case "indexName":
        this.setState({ indexName: e.target.value });
        break;
      case "query":
        if (e.target.value === "") {
          this.setState({ query: e.target.value, rule: "", rules: [] });
        } else {
          this.setState({ query: e.target.value, rule: "" });
        }
        const searchClient = algoliasearch(this.state.appID, this.state.API_KEY);
        const index = searchClient.initIndex(this.state.indexName);
        index.searchRules(this.state.query)
          .then(({ hits }) => {
            this.setState({ rules: hits });
          })
          .catch(err => {
            alert(err.message);
          })
        break;
      case "from":
        this.setState({ from: e.target.value });
        break;
      case "until":
        this.setState({ until: e.target.value });
        break;
      default:
        this.setState({ query: e.target.value });
        break;
    }
  }
   
  setRule(rule) {
    this.setState({ rule: rule, rules: [rule] });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const searchClient = algoliasearch(this.state.appID, this.state.API_KEY);
    const index = searchClient.initIndex(this.state.indexName);
    if (e.target.name === "query") {
      index.searchRules(this.state.query)
        .then(({ hits }) => {
          this.setState({ rules: hits });
        })
        .catch(err => alert(err.message));
    }
    if (e.target.name === "time") {
      const rule = {
        objectID: this.state.rule.objectID,
        condition: this.state.rule.condition,
        consequence: this.state.rule.consequence,
        validity: [
          {
            from: moment(this.state.from).unix(),
            until: moment(this.state.until).unix()
          }
        ],
        description: this.state.rule.description,
      }
      index.saveRule(rule)
        .then((res) => {
          alert(`Saving rule ${rule.objectID} valid from ${moment(this.state.from).local().format('llll')} until ${moment(this.state.until).local().format('llll')}`)
        })
        .catch(err => alert(err.message))
      // alert(`Saving rule ${rule.objectID} valid from ${moment(this.state.from).local().format('llll')} until ${moment(this.state.until).local().format('llll')}`)
      // index.saveRule(rule).wait()
      //   .then((res) => {
      //     alert(`Completed Saving rule ${rule.objectID} valid from ${moment(this.state.from).local().format('llll')} until ${moment(this.state.until).local().format('llll')}`)
      //   })
      //   .catch(err => alert(err.message))
    }
  }
  _renderValidity(rule) {
    console.log(rule)
    if (rule.validity) {
      return (<div><div><b>Active From:</b> {moment.unix(rule.validity[0].from).format('llll')}</div><div> <b>Until:</b> {moment.unix(rule.validity[0].until).format('llll')}</div></div>)
    } else {
      return ("");
    }
  }
  
  _renderRules() {
    return this.state.rules.map((rule, index) => (
      <button className='rule-button' key={index} onClick={() => this.setRule(rule)}>
        <div>
          <b>objectID:</b> {rule.objectID}
        </div>
        <div>
          <b>Description:</b> {rule.description || 0}
        </div>
        {this._renderValidity(rule)}
        <div>
          <b>Last Updated:</b> {moment.unix(rule._metadata.lastUpdate).format('llll') || 0}
        </div>
      </button>
    ))
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">rules-time</a>
          </h1>
          <div className="input-container">
            AppID:
            <input type="text" name='appID' placeholder={this.state.appID} onChange={this.handleChange} />
          </div>
          <div className="input-container">
            API_KEY:
            <input type="text" name='API_KEY' placeholder={this.state.API_KEY} onChange={this.handleChange} />
          </div>
          <div className="input-container">
            indexName:
            <input type="text" name='indexName' placeholder={this.state.indexName} onChange={this.handleChange} />
          </div>
        </header>

        <div className="container">
            <div className="search-panel">
              <div className="search-panel__results">
              <form name="query" onSubmit={this.handleSubmit}>
                <label>
                  <b>Search for Rule:</b>
                  <input type="text" name="query" placeholder="Search for contexts, descriptions, or strategies" onChange={this.handleChange} />
                </label>
                {/* <input type="submit" name="query" value="Look for Rule" /> */}
              </form>
              {this._renderRules()}
              {(this.state.rule ? 
              <RenderTime 
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
              /> : 
              "")}
              </div>
            </div>
        </div>
      </div>
    );
  }
}

const RenderTime = (props) => {
  return (
    <div>
      <form name="time" onSubmit={props.handleSubmit}>
        <div>
          <b>Set Active Time</b>
        </div>
        <label>
          From: <input type="text" name="from" placeholder="07-25-2020 08:00 PDT" onChange={props.handleChange} />
        </label>
        <label>
          Until: <input type="text" name="until" placeholder="08-20-2020 15:00 PDT" onChange={props.handleChange} />
        </label>
        <input type="submit" value="Submit Change" />
      </form>
    </div>
  )
}


export default App;
