import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "../models/userModel";

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "27d57e659e5697",
        pass: "8ab35ce8133427",
      },
    });

    const mailOptions = {
      from: "maddison53@ethereal.email",
      to: "bar@example.com, baz@example.com",
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN
        }/verifyEmail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify you email" : "reset your password"
        } or copy and paste the link below in your browser. <br>
      ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
