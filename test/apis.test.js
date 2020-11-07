const assert = require("assert");
const axios = require("axios");
const { it } = require("mocha");

let baseURL, adminToken, staffToken, studentToken;

beforeEach(async () => {
  baseURL = "http://localhost:5000";
  await axios.get(`${baseURL}/add/clearDB`);
  const res = await createBasicData();
  adminToken = res.adminToken;
  staffToken = res.staffToken;
  studentToken = res.studentToken;
});

describe("Unit Testing", async () => {
  describe("System baisc checking", async () => {
    it("Automated testing started", async () => {
      assert(true);
    });

    it("Server running", async () => {
      const res = await axios.get(`${baseURL}/`);
      assert.strictEqual(res.data, "Server Started");
    });
  });

  describe("Admin add new member", () => {
    it("Adding new Admin", async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${baseURL}/add/admin`,
        {
          adminName: "Admin no 1",
          email: "admin1@gmail.com",
          password: "123123",
          secret: "abcd",
        },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.admin.adminID, "A0002");
    });

    it("Adding new Staff", async () => {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": adminToken,
      };
      const res = await axios.post(
        `${baseURL}/add/staff`,
        {
          staffName: "John Doe",
          initials: "JD",
          email: "JD@gmail.com",
          password: "123123",
        },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.staff.staffID, "F0002");
    });

    it("Adding new Class", async () => {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": adminToken,
      };
      const res = await axios.post(
        `${baseURL}/add/class`,
        { className: "SY IT C" },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data._class.classID, "C0002");
    });

    it("Adding new Student", async () => {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": adminToken,
      };
      const res = await axios.post(
        `${baseURL}/add/student`,
        {
          classID: "C0001",
          rollNo: "123456",
          firstName: "Harry",
          lastName: "Smith",
          email: "HS@g.c",
          password: "123123",
        },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.student.studentID, "S0003");
    });
  });

  describe("Fetching data", () => {
    it("Listing all admins", async () => {
      const res = await axios.get(`${baseURL}/view/getAllAdmins`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.admins.length, 1);
      assert.strictEqual(res.data.admins[0].adminName, "Test admin");
    });
    it("Listing all staff members", async () => {
      const res = await axios.get(`${baseURL}/view/getAllStaff`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.staff.length, 1);
      assert.strictEqual(res.data.staff[0].staffName, "Test Staff");
    });
    it("Listing all classes", async () => {
      const res = await axios.get(`${baseURL}/view/getAllClasses`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.classes.length, 1);
      assert.strictEqual(res.data.classes[0].className, "Test Class");
    });
    it("Listing all students", async () => {
      const res = await axios.get(`${baseURL}/view/getAllStudents`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.students.length, 2);
      assert.strictEqual(res.data.students[0].fullName.firstName, "Louis");
    });
    it("Fetch student by ID", async () => {
      const res = await axios.get(`${baseURL}/view/student/S0001`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.student.fullName.firstName, "Louis");
      assert.strictEqual(res.data.student.studentID, "S0001");
    });
    it("Fetch class by ID", async () => {
      const res = await axios.get(`${baseURL}/view/class/C0001`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data._class.studentsArr.length, 2);
      assert.strictEqual(res.data._class.classID, "C0001");
    });
    it("Fetch staff by ID", async () => {
      const res = await axios.get(`${baseURL}/view/staff/F0001`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.staff.staffName, "Test Staff");
      assert.strictEqual(res.data.staff.staffID, "F0001");
    });
  });

  describe("Authentication", () => {
    it("Admin can log in", async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${baseURL}/auth/admin`,
        {
          email: "admintest@gmail.com",
          password: "123123",
        },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
    });
    it("Staff can log in", async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${baseURL}/auth/staff`,
        {
          email: "ts@gmail.com",
          password: "123123",
        },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
    });
    it("Student can log in", async () => {
      const headers = {
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${baseURL}/auth/student`,
        {
          email: "LM@g.c",
          password: "123123",
        },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
    });
    it("Cannot login with wrong password", async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        await axios.post(
          `${baseURL}/auth/student`,
          {
            email: "LM@g.c",
            password: "123",
          },
          { headers }
        );
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(err.response.data.error, "Invalid Credentials");
      }
    });
  });

  describe("Loading User Data", () => {
    it("Staff data is loaded by staff token", async () => {
      const headers = {
        "x-auth-token": staffToken,
      };
      const res = await axios.get(`${baseURL}/auth/staff`, { headers });
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.staff.staffID, "F0001");
      assert.strictEqual(res.data.authType, "staff");
    });
    it("Student data is loaded by student token", async () => {
      const headers = {
        "x-auth-token": studentToken,
      };
      const res = await axios.get(`${baseURL}/auth/student`, { headers });
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.student.studentID, "S0002");
      assert.strictEqual(res.data.authType, "student");
    });
    it("Student cannot load staff data, functions", async () => {
      try {
        const headers = { "x-auth-token": studentToken.substring(0, 1) };
        await axios.get(`${baseURL}/auth/staff`, { headers });
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(err.response.data.error, "Invalid token");
      }
    });
  });

  describe("Attendance", () => {
    it("Student can load their own attendance", async () => {
      const res = await axios.get(`${baseURL}/attendance/getByStudent/S0001`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.studentIndex, 0);
      assert.strictEqual(res.data.classAttendance[0].attendanceArr.length, 2);
    });
    it("Student can load their class attendance", async () => {
      const res = await axios.get(`${baseURL}/attendance/getByClass/C0001`);
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.classAttendance[0].subject, "Bio");
      assert.strictEqual(res.data.classAttendance[0].attendanceArr.length, 2);
    });
    it("Staff can add new attendance", async () => {
      const headers = {
        "Content-Type": "application/json",
        "x-auth-token": staffToken,
      };
      const res = await axios.post(
        `${baseURL}/attendance/addAttendance`,
        {
          classID: "C0001",
          date: "28/02/2020",
          startTime: "11:30 am",
          endTime: "12:30 pm",
          subject: "Maths",
          staffInchargeID: "F0001",
          staffTakingID: "F0001",
          attendanceArr: [1, 0],
        },
        { headers }
      );
      assert(res.data.success);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.attendance.attendanceArr[0], 1);
      assert.strictEqual(res.data.attendance.attendanceArr[1], 0);
      assert.strictEqual(res.data.attendance.subject, "Maths");
    });
  });
});

