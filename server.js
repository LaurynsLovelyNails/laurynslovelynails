const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Added

const app = express();
const PORT = 3000; // Define the port

app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint for orders
app.post("/order", (req, res) => {
  const { customer_name, customer_email, product } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "laurynslovelynails@gmail.com", // Your Gmail
      pass: "ijhtvouvzhouzzkj",           // Gmail App Password
    },
  });

  const mailOptions = {
    from: "laurynslovelynails@gmail.com",
    to: "laurynslovelynails@gmail.com",   // Where you receive order emails
    subject: "New Order Received!",
    text: `Customer: ${customer_name}\nEmail: ${customer_email}\nProduct: ${product}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Order email sent: " + info.response);
      res.send("Order sent successfully!");
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
