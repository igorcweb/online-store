const express = require('express');
const router = express.Router();
const helper = require('sendgrid').mail;
const async = require('async');

router.post('/welcome', (req, res, next) => {
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
      process.env.SENDGRID_API
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
          ['igorchern07@gmail.com'],
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
          ['igorchern07@gmail.com'],
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
