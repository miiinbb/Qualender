//index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://genius3546:dlghltlr1@cluster0.xcgtpys.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: String,
  nickname: String,
  password: String,
  phoneNumber: String,
  email: String,
  selectedBoxes: [String], // 획득한 자격증 목록을 배열로 저장 
});

const ScheduleSchema = new mongoose.Schema({
  username: String,
  scheduleName: String,
  startDate: String,
  endDate: String,
  accepted: String,
}, {collection: 'schedule'});

const User = mongoose.model('User', UserSchema);
const Schedule = mongoose.model('Schedule', ScheduleSchema);

const app = express();

app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept, X-Access-Token, X-Key");
  next();
});

app.post('/name', async (req, res) => { //회원가입 시 중복확인 체크 로직
  try {
    const { username, nickname } = req.body;
    const user = await User.findOne({ $or: [{ username }, { nickname }] }); // username 또는 nickname이 일치하는 사용자 조회
    console.log(user);
    if (user) {
      console.log(req.body);
      console.log("there is a user");
      res.status(200).json({ available: false }); // 사용자가 존재하는 경우
    } else {
      console.log(req.body);
      console.log("you can use this user");
      res.status(200).json({ available: true }); // 사용자가 존재하지 않는 경우
    }
  } catch (error) {
    res.status(500).send('Error checking user existence.');
    console.log(error);
  }
});

app.post('/register', async (req, res) => { // 회원가입시 투입항목 저장 로직
  const { username, nickname, password, phoneNumber, email, selectedBoxes } = req.body;

  const user = new User({ username, nickname, password, phoneNumber, email, selectedBoxes });

  try {
    await user.save();
    res.status(200).send('User registered successfully!');
  } catch (error) {
    res.status(500).send('Error registering user.');
    console.log(error);
  }
});

app.post('/login', async (req, res) => { //로그인 시 ID 비밀번호 체크 로직
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $and: [{ username }, { password }] }); // username 과 password가 일치하는 사용자 조회
    if (user) {
      res.status(200).json({ availableLogin: true }); // 존재하는 경우 로그인 가능
    } else {
      res.status(200).json({ availableLogin: false }); // 존재하지 않는 경우 로그인 불가
    }
  } catch (error) {
    res.status(500).send('Error checking user existence.');
    console.log(error);
  }
});

app.post('/schedule', async (req, res) => {
  const { username } = req.body;
  try {
    const schedule = await Schedule.findOne({ username });
    console.log(schedule);
    res.status(200).json({ 
      username: schedule.username,
      scheduleName: schedule.scheduleName,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      accepted: schedule.accepted,
    });
  } catch (error) {
    res.status(500).send('Error retrieving user schedule.');
    console.log(error);
  }
});


app.listen(3000, () => {
  console.log('Server started on port 3000')
})