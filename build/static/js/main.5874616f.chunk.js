(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(22)},17:function(e,t,a){},19:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(6),i=a.n(r),s=(a(17),a(7)),u=a(8),c=a(10),m=a(9),o=a(11),h=a(1),d=a(4),p=a.n(d),E=(a(19),a(2)),b=a.n(E),v=a(3),g=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={appID:localStorage.getItem("rules_app_id")||v.appID||"appID",API_KEY:localStorage.getItem("rules_api_key")||v.API_KEY||"API_KEY",indexName:localStorage.getItem("rules_index_name")||v.indexName||"atis-prods",query:"",rules:[],rule:""},a.handleChange=a.handleChange.bind(Object(h.a)(Object(h.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(Object(h.a)(a))),a.setRule=a.setRule.bind(Object(h.a)(Object(h.a)(a))),a}return Object(o.a)(t,e),Object(u.a)(t,[{key:"handleChange",value:function(e){var t=this;switch(e.target.name){case"appID":this.setState({appID:e.target.value});break;case"API_KEY":this.setState({API_KEY:e.target.value});break;case"indexName":this.setState({indexName:e.target.value});break;case"query":""===e.target.value?this.setState({query:e.target.value,rule:"",rules:[]}):this.setState({query:e.target.value,rule:""}),p()(this.state.appID,this.state.API_KEY).initIndex(this.state.indexName).searchRules(this.state.query).then(function(e){var a=e.hits;t.setState({rules:a})}).catch(function(e){alert(e.message)});break;case"from":this.setState({from:e.target.value});break;case"until":this.setState({until:e.target.value});break;default:this.setState({query:e.target.value})}}},{key:"setRule",value:function(e){this.setState({rule:e,rules:[e]}),localStorage.setItem("rules_app_id",this.state.appID),localStorage.setItem("rules_api_key",this.state.API_KEY),localStorage.setItem("rules_index_name",this.state.indexName)}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var a=p()(this.state.appID,this.state.API_KEY).initIndex(this.state.indexName);if("query"===e.target.name&&a.searchRules(this.state.query).then(function(e){var a=e.hits;t.setState({rules:a})}).catch(function(e){return alert(e.message)}),"time"===e.target.name){var n={objectID:this.state.rule.objectID,condition:this.state.rule.condition,consequence:this.state.rule.consequence,validity:[{from:b()(this.state.from).unix(),until:b()(this.state.until).unix()}],description:this.state.rule.description};a.saveRule(n).then(function(e){alert("Saving rule ".concat(n.objectID," valid from ").concat(b()(t.state.from).local().format("llll")," until ").concat(b()(t.state.until).local().format("llll")))}).catch(function(e){return alert(e.message)})}}},{key:"_renderValidity",value:function(e){return e.validity?l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("b",null,"Active From:")," ",b.a.unix(e.validity[0].from).format("llll")),l.a.createElement("div",null," ",l.a.createElement("b",null,"Until:")," ",b.a.unix(e.validity[0].until).format("llll"))):""}},{key:"_renderRules",value:function(){var e=this;return this.state.rules.map(function(t,a){return l.a.createElement("button",{className:"rule-button",key:a,onClick:function(){return e.setRule(t)}},l.a.createElement("div",null,l.a.createElement("b",null,"objectID:")," ",t.objectID),l.a.createElement("div",null,l.a.createElement("b",null,"Description:")," ",t.description||0),e._renderValidity(t),l.a.createElement("div",null,l.a.createElement("b",null,"Last Updated:")," ",b.a.unix(t._metadata.lastUpdate).format("llll")||0))})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("header",{className:"header"},l.a.createElement("h1",{className:"header-title"},l.a.createElement("a",{href:"/"},"rules-time")),l.a.createElement("div",{className:"input-container"},"AppID:",l.a.createElement("input",{type:"text",name:"appID",placeholder:this.state.appID,onChange:this.handleChange})),l.a.createElement("div",{className:"input-container"},"API_KEY:",l.a.createElement("input",{type:"text",name:"API_KEY",placeholder:this.state.API_KEY,onChange:this.handleChange})),l.a.createElement("div",{className:"input-container"},"indexName:",l.a.createElement("input",{type:"text",name:"indexName",placeholder:this.state.indexName,onChange:this.handleChange}))),l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"search-panel"},l.a.createElement("div",{className:"search-panel__results"},l.a.createElement("form",{name:"query",onSubmit:this.handleSubmit},l.a.createElement("label",null,l.a.createElement("b",null,"Search for Rule:"),l.a.createElement("input",{type:"text",name:"query",placeholder:"Search for contexts, descriptions, or strategies",onChange:this.handleChange}))),this._renderRules(),this.state.rule?l.a.createElement(f,{handleChange:this.handleChange,handleSubmit:this.handleSubmit}):""))))}}]),t}(n.Component),f=function(e){return l.a.createElement("div",null,l.a.createElement("form",{name:"time",onSubmit:e.handleSubmit},l.a.createElement("div",null,l.a.createElement("b",null,"Set Active Time")),l.a.createElement("label",null,"From: ",l.a.createElement("input",{type:"text",name:"from",placeholder:"07-25-2020 08:00 PDT",onChange:e.handleChange})),l.a.createElement("label",null,"Until: ",l.a.createElement("input",{type:"text",name:"until",placeholder:"08-20-2020 15:00 PDT",onChange:e.handleChange})),l.a.createElement("input",{type:"submit",value:"Submit Change"})))},I=g;i.a.render(l.a.createElement(I,null),document.getElementById("root"))},3:function(e,t){e.exports={appID:"APPID",API_KEY:"ADMIN_API_KEY",indexName:"products_staging"}}},[[12,2,1]]]);
//# sourceMappingURL=main.5874616f.chunk.js.map