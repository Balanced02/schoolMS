webpackHotUpdate(0,{"./src/views/Dashboard/Dashboard.js":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a("./node_modules/react/react.js"),u=n(o),i=(a("./node_modules/react-chartjs-2/lib/index.js"),a("./node_modules/reactstrap/dist/reactstrap.es.js")),d=a("../node_modules/react-redux/es/index.js"),f=a("./src/utils/index.js"),m=a("./src/actions/feedback.js"),p=a("./src/components/ActivityLog.js"),h=n(p),g=function(e){function t(e){l(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={dropdownOpen:!1,lastWeekOrder:{searching:!0,count:null,amount:null},allClients:{searching:!0,count:null},totalOrders:{searching:!0,count:null},log:[],count:0,page:1},a}return s(t,e),c(t,[{key:"getlogs",value:function(e){var t=this;(0,f.callApi)("/getlogs/"+e).then(function(e){t.setState({count:e.count,log:e.logs})}).catch(function(e){t.props.dispatch((0,m.showError)("Error getting logs"))})}},{key:"getSummary",value:function(){var e=this;(0,f.callApi)("/summary").then(function(t){e.setState({lastWeekOrder:{searching:!1,count:t.lastWeekOrders,amount:t.lastWeekIncome.map(function(e){return e.services}).map(function(e){return Number(e.total)}).reduce(function(e,t){return e+t},0)},totalOrders:{searching:!1,count:t.orders},allClients:{searching:!1,count:t.allClients}})}).catch(function(t){return e.props.dispatch((0,m.showError)(t))})}},{key:"componentDidMount",value:function(){this.getSummary(),this.getlogs()}},{key:"render",value:function(){var e=this.state,t=e.lastWeekOrder,a=e.allClients,n=e.totalOrders;return u.default.createElement("div",{className:"animated fadeIn container"},u.default.createElement(i.Row,null,u.default.createElement(i.Col,{xs:"12",sm:"6",md:"3"},u.default.createElement(i.Card,{className:"text-white bg-primary"},u.default.createElement(i.CardBlock,{className:"card-body pb-0",style:{height:"100px"}},u.default.createElement("h4",{className:"mb-0"}," "," "," ",n.searching?u.default.createElement("i",{className:"fa fa-spinner fa-spin"}):n.count," "," "," ")," "," ",u.default.createElement("p",null," Total Orders ")," "," ")," "," "," ")," "," ")," ",u.default.createElement(i.Col,{xs:"12",sm:"6",lg:"3"},u.default.createElement(i.Card,{className:"text-white bg-info"},u.default.createElement(i.CardBlock,{className:"card-body pb-0",style:{height:"100px"}},u.default.createElement("h4",{className:"mb-0"}," "," "," ",t.searching?u.default.createElement("i",{className:"fa fa-spinner fa-spin"}):t.count," "," "," ")," "," ",u.default.createElement("p",null," Last Week Orders ")," "," ")," "," "," ")," "," ")," ",u.default.createElement(i.Col,{xs:"12",sm:"6",lg:"3"},u.default.createElement(i.Card,{className:"text-white bg-warning"},u.default.createElement(i.CardBlock,{className:"card-body pb-0",style:{height:"100px"}},u.default.createElement("h4",{className:"mb-0"}," "," "," ",a.searching?u.default.createElement("i",{className:"fa fa-spinner fa-spin"}):a.count," "," "," ")," "," ",u.default.createElement("p",null," All Clients ")," "," ")," "," "," ")," "," ")," ",u.default.createElement(i.Col,{xs:"12",sm:"6",lg:"3"},u.default.createElement(i.Card,{className:"text-white bg-danger"},u.default.createElement(i.CardBlock,{className:"card-body pb-0",style:{height:"100px"}},u.default.createElement("h4",{className:"mb-0"}," "," "," ",t.searching?u.default.createElement("i",{className:"fa fa-spinner fa-spin"}):t.amount," "," "," ")," "," ",u.default.createElement("p",null," Last Week Income ")," "," ")," "," "," ")," "," ")," "," "," ")," "," ",u.default.createElement(i.Card,null,u.default.createElement(i.Row,null,u.default.createElement(i.CardBlock,{className:"card-body"}," ",this.state.log?u.default.createElement(h.default,{logs:this.state.log}):""," ")," "," "," ")," "," ")," "," "," ")}}]),t}(o.Component);t.default=(0,d.connect)()(g)}});