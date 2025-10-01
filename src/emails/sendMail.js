import transporter from "../utill/mailer.js";
import { orderConfirmationEmailTemplate, welcomeEmailTemplate } from "./mail.js";


export const sendWelcomeEmail = async (user,verifyurl) => {
  try {
    await  transporter.sendMail({
      from: `"Online Clohes Shopping" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Welcome to My App 🎉",
      html: welcomeEmailTemplate(user,verifyurl), // 🔥 Import template
    });
    console.log("✅ Welcome email sent successfully!");
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
};

export const sendOrderConfirmation = async (userEmail, orderData) => {
  try {
    await transporter.sendMail({
      from: `"Online Shopping Center" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: orderConfirmationEmailTemplate({ name: orderData.userName || 'Customer' }, orderData),
    });
    console.log("✅ Order confirmation email sent!");
  } catch (err) {
    console.error("❌ Failed to send order confirmation email:", err);
  }
};