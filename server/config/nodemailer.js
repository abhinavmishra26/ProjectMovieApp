import nodemailer from "nodemailer";

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.SENDER_EMAIL,
        pass:process.env.APP_PASS,
    }
});

 const sendEmail = async (to, subject, html) => {
    try {
      await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to,
        subject,
        html,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

export default sendEmail;