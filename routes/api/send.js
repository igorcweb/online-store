const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const helper = require('sendgrid').mail;
const async = require('async');

// @route POST api/send/welcome
// @desc send welcome message
router.post('/welcome', (req, res, next) => {
  const { email } = req.body;
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
        console.log('Done');
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
          ['igorchern07@gmail.com'],
          'Organic Fitness World',
          'Welcome to Organic Fitness World!',
          `<p style="font-size: 32px;">Welcome to Organic Fitness World!</p>
        <p style="font-size: 24px">Click <a href="https://organic-fitness-world.herokuapp.com/login">here</a> to access your account.</p>

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

router.post('/order', (req, res, next) => {
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
    const sg = require('sendgrid')(
      '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'
    );
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
        console.log('Done');
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
          '<p style="font-size: 32px;">Welcome to Organic Fitness World!</p>'
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

module.exports = router;
