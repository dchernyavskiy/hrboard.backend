const faker = require('faker');
const Department = require('../models/department');
const Location = require('../models/location');
const Employee = require('../models/employee');
const Position = require('../models/position');
const Candidate = require('../models/candidate');
const Job = require('../models/job');
const Benefit = require('../models/benefit');
const Project = require('../models/project');
const Feedback = require('../models/feedback');
const Request = require('../models/request');
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");
const MONGO_URI = 'mongodb+srv://dmitrychernyavskyd:selUguIhKtaaOyvp@cluster0.ekobnf8.mongodb.net/hrboard?retryWrites=true&w=majority'

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    });

// Add require statements for other models


const seed = async () => {
    const user1 = await User.create({
        firstName: 'Tom',
        lastName: 'Smith',
        email: 'hr1@mail.com',
        password: await bcrypt.hash('12345678', 10)
    })
    const user2 = await User.create({
        firstName: 'Tom',
        lastName: 'Smith',
        email: 'hr2@mail.com',
        password: await bcrypt.hash('12345678', 10)
    })
    await generateDepartments([user1, user2]);
};

const generateDepartments = async (users) => {
    try {
        const departments = [];

        for (let i = 0; i < 10; i++) {
            const department = {
                name: faker.company.companyName(),
                hr: faker.random.arrayElement(users)._id
            };

            departments.push(department);
        }

        // Insert departments into the database
        const createdDepartments = await Department.insertMany(departments);

        // Seed related data for each department
        for (let department of createdDepartments) {
            // Update department with related data
            department.location = await generateLocation();
            department.manager = (await generateEmployees(department))[0];
            department.employees = await generateEmployees(department);
            department.jobs = await generateJobs(department);
            department.projects = await generateProjects(department);

            // Save the updated department
            await department.save();
        }

    } catch (error) {
        console.error('Error seeding departments:', error);
    }
}

const generateJobs = async (department) => {
    try {

        const jobs = []

        for (let i = 0; i < 4; i++) {
            let job = {
                title: faker.name.jobTitle(),
                description: faker.lorem.paragraph(),
                department: department._id
            };

            jobs.push(job);
        }

        let createdJobs = await Job.insertMany(jobs);
        for (const job of createdJobs) {
            job.candidates = await generateCandidates(createdJobs);
            await job.save();
        }

        return createdJobs.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
};

const generateCandidates = async (jobs) => {
    try {
        const candidates = []

        for (let i = 0; i < 4; i++) {
            const candidate = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phoneNumber: faker.phone.phoneNumber(),
                jobs: faker.random.arrayElements(jobs.map(x => x._id), faker.random.number(1, jobs.length))
            };

            candidates.push(candidate);
        }

        const created = await Candidate.insertMany(candidates);
        return created.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
};

const generateLocation = async () => {
    try {
        const location = {
            country: faker.address.country(),
            region: faker.address.state(),
            city: faker.address.city(),
        };
        return (await Location.create(location))._id;
    } catch (error) {
        console.log(error)
    }
};

const generateEmployees = async (department) => {
    try {


        const employees = [];

        for (let i = 0; i < 5; i++) {
            const employee = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                phoneNumber: faker.phone.phoneNumber(),
                hireDate: faker.date.past(1),
                position: (await generatePositions(department))[0],
                salary: faker.commerce.price(),
                birthDate: faker.date.past(45),
                emergencyContact: faker.lorem.word(),
                address: faker.address.city(),
                benefits: await generateBenefits(),
                timeOffRequests: await generateRequests(),
                feedbacks: await generateFeedbacks(employees),
                department: department._id
            };

            employees.push(employee);
        }

        const created = await Employee.insertMany(employees);
        return created.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
};

const generateFeedbacks = async (employees) => {
    try {
        const feedbacks = []

        for (let i = 0; i < 4; i++) {
            const feedback = {
                reviewer: faker.random.arrayElement(employees.map(x => x._id)),
                date: faker.date.past(1),
                rating: faker.random.number(1, 6),
                comment: faker.lorem.paragraph()
            };

            feedbacks.push(feedback);
        }

        const created = await Feedback.insertMany(feedbacks);
        return created.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
}

const generateRequests = async () => {
    try {
        const requests = []

        for (let i = 0; i < 4; i++) {
            const request = {
                startDate: faker.date.past(1),
                endDate: faker.date.future(1),
                status: "in",
            };

            requests.push(request);
        }

        const created = await Request.insertMany(requests);
        return created.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
}

const generateBenefits = async () => {
    try {
        const benefits = []

        for (let i = 0; i < 4; i++) {
            const benefit = {
                name: faker.name.jobTitle(),
                description: faker.name.jobDescriptor(),
            };

            benefits.push(benefit);
        }

        const created = await Benefit.insertMany(benefits);
        return created.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
}

const generatePositions = async (department) => {
    try {
        const positions = [];

        for (let i = 0; i < 4; i++) {
            const position = {
                title: faker.name.jobTitle(),
                responsibilities: faker.lorem.paragraph(),
                department: department._id,
                employees: faker.random.arrayElements(department.employees.map(x => x._id), faker.random.number(1, department.employees.length))
            };

            positions.push(position);
        }

        const created = await Position.insertMany(positions);
        return created.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
};

const generateProjects = async (department) => {
    try {
        const projects = [];

        for (let i = 0; i < 4; i++) {
            const project = {
                name: faker.name.findName(),
                description: faker.lorem.paragraph(),
                department: department._id,
                employees: faker.random.arrayElements(department.employees.map(x => x._id), faker.random.number(1, department.employees.length))
            };

            projects.push(project);
        }

        const created = await Project.insertMany(projects);
        return created.map(x => x._id);
    } catch (error) {
        console.log(error)
    }
};

seed().then(_ =>{
    process.exit(1);
});
