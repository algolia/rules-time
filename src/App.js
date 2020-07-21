import React, { useState } from 'react';
import algoliasearch from 'algoliasearch';
import './App.css';
import moment from 'moment';

function App() {
  const [appID, setAppID] = useState(localStorage.getItem('rules_app_id') || "appID");
  const [API_KEY, setAPI_KEY] = useState(localStorage.getItem('rules_api_key') || "API_KEY");
  const [indexName, setIndexName] = useState(localStorage.getItem('rules_index_name') || "products_staging");
  const [rules, setRules] = useState([]);
  const [rule, setRule] = useState("");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");

  function handleChange(e) {
    if (e.target.value === "") {
      setRule("");
      setRules([]);
    } else {
      setRule("");
    }
    const searchClient = algoliasearch(appID, API_KEY);
    const index = searchClient.initIndex(indexName);
    index.searchRules(e.target.value)
    .then(({ hits }) => {
      setRules(hits);
    })
    .catch(err => {
      alert(err.message);
    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    const searchClient = algoliasearch(appID, API_KEY);
    const index = searchClient.initIndex(indexName);
    if (e.target.name === "time") {
      const tempRule = {
        objectID: rule.objectID,
        condition: rule.condition,
        consequence: rule.consequence,
        description: rule.description
      }
      if (from && until) tempRule.validity = [
        {
          from: moment(from).unix(),
          until: moment(until).unix()
        }
      ];
      index.saveRule(tempRule)
        .then((res) => {
          (tempRule.validity
            ? alert(`Saving rule ${rule.objectID} valid from ${moment(from).local().format('llll')} until ${moment(until).local().format('llll')}`)
            : alert(`Saving rule ${rule.objectID} as always on rule`)
          )
        })
        .catch(err => alert(err.message));
    }
  }
  function handleSelection(rule) {
    setRule(rule);
    setRules([rule]);
    localStorage.setItem('rules_app_id', appID);
    localStorage.setItem('rules_api_key', API_KEY);
    localStorage.setItem('rules_index_name', indexName);
  }

  function _renderValidity(rule) {
    if (rule.validity) {
      return (<div><div><b>Active From:</b> {moment.unix(rule.validity[0].from).format('llll')}</div><div> <b>Until:</b> {moment.unix(rule.validity[0].until).format('llll')}</div></div>);
    } else {
      return ("");
    }
  }
  
  function _renderRules() {
    return rules.map((rule, index) => (
      <button className='rule-button' name="rule" key={index} onClick={() => handleSelection(rule)}>
        <div>
          <b>objectID:</b> {rule.objectID}
        </div>
        <div>
          <b>Description:</b> {rule.description || 0}
        </div>
        {_renderValidity(rule)}
        <div>
          <b>Last Updated:</b> {moment.unix(rule._metadata.lastUpdate).format('llll') || 0}
        </div>
      </button>
    ))
  }
  
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">rules-time</a>
        </h1>
        <div className="input-container">
          AppID:
          <input type="text" name='appID' placeholder={appID} onChange={e => setAppID(e.target.value)} />
        </div>
        <div className="input-container">
          WRITE or ADMIN API_KEY:
          <input type="text" name='API_KEY' placeholder={API_KEY} onChange={e => setAPI_KEY(e.target.value)} />
        </div>
        <div className="input-container">
          indexName:
          <input type="text" name='indexName' placeholder={indexName} onChange={e=> setIndexName(e.target.value)} />
        </div>
      </header>

      <div className="container">
          <div className="search-panel">
            <div className="search-panel__results">
            <form name="query" onSubmit={handleSubmit}>
              <label>
                <b>Search for Rule:</b>
                <input type="text" name="query" placeholder="Search for contexts, descriptions, or strategies" onChange={handleChange} />
              </label>
              {/* <input type="submit" name="query" value="Look for Rule" /> */}
            </form>
            {_renderRules()}
            {(rule 
            ? <RenderTime 
                setFrom={setFrom.bind(this)}
                setUntil={setUntil.bind(this)}
                handleSubmit={handleSubmit.bind(this)}
            /> 
            : "")}
            </div>
          </div>
      </div>
    </div>
  );
}

const RenderTime = ({handleSubmit, setFrom, setUntil}) => {
  return (
    <div>
      <form name="time" onSubmit={handleSubmit}>
        <div>
          <b>Set Active Time (Leave blank to set permanent)</b>
        </div>
        <label>
          From: <input type="text" name="from" placeholder="07-25-2020 08:00 PDT" onChange={e => setFrom(e.target.value)} />
        </label>
        <label>
          Until: <input type="text" name="until" placeholder="08-20-2020 15:00 PDT" onChange={e => setUntil(e.target.value)} />
        </label>
        <input type="submit" value="Submit Change" />
      </form>
    </div>
  )
}

export default App;
