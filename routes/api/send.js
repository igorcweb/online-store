const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const helper = require('sendgrid').mail;
const async = require('async');
const db = require('../../models/');

// @route POST api/send/welcome
// @desc send welcome message
router.post('/welcome', (req, res) => {
  const { name, email } = req.body;
  console.log(email);
  function sendEmail(
    parentCallback,
    fromEmail,
    toEmails,
    subject,
    textContent,
    htmlContent
  ) {
    const errorEmails = [];
    const successfulEmails = [];
    const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    async.parallel(
      [
        function(callback) {
          // Add to emails
          for (let i = 0; i < toEmails.length; i += 1) {
            // Add from email
            const senderEmail = new helper.Email(fromEmail);
            // Add to email
            const toEmail = new helper.Email(toEmails[i]);
            // HTML Content
            const content = new helper.Content('text/html', htmlContent);
            const mail = new helper.Mail(
              senderEmail,
              subject,
              toEmail,
              content
            );
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: mail.toJSON()
            });
            sg.API(request, function(error, response) {
              console.log('SendGrid');
              if (error) {
                console.log('Error response received');
              }
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            });
          }
          // return
          callback(null, true);
        }
      ],
      function(err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      }
    );
    parentCallback(null, {
      successfulEmails: successfulEmails,
      errorEmails: errorEmails
    });
  }
  async.parallel(
    [
      function(callback) {
        sendEmail(
          callback,
          'organicfitnessworld@gmail.com',
          [email],
          'Welcome to Organic Fitness World!',
          `Dear ${name}, Welcome to Organic Fitness World! Click here to access your account.`,
          `<p style="font-size: 28px;">Dear ${name},</p>
        <p style="font-size: 22px">Welcome to Organic Fitness World!</p>
        <p style="font-size: 22px">Click <a href="https://organic-fitness-world.herokuapp.com/login">here</a> to access your account.</p>
          `
        );
      }
    ],
    function(err, results) {
      res.send({
        success: true,
        message: 'Emails sent',
        successfulEmails: results[0].successfulEmails,
        errorEmails: results[0].errorEmails
      });
    }
  );
});

// @route POST api/send/order/:id
// @desc send welcome message

router.post('/order/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { products } = req.body;

  db.User.findById(id)
    .then(result => {
      const { email, name } = result;
      console.log(email, name);
      const order = [];
      products.forEach(product => {
        const productId = product[0];
        const quantity = product[1];
        db.Product.findById(productId)
          .then(result => order.push([result.name, quantity]))
          .catch(err => console.log(err));
      });
      setTimeout(() => {
        console.log('order:', order);
        const orderArr = order.map(
          product =>
            `<li style="font-size: 18px">${product[0]} - Qty: ${
              product[1]
            }</li>`
        );
        const orderDisplay = orderArr.join(',').replace(/,/g, '');
        console.log(email);
        function sendEmail(
          parentCallback,
          fromEmail,
          toEmails,
          subject,
          textContent,
          htmlContent
        ) {
          const errorEmails = [];
          const successfulEmails = [];
          const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
          async.parallel(
            [
              function(callback) {
                // Add to emails
                for (let i = 0; i < toEmails.length; i += 1) {
                  // Add from emails
                  const senderEmail = new helper.Email(fromEmail);
                  // Add to email
                  const toEmail = new helper.Email(toEmails[i]);
                  // HTML Content
                  const content = new helper.Content('text/html', htmlContent);
                  const mail = new helper.Mail(
                    senderEmail,
                    subject,
                    toEmail,
                    content
                  );
                  var request = sg.emptyRequest({
                    method: 'POST',
                    path: '/v3/mail/send',
                    body: mail.toJSON()
                  });
                  sg.API(request, function(error, response) {
                    console.log('SendGrid');
                    if (error) {
                      console.log('Error response received');
                    }
                    console.log(response.statusCode);
                    console.log(response.body);
                    console.log(response.headers);
                  });
                }
                // return
                callback(null, true);
              }
            ],
            function(err, results) {
              if (err) {
                console.log(err);
              } else {
                console.log(results);
              }
            }
          );
          parentCallback(null, {
            successfulEmails: successfulEmails,
            errorEmails: errorEmails
          });
        }
        async.parallel(
          [
            function(callback) {
              sendEmail(
                callback,
                'organicfitnessworld@gmail.com',
                [email],
                'Thank you for your order!',
                `Dear ${name}, Thank you for your order!  Here the order details: ${orderDisplay}. We are committed to your satifaction.  Click here to see your order and rate the products you purchased`,
                `<p style="font-size: 28px;">Dear ${name},</p>
                <p style="font-size: 22px">Thank you for your order!</p>  
                <p style="font-size: 22px">Here are the order details:</p> 
                <ul style="list-style: none; padding-left: 0; margin-bottom: 0">
                  ${orderDisplay}
                </ul>. 
                <p style="font-size: 22px"> We are committed to your satisfaction.</p>
                 <p style="font-size: 22px">Click <a href="https://organic-fitness-world.herokuapp.com/login">here</a> to see your order and rate the products you purchased.
                </p>
          `
              );
            }
          ],
          function(err, results) {
            res.send({
              success: true,
              message: 'Emails sent',
              successfulEmails: results[0].successfulEmails,
              errorEmails: results[0].errorEmails
            });
          }
        );
      }, 200);
    })
    .catch(err => console.log(err));
});

module.exports = router;
