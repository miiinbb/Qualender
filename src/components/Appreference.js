//index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const jwtSecret = 'gogogogo'; // JWT 시크릿 키

mongoose.connect('mongodb+srv://genius3546:dlghltlr1@cluster0.xcgtpys.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: String,
  nickname: String,
  password: String,
  phoneNumber: String,
  email: String,
  selectedFavoritesBoxes: [String],
  selectedObtainedBoxes: [String]
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
  // res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept, X-Access-Token, X-Key");
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

    // 회원가입 후 사용자 정보 반환
    res.status(200).json({ userInfo: user });

  } catch (error) {
    res.status(500).send('Error registering user.');
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $and: [{ username }, { password }] });
    if (user) {
      res.status(200).json({ availableLogin: true, userInfo: user });
    } else {
      res.status(200).json({ availableLogin: false });
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

app.post('/saveBoxes', async (req, res) => { //즐겨찾기 페이지에서 사용
  const { username, selectedFavoritesBoxes } = req.body;
  const user = new User({username, selectedFavoritesBoxes});

  try {
    // 사용자 정보를 찾아서 선택한 박스 정보 업데이트
    // await user.insert_();
    const user = await User.findOneAndUpdate(
      //init한 다음에 다시 추가하는 로직으로
      { username },
      { selectedFavoritesBoxes },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: '선택한 박스 정보 저장 완료' });
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).send('선택한 박스 정보 저장 중 에러 발생');
    console.log(error);
  }
});

app.post('/favorites', async (req, res) => { //마이페이지에서 즐겨찾기 개수 가져올 때 사용
  const { username } = req.body;
  console.log("favorites", username);
  const user = new User({username});

  try {
    const user = await User.findOne({ username }); 
    console.log(user.selectedFavoritesBoxes);

    if (user) {
      res.status(200).json({ message: '선택한 박스 정보 불러옴', data: user.selectedFavoritesBoxes });
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).send('선택한 박스 정보 저장 중 에러 발생');
    console.log(error);
  }
});

app.post('/saveObtainedCertificate', async (req, res) => {
  const { username, selectedObtainedBoxes } = req.body;
  const user = new User({username, selectedObtainedBoxes});

  try {
    // 사용자 정보를 찾아서 선택한 박스 정보 업데이트
    // await user.insert_();
    const user = await User.findOneAndUpdate(
      //init한 다음에 다시 추가하는 로직으로
      { username },
      { selectedObtainedBoxes },
      { new: true }
    );

    if (user) {
      res.status(200).json({ message: '선택한 박스 정보 저장 완료' });
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).send('선택한 박스 정보 저장 중 에러 발생');
    console.log(error);
  }
});

app.post('/personal', async (req, res) => {
  const { username } = req.body;
  console.log("in personal", username);
  const user = new User({username});

  try {
    const user = await User.findOne({ username });

    console.log(user.selectedFavoritesBoxes);

    if (user) {
      res.status(200).json({ message: '선택한 박스 정보 불러옴', data: user.selectedFavoritesBoxes });
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).send('선택한 박스 정보 저장 중 에러 발생');
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000')
})