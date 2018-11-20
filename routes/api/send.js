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
          'Organic Fitness World',
          'Welcome to Organic Fitness World!',
          `<p style="font-size: 28px;">Dear ${name},</p>
        <p style="font-size: 24px">Welcome to Organic Fitness World! <br />Click <a href="https://organic-fitness-world.herokuapp.com/login">here</a> to access your account.</p>
          `
        );
      }
    ],
    function(err, results) {
      res.json({
        success: true,
        message: 'Emails sent',
        successfulEmails: results[0].successfulEmails,
        errorEmails: results[0].errorEmails
      });
    }
  );
});

// @route POST api/send/order
// @desc send welcome message

router.post('/order/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { products } = req.body;

  db.User.findById(id)
    .then(result => {
      const { email } = result;
      console.log(email);
      const order = [];
      products.forEach(product => {
        const productId = product[0];
        db.Product.findById(productId)
          .then(result => order.push(result))
          .catch(err => console.log(err));
      });
      setTimeout(() => {
        console.log('order:', order);
        console.log(email);
      }, 200);
    })
    .catch(err => console.log(err));
  // function sendEmail(
  //   parentCallback,
  //   fromEmail,
  //   toEmails,
  //   subject,
  //   textContent,
  //   htmlContent
  // ) {
  //   const errorEmails = [];
  //   const successfulEmails = [];
  //   const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
  //   async.parallel(
  //     [
  //       function(callback) {
  //         // Add to emails
  //         for (let i = 0; i < toEmails.length; i += 1) {
  //           // Add from emails
  //           const senderEmail = new helper.Email(fromEmail);
  //           // Add to email
  //           const toEmail = new helper.Email(toEmails[i]);
  //           // HTML Content
  //           const content = new helper.Content('text/html', htmlContent);
  //           const mail = new helper.Mail(
  //             senderEmail,
  //             subject,
  //             toEmail,
  //             content
  //           );
  //           var request = sg.emptyRequest({
  //             method: 'POST',
  //             path: '/v3/mail/send',
  //             body: mail.toJSON()
  //           });
  //           sg.API(request, function(error, response) {
  //             console.log('SendGrid');
  //             if (error) {
  //               console.log('Error response received');
  //             }
  //             console.log(response.statusCode);
  //             console.log(response.body);
  //             console.log(response.headers);
  //           });
  //         }
  //         // return
  //         callback(null, true);
  //       }
  //     ],
  //     function(err, results) {
  //       console.log('Done');
  //     }
  //   );
  //   parentCallback(null, {
  //     successfulEmails: successfulEmails,
  //     errorEmails: errorEmails
  //   });
  // }
  // async.parallel(
  //   [
  //     function(callback) {
  //       sendEmail(
  //         callback,
  //         'organicfitnessworld@gmail.com',
  //         [email],
  //         'Organic Fitness World',
  //         'Welcome to Organic Fitness World!',
  //         '<p style="font-size: 32px;">Thank you for your order!</p>'
  //       );
  //     }
  //   ],
  //   function(err, results) {
  //     res.send({
  //       success: true,
  //       message: 'Emails sent',
  //       successfulEmails: results[0].successfulEmails,
  //       errorEmails: results[0].errorEmails
  //     });
  //   }
  // );
  res.json({ msg: 'hello' });
});

module.exports = router;
