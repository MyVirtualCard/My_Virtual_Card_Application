

function generateOTP() {
    let OTP = "";
  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.floor(Math.random() * 9);

    OTP = OTP + randomValue;
  }
  return OTP;
}

export default generateOTP;
