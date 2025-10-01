// Utility functions for email templates
export const generateEmailHeader = () => `
  <div style="
    background-color: #007BFF;
    color: #fff;
    text-align: center;
    padding: 25px 20px;
    font-size: 28px;
    font-weight: bold;
  ">
    Online Shopping Center
  </div>
`;

export const generateEmailFooter = () => `
  <div style="
    background-color: #f0f2f5;
    color: #888888;
    text-align: center;
    padding: 20px;
    font-size: 14px;
  ">
    &copy; ${new Date().getFullYear()} Online Shopping Center. All rights reserved.<br/>
    123 Your Street, Your City, Country
  </div>
`;

// Welcome email template
export const welcomeEmailTemplate = (user, verifyUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Online Shopping Center</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f7;">
  <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
    ${generateEmailHeader()}
    <div style="padding:30px 20px; color:#333; text-align:center;">
      <h1 style="color:#007BFF; margin-bottom:15px;">Welcome, ${user.name}!</h1>
      <p>We’re thrilled to have you join <strong>Online Shopping Center</strong> — your destination for stylish clothing for Men, Women, and Kids!</p>
      <p>Click the button below to verify your email and start exploring our collection.</p>
      <a href="${verifyUrl}" style="display:inline-block; margin-top:20px; padding:12px 25px; background-color:#28a745; color:#fff; text-decoration:none; border-radius:50px; font-weight:bold;">
        Verify Your Email
      </a>
      <p style="margin-top:25px;">If you have any questions, feel free to reply to this email. Our team is always happy to assist you.</p>
    </div>
    ${generateEmailFooter()}
  </div>
</body>
</html>
`;

//oder conformation mail system
export const orderConfirmationEmailTemplate = (user, order) => {
  const itemsHtml = order.items.map(
    (item) => `
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${item.size || '-'}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align:center;">${item.quantity}</td>
        <td style="padding: 10px; border: 1px solid #ddd; text-align:right;">$${item.price.toFixed(2)}</td>
      </tr>
    `
  ).join('');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Order Confirmation</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f7;">
    <div style="max-width:600px; margin:40px auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
      ${generateEmailHeader()}
      <div style="padding:30px 20px; color:#333;">
        <h1 style="color:#007BFF; text-align:center;">Thank you for your order, ${user.name}!</h1>
        <p>Your order has been received and is now being processed. Here’s a summary of your purchase:</p>

        <table style="width:100%; border-collapse: collapse; margin-top:20px;">
          <thead>
            <tr style="background-color:#007BFF; color:#fff;">
              <th style="padding:10px; text-align:left;">Product</th>
              <th style="padding:10px; text-align:left;">Size</th>
              <th style="padding:10px; text-align:center;">Quantity</th>
              <th style="padding:10px; text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="text-align:right; font-weight:bold; font-size:16px; margin-top:15px;">
          Total: $${order.total.toFixed(2)}
        </p>

        <p>Order ID: <strong>${order.orderId}</strong></p>
        <p>Order Date: <strong>${new Date(order.orderDate).toLocaleString()}</strong></p>
        <p>Shipping Address: <strong>${order.shippingAddress}</strong></p>

        <p style="margin-top:25px; text-align:center;">
          We hope you enjoy your purchase! If you have any questions, feel free to reply to this email.
        </p>
      </div>
      ${generateEmailFooter()}
    </div>
  </body>
  </html>
  `;
};
