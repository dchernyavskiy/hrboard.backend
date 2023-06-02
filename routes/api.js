var express = require('express');
var router = express.Router();

var usersRouter = require('../routes/users');
var authRouter = require('../routes/auth');
var departmentsRouter = require('../routes/departments');
var employeesRouter = require('../routes/employees');
var benefitsRouter = require('../routes/benefits');
var candidatesRouter = require('../routes/candidates');
var feedbacksRouter = require('../routes/feedbacks');
var jobsRouter = require('../routes/jobs');
var positionsRouter = require('../routes/positions');
var projectsRouter = require('../routes/projects');
var requestsRouter = require('../routes/requests');
var locationsRouter = require('../routes/locations');

router.use('/', departmentsRouter);
router.use('/', employeesRouter);
router.use('/', benefitsRouter);
router.use('/', candidatesRouter);
router.use('/', feedbacksRouter);
router.use('/', jobsRouter);
router.use('/', positionsRouter);
router.use('/', projectsRouter);
router.use('/', requestsRouter);
router.use('/', locationsRouter);

module.exports = router;
