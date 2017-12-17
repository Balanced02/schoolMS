"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require("cookie-parser");

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require("passport-local");

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connectMongo = require("connect-mongo");

var _connectMongo2 = _interopRequireDefault(_connectMongo);

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _Users = require("./models/Users");

var _Users2 = _interopRequireDefault(_Users);

var _auth = require("./controllers/auth");

var _api = require("./controllers/api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = (0, _express.Router)();
var api = (0, _express.Router)();

var upload = (0, _multer2.default)({ dest: "./public/logos" });

var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
router.use((0, _cookieParser2.default)());
router.use((0, _expressSession2.default)({
  secret: process.env.SESSION_SECRET || "s3cret diz@6l3d",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 3.6e6 // 1 Hour session
  },
  store: new MongoStore({
    mongooseConnection: _mongoose2.default.connection
  })
}));

// PassportJS Setup
router.use(_passport2.default.initialize());
router.use(_passport2.default.session());

var LocalStrategy = _passportLocal2.default.Strategy;
_passport2.default.use(new LocalStrategy(_Users2.default.authenticate()));
_passport2.default.serializeUser(_Users2.default.serializeUser());
_passport2.default.deserializeUser(_Users2.default.deserializeUser());

router.use("/api", api);

router.use(_express2.default.static(_path2.default.join(__dirname, "../client/build")));

// Auth
api.get("/me", _auth.AuthMe);
api.post("/auth/login", _passport2.default.authenticate("local"), _auth.Login);
api.post("/auth/createSchool", _auth.CreateSchool);
api.post("/auth/register", _auth.Register);
api.get("/auth/logout", _auth.Logout);

// Auth Middleware
api.use(_auth.RedirectNoAuth);

//Queries
api.get("/getSummary", _api.SummaryData);
api.get("/getStudentGatePass", _api.GetStudentGatePass);
api.get("/getNotes", _api.GetNotes);
api.get("/allCourse", _api.AllCourse);
api.get("/allVisitors", _api.GetVisitors);
api.get("/allTeachers", _api.GetTeachers);
api.get("/GetStudentCategory", _api.GetStudentCategory);
api.get("/allClass", _api.AllClass);
api.get("/allLeave/:id", _api.GetLeave);
api.get("/getLeaveCategory", _api.GetLeaveCategory);
api.get("/getDepartments", _api.FetchDepartment);
api.get("/getUserCategory", _api.GetUserCategory);
api.get("/getPayRollDetails", _api.GetPayHead);
api.get("/getSchools", _api.GetSchools);
api.get("/getLibraryCategory", _api.GetLibraryCategory);
api.post("/getUserDetails", _api.GetUserDetails);
//api.post('/studentCategory', DeleteStudentGatePass);

//actions
api.post("/getImageUrl", function (req, res) {
  var logo = req.body.logo;

  (0, _api.getImg)(logo).then(function (link) {
    return res.json(link);
  }).catch(function (err) {
    return res.status(500).json({
      message: "Error Uploading Logo",
      error: err.message
    });
  });
});
api.post("/newVisitor", _api.VisitorData);
api.post("/createStudentGatePass", _api.CreateStudentGatePass);
api.post("/createNotice", _api.CreateNotice);
api.post("/createNote", _api.CreateNote);
api.post("/createCourse", _api.CreateCourse);
api.post("/updateCourse", _api.UpdateCourse);
api.post("/addClass", _api.AddClass);
api.post("/updateClass", _api.UpdateClass);
api.post("/leaveApplication", _api.LeaveApplication);
api.post("/createStudentCategory", _api.CreateStudentCategory);
api.post("/updateLeave", _api.LeaveUpdate);
api.post("/newDepartment", _api.NewDepartment);
api.post("/addLeaveCategory", _api.CategoryUpdate);
api.post("/addUserCategory", _api.AddUserCategory);
api.post("/addPayRollDetails", _api.AddPayHead);
api.post("/editSchool", _api.EditSchool);
api.post("/addLibraryCategory", _api.LibraryCategoryUpdate);
api.post("/updateSchool", _api.UpdateSchool);
api.post("/uploadFile", upload.single("logos"), _api.UploadFile);
api.post("/updateUserDetails", _api.UploadUserDetails);

exports.default = router;
//# sourceMappingURL=routes.js.map