describe("Other Important Tests", () => {
  describe("Invalid Inputs", () => {
    it("Cannot add attendance with wrong students count", async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          "x-auth-token": staffToken,
        };
        await axios.post(
          `${baseURL}/attendance/addAttendance`,
          {
            classID: "C0001",
            date: "28/02/2020",
            startTime: "11:30 am",
            endTime: "12:30 pm",
            subject: "Maths",
            staffInchargeID: "F0001",
            staffTakingID: "F0001",
            attendanceArr: [1, 0, 0],
          },
          { headers }
        );
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(
          err.response.data.error,
          "Invalid attendance length"
        );
      }
    });
    it("Cannot login with wrong password", async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        await axios.post(
          `${baseURL}/auth/student`,
          {
            email: "LM@g.c",
            password: "123",
          },
          { headers }
        );
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(err.response.data.error, "Invalid Credentials");
      }
    });
    it("Cannot load attendance of a non existing student", async () => {
      try {
        await axios.get(`${baseURL}/attendance/getByStudent/S0005`);
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(err.response.data.error, "Student does not exist");
      }
    });
    it("Cannot login with non existing user", async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const res = await axios.post(
          `${baseURL}/auth/student`,
          {
            email: "sudo@g.c",
            password: "123123",
          },
          { headers }
        );
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(err.response.data.error, "Student not found");
      }
    });
  });

  describe("Missing values Errors", () => {
    it("Cannot load data without token", async () => {
      try {
        const headers = {};
        await axios.get(`${baseURL}/auth/staff`, { headers });
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(
          err.response.data.error,
          "No token, authorization failed!"
        );
      }
    });
    it("Cannot login with only email", async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const res = await axios.post(
          `${baseURL}/auth/student`,
          {
            email: "LM@g.c",
          },
          { headers }
        );
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(err.response.data.error, "Server error");
      }
    });
    it("Cannot add attendance with missing students array", async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          "x-auth-token": staffToken,
        };
        await axios.post(
          `${baseURL}/attendance/addAttendance`,
          {
            classID: "C0001",
            date: "28/02/2020",
            startTime: "11:30 am",
            endTime: "12:30 pm",
            subject: "Maths",
            staffInchargeID: "F0001",
            staffTakingID: "F0001",
          },
          { headers }
        );
        assert(false);
      } catch (err) {
        assert(!err.response.data.success);
        assert.strictEqual(err.response.data.error, "Server error");
      }
    });
  });
});

