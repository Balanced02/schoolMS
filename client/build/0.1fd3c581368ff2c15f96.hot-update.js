webpackHotUpdate(0,{"./src/containers/Full/Full.js":function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),u=a("./node_modules/react/react.js"),d=n(u),c=a("./node_modules/react-router-dom/es/index.js"),i=a("./node_modules/reactstrap/dist/reactstrap.es.js"),m=a("../node_modules/react-redux/es/index.js"),f=a("./src/components/Header/Header.js"),p=n(f),h=a("./src/components/Sidebar/Sidebar.js"),E=n(h),v=a("./src/components/Breadcrumb/Breadcrumb.js"),y=n(v),b=a("./src/components/Aside/Aside.js"),w=n(b),j=a("./src/components/Footer/Footer.js"),R=n(j),L=a("./src/components/PageLoading/index.js"),D=n(L),g=a("./src/utils/index.js"),A=a("./src/actions/auth.js"),C=a("./src/views/Dashboard/Dashboard.js"),S=n(C),_=a("./src/views/TeacherDashboard/TeacherDashboard.js"),N=n(_),P=a("./src/views/EmployeeList/EmployeeList.js"),O=n(P),k=a(!function(){var e=new Error('Cannot find module "../../views/StudentList"');throw e.code="MODULE_NOT_FOUND",e}()),T=n(k),H=a("./src/views/Department/Department.js"),M=n(H),x=a("./src/views/Course/Course.js"),I=n(x),F=a("./src/views/Visitors/Visitors.js"),V=n(F),U=a("./src/views/AddEmployee/AddEmployee.js"),B=n(U),W=a("./src/views/NewIntake/NewIntake.js"),q=n(W),z=a("./src/views/LeaveApproval/LeaveApproval.js"),G=n(z),J=a("./src/views/LeaveAplication/LeaveApplication.js"),K=n(J),Q=a("./src/views/LeaveCategory/LeaveCategory.js"),X=n(Q),Y=a("./src/views/AddDesignation/AddDesignation.js"),Z=n(Y),$=a("./src/views/PayHead/PayHead.js"),ee=n($),te=a("./src/views/SDashboard/SDashboard.js"),ae=n(te),ne=a("./src/views/InstitutionDetails/InstitutionDetails.js"),re=n(ne),le=a("./src/views/LibraryCategory/LibraryCategory.js"),oe=n(le),se=a("./src/views/ViewSchools/ViewSchools.js"),ue=n(se),de=a("./src/views/Profile/Profile.js"),ce=n(de),ie=a("./src/components/CourseMaterial.js"),me=n(ie),fe=function(e){function t(e){r(this,t);var a=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={ready:a.props.authenticated,redirect:!1,user:a.props.user},a}return o(t,e),s(t,[{key:"componentWillMount",value:function(){var e=this;this.props.authenticated?this.setState({ready:!0,user:this.props.user._doc}):(0,g.callApi)("/me").then(function(t){t.authenticated?(e.props.dispatch((0,A.login)(t.user)),e.setState({ready:!0,redirect:!1,user:t.user})):e.setState({redirect:!0})}).catch(function(t){e.setState({redirect:!1})})}},{key:"render",value:function(){return this.state.ready?"admin"===this.state.user.userType?d.default.createElement("div",{className:"app"},d.default.createElement(p.default,{user:this.state.user}),d.default.createElement("div",{className:"app-body"},d.default.createElement(E.default,this.props),d.default.createElement("main",{className:"main"},d.default.createElement(y.default,null),d.default.createElement(i.Container,{fluid:!0},d.default.createElement(c.Switch,null,d.default.createElement(c.Route,{path:"/dashboard",name:"Dashboard",component:S.default}),d.default.createElement(c.Route,{path:"/employeeList",name:"EmployeeList",component:O.default}),d.default.createElement(c.Route,{path:"/studentList",name:"StudentList",component:T.default}),d.default.createElement(c.Route,{path:"/department",name:"Department",component:M.default}),d.default.createElement(c.Route,{path:"/visitors",name:"Department",component:V.default}),d.default.createElement(c.Route,{path:"/addCourse",name:"Course",component:I.default}),d.default.createElement(c.Route,{path:"/addEmployee",name:"Add Employee",component:B.default}),"// ",d.default.createElement(c.Route,{path:"/courseMaterials",name:"Course Materials",component:me.default}),d.default.createElement(c.Route,{path:"/newIntake",name:"New Intake",component:q.default}),d.default.createElement(c.Route,{path:"/leaveApprovals",name:"Leave Approvals",component:G.default}),d.default.createElement(c.Route,{path:"/leaveCategory",name:"Leave Category",component:X.default}),d.default.createElement(c.Route,{path:"/addDesignation",name:"Add Designation",component:Z.default}),d.default.createElement(c.Route,{path:"/payHead",name:"Pay Head",component:ee.default}),d.default.createElement(c.Route,{path:"/profile",name:"Profile",component:ce.default}),d.default.createElement(c.Route,{path:"/libraryCategory",name:"Library Category",component:oe.default}),d.default.createElement(c.Route,{path:"/leaveApplication",name:"Leave Application",component:K.default}),d.default.createElement(c.Redirect,{from:"/",to:"/dashboard"})))),d.default.createElement(w.default,null)),d.default.createElement(R.default,null)):"teacher"===this.state.user.userType?d.default.createElement("div",{className:"app"},d.default.createElement(p.default,{user:this.state.user}),d.default.createElement("div",{className:"app-body"},d.default.createElement(E.default,this.props),d.default.createElement("main",{className:"main"},d.default.createElement(y.default,null),d.default.createElement(i.Container,{fluid:!0},d.default.createElement(c.Switch,null,d.default.createElement(c.Route,{path:"/dashboard",name:"Dashboard",component:N.default}),d.default.createElement(c.Route,{path:"/profile",name:"Profile",component:ce.default}),d.default.createElement(c.Route,{path:"/visitors",name:"Department",component:V.default}),d.default.createElement(c.Route,{path:"/leaveApplication",name:"Leave Application",component:K.default}),d.default.createElement(c.Redirect,{from:"/",to:"/dashboard"})))),d.default.createElement(w.default,null)),d.default.createElement(R.default,null)):"super"===this.state.user.userType?d.default.createElement("div",{className:"app"},d.default.createElement(p.default,{user:this.state.user}),d.default.createElement("div",{className:"app-body"},d.default.createElement(E.default,this.props),d.default.createElement("main",{className:"main"},d.default.createElement(y.default,null),d.default.createElement(i.Container,{fluid:!0},d.default.createElement(c.Switch,null,d.default.createElement(c.Route,{path:"/dashboard",name:"Dashboard",component:ae.default}),d.default.createElement(c.Route,{path:"/addSchool",name:"Add School",component:re.default}),d.default.createElement(c.Route,{path:"/viewSchools",name:"School Lists",component:ue.default}),d.default.createElement(c.Route,{path:"/profile",name:"Profile",component:ce.default}),d.default.createElement(c.Redirect,{from:"/",to:"/dashboard"})))),d.default.createElement(w.default,null)),d.default.createElement(R.default,null)):d.default.createElement("i",null):this.state.redirect?d.default.createElement(c.Redirect,{to:"/login"}):d.default.createElement(D.default,null)}}]),t}(u.Component),pe=function(e){return{authenticated:e.auth.authenticated,user:e.auth.user||{}}};t.default=(0,m.connect)(pe)(fe)}});
//# sourceMappingURL=0.1fd3c581368ff2c15f96.hot-update.js.map