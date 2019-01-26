const router = require('express').Router();
const db = require('../db/db');
const student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  const allStudents = await student.findAll();
  res.json(allStudents);
});

router.get('/:id', async (req, res, next) => {
  try {
    const oneStudent = await student.findById(Number(req.params.id));
    if (oneStudent) {
      res.json(oneStudent);
    } else {
      throw new Error('Not Found');
    }
  } catch (err) {
    console.log('did I fail?');
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const studentInfo = req.body;
    const newStudent = await student.create({
      firstName: studentInfo.firstName,
      lastName: studentInfo.lastName,
      email: studentInfo.email,
    });
    res.status(201).json(newStudent);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  const studentChange = req.body;
  //const oneStudent = await student.findById(Number(req.params.id));
  const [numOfAffRows, updatedStudent] = await student.update(
    { firstName: studentChange.firstName },
    { where: { id: Number(req.params.id) }, returning: true, plain: true }
  );
  res.send(updatedStudent);
});

router.delete('/:id', async (req, res, next) => {
  const numAffectedRows = await student.destroy({
    where: {
      id: Number(req.params.id),
    },
  });
  res.status(204).json('deleted!');
});
module.exports = router;