describe("System Testing", () => {
  it("Student can view modified attendance after staff has added new entery", async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": staffToken,
    };
    await axios.post(
      `${baseURL}/attendance/addAttendance`,
      {
        classID: "C0001",
        date: "28/02/2020",
        startTime: "11:30 am",
        endTime: "12:30 pm",
        subject: "Maths",
        staffInchargeID: "F0001",
        staffTakingID: "F0001",
        attendanceArr: [1, 0],
      },
      { headers }
    );
    const res = await axios.get(`${baseURL}/attendance/getByStudent/S0001`);
    assert(res.data.success);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.studentIndex, 0);
    assert.strictEqual(res.data.total, 2);
    assert.strictEqual(res.data.classAttendance.length, 2);
  });
  it("New student can log in and load data after being added by admin", async () => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": adminToken,
    };
    await axios.post(
      `${baseURL}/add/student`,
      {
        classID: "C0001",
        rollNo: "123456",
        firstName: "Harry",
        lastName: "Smith",
        email: "HS@g.c",
        password: "123123",
      },
      { headers }
    );
    const headers2 = {
      "Content-Type": "application/json",
    };
    const res = await axios.post(
      `${baseURL}/auth/student`,
      {
        email: "LM@g.c",
        password: "123123",
      },
      { headers: headers2 }
    );
    assert(res.data.success);
    assert.strictEqual(res.status, 200);
  });
});

const createBasicData = async () => {
  let headers = {
    "Content-Type": "application/json",
  };
  let res = await axios.post(
    `${baseURL}/add/admin`,
    {
      adminName: "Test admin",
      email: "admintest@gmail.com",
      password: "123123",
      secret: "abcd",
    },
    { headers }
  );
  const adminToken = res.data.token;
  headers = {
    "Content-Type": "application/json",
    "x-auth-token": adminToken,
  };
  res = await axios.post(
    `${baseURL}/add/staff`,
    {
      staffName: "Test Staff",
      initials: "TS",
      email: "ts@gmail.com",
      password: "123123",
    },
    { headers }
  );
  const staffToken = res.data.token;
  await axios.post(
    `${baseURL}/add/class`,
    { className: "Test Class" },
    { headers }
  );
  await axios.post(
    `${baseURL}/add/student`,
    {
      classID: "C0001",
      rollNo: "123455",
      firstName: "Louis",
      lastName: "Ma",
      email: "LM@g.c",
      password: "123123",
    },
    { headers }
  );
  res = await axios.post(
    `${baseURL}/add/student`,
    {
      classID: "C0001",
      rollNo: "123456",
      firstName: "Mark",
      lastName: "Lee",
      email: "ML@g.c",
      password: "123123",
    },
    { headers }
  );
  const studentToken = res.data.token;
  headers = {
    "Content-Type": "application/json",
    "x-auth-token": staffToken,
  };
  await axios.post(
    `${baseURL}/attendance/addAttendance`,
    {
      classID: "C0001",
      date: "27/02/2020",
      startTime: "10:30 am",
      endTime: "11:30 pm",
      subject: "Bio",
      staffInchargeID: "F0001",
      staffTakingID: "F0001",
      attendanceArr: [1, 0],
    },
    { headers }
  );
  return { adminToken, staffToken, studentToken };
};
