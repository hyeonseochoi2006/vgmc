const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Nodemailer 설정
const emailConfig = {
  service: "gmail", // 이메일 서비스 (Gmail 사용)
  auth: {
    user: "chuihenxe123@gmail.com", // 발신자 이메일 주소
    pass: "gxojeosafbnbfntq", // 발신자 이메일 계정의 암호 (앱 비밀번호를 사용해야 할 수도 있음)
  },
};

// 폼 페이지 렌더링
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/vgmcfd.html');
});

// 피드백 제출 처리
app.post('/submit-feedback', (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  // Nodemailer를 사용하여 이메일 전송
  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: 'chuihenxe123@gmail.com', // 발신자 이메일 주소
    to: 'vgmcyouthcouncil@gmail.com', // 수신자 이메일 주소 (개발자 이메일)
    subject: '쪽지 제출', // 이메일 제목
    text: `이름: ${name}\n메시지: ${message}`, // 이메일 내용
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('이메일 전송 에러:', error);
      res.status(500).send('피드백 제출에 실패했습니다.');
    } else {
      console.log('이메일 전송 성공:', info.response);
      res.send('피드백이 성공적으로 제출되었습니다.');
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

