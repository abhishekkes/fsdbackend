const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "abhishekkesharwani689@gmail.com",
    pass: "bndbynktwdkmmtyj",
  },
});

const sendEmail = async (email, otp) => {
  const info = {
    from: "Likhilesh-at-ABES-Canteen",
    to: email,
    subject: "OTP verification fro ABES Canteen Registration",
    html: `
            <div>
                <p>This is the security email from ABES Canteen App. Please DO NOT share the otp with anyone</p>
                <h4>OTP: ${otp}</h4>
                <p>Copyright@ABES-Canteen-App</p>
            </div>
        `,
  };
  try {
    const resp = await transporter.sendMail(info);
    console.log("Message sent: %s", resp.messageId);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = sendEmail;
