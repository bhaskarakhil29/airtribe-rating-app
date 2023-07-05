const courseRoutes = require("express").Router();
const courseData = require("../courses.json");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

courseRoutes.use(bodyParser.urlencoded({ extended: false }));
courseRoutes.use(bodyParser.json());

courseRoutes.post("/", (req, res) => {
  const courseDetailsPassed = req.body;
  const writePath = path.join(__dirname, "..", "courses.json");
  const courseDataModified = courseData;
  courseDataModified.airtribe.push(courseDetailsPassed);
  fs.writeFileSync(writePath, JSON.stringify(courseDataModified), {
    encoding: "utf8",
    flag: "w",
  });
  res.status(200).send(`Course Created Successfully`);
});

courseRoutes.put("/:courseId/averageRating", (req, res) => {
  const courseIdPassed = req.params.courseId;
  const courseModifiedAveRating = req.body;
  const writePath = path.join(__dirname, "..", "courses.json");
  const courseDataModified = courseData;
  const courseIndex = courseDataModified.airtribe.findIndex(
    (val) => val.courseId == courseIdPassed
  );
  if (courseIndex !== -1) {
    courseDataModified.airtribe[courseIndex] = courseModifiedAveRating;
  }
  fs.writeFileSync(writePath, JSON.stringify(courseDataModified), {
    encoding: "utf8",
    flag: "w",
  });
  res.status(200).send(`Course Updated Successfully`);
});

courseRoutes.get("/", (req, res) => {
  res.status(200);
  res.send(courseData);
});

courseRoutes.get("/:courseId", (req, res) => {
  console.log(`Entered to Endpoint`);
  const courseIdReceived = req.params.courseId;
  const courses = courseData.airtribe;
  const courseRetrieved = courses.filter(
    (course) => course.courseId == courseIdReceived
  );
  if (courseRetrieved.length > 0) {
    res.status(200).send(courseRetrieved);
  } else {
    res.status(404).send(`Data Not Found`);
  }
  console.log(`course retrieved is `, courseRetrieved);
});

courseRoutes.get("/:courseId/avgRating", (req, res) => {
  const courseIdReceived = req.params.courseId;
  const courses = courseData.airtribe;
  const courseRetrieved = courses.filter(
    (course) => course.courseId == courseIdReceived
  );
  if (courseRetrieved.length > 0) {
    res.status(200).send({
      averageRating: courseRetrieved[0].averageRating,
      courseId: courseIdReceived,
    });
  } else {
    res.status(404).send(`Data Not Found`);
  }
});

module.exports = courseRoutes;
