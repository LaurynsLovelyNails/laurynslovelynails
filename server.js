const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/order", (req, res) => {
  const { customer_name, customer_email, product } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Order Received!",
    text: `Customer: ${customer_name}\nEmail: ${customer_email}\nProduct: ${product}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    } else {
      console.log("Order email sent: " + info.response);
      res.json({ success: true });
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


