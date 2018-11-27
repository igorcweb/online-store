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
          `<body
    style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
  >
                    <style>
      @media only screen and (max-width: 620px) {
        table[class='body'] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }

        table[class='body'] p,
        table[class='body'] ul,
        table[class='body'] ol,
        table[class='body'] td,
        table[class='body'] span,
        table[class='body'] a {
          font-size: 16px !important;
        }

        table[class='body'] .wrapper,
        table[class='body'] .article {
          padding: 10px !important;
        }

        table[class='body'] .content {
          padding: 0 !important;
        }

        table[class='body'] .container {
          padding: 0 !important;
          width: 100% !important;
        }

        table[class='body'] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }

        table[class='body'] .btn table {
          width: 100% !important;
        }

        table[class='body'] .btn a {
          width: 100% !important;
        }

        table[class='body'] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }

      @media all {
        .ExternalClass {
          width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }



        .btn-primary table td:hover {
          background-color: #34495e !important;
        }

        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important;
        }
      }
    </style>

    <table
      cellpadding="0"
      cellspacing="0"
      class="body"
      style="border-collapse: separate; width: 100%; background-color: #f6f6f6;"
    >
      <tr>
        <td
          style="font-family: sans-serif; font-size: 14px; vertical-align: top;"
        >
          &nbsp;
        </td>
        <td
          class="container"
          style="font-family: sans-serif; font-size: 14px;  display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"
        >
          <div
            class="content"
            style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"
          >
            <table
              class="main"
              style="border-collapse: separate; width: 100%; background: #ffffff; border-radius: 3px;"
            >
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td
                  class="wrapper"
                  style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"
                >
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    style="border-collapse: separate;"
                  >
                    <tr>
                      <td
                        style="font-family: sans-serif; font-size: 14px; vertical-align: top;"
                      >
                        <p
                          style="font-family: sans-serif; font-size: 18px; font-weight: normal; margin: 0; margin-bottom: 15px;"
                        >
                          Dear ${name},
                        </p>
                        <p
                          style="font-family: sans-serif; font-size: 18px; font-weight: normal; margin: 0; margin-bottom: 15px;"
                        >
                          Welcome to Organic Fitness World!
                        </p>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="btn btn-primary"
                          style="border-collapse: separate; "
                        >
                          <tbody>
                            <tr>
                              <td
                                style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="border-collapse: separate; "
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: ##31c082; border-radius: 5px; text-align: center;"
                                      >
                                        <a
                                          href="https://organic-fitness-world.herokuapp.com/login"
                                          target="_blank"
                                          style="display: inline-block; color: #ffffff; background-color: #31c082; border: solid 1px #31c082; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize;"
                                          >Access Your Account Here</a
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p
                          style="font-family: sans-serif; font-size: 15px; font-weight: normal; margin: 0; margin: 15px 0;"
                        >
                          Organic Fitness World Team
                        </p>
       
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

      </tr>
    </table>
  </body>
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
            `<li style="font-size: 16px">${product[0]} - Qty: ${
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
                `<body
    style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
  >
                    <style>
      @media only screen and (max-width: 620px) {
        table[class='body'] h1 {
          font-size: 28px !important;
          margin-bottom: 10px !important;
        }

        table[class='body'] p,
        table[class='body'] ul,
        table[class='body'] ol,
        table[class='body'] td,
        table[class='body'] span,
        table[class='body'] a {
          font-size: 16px !important;
        }

        table[class='body'] .wrapper,
        table[class='body'] .article {
          padding: 10px !important;
        }

        table[class='body'] .content {
          padding: 0 !important;
        }

        table[class='body'] .container {
          padding: 0 !important;
          width: 100% !important;
        }

        table[class='body'] .main {
          border-left-width: 0 !important;
          border-radius: 0 !important;
          border-right-width: 0 !important;
        }

        table[class='body'] .btn table {
          width: 100% !important;
        }

        table[class='body'] .btn a {
          width: 100% !important;
        }

        table[class='body'] .img-responsive {
          height: auto !important;
          max-width: 100% !important;
          width: auto !important;
        }
      }

      @media all {
        .ExternalClass {
          width: 100%;
        }

        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
          line-height: 100%;
        }



        .btn-primary table td:hover {
          background-color: #34495e !important;
        }

        .btn-primary a:hover {
          background-color: #34495e !important;
          border-color: #34495e !important;
        }
      }
    </style>

    <table
      cellpadding="0"
      cellspacing="0"
      class="body"
      style="border-collapse: separate; width: 100%; background-color: #f6f6f6;"
    >
      <tr>
        <td
          style="font-family: sans-serif; font-size: 14px; vertical-align: top;"
        >
          &nbsp;
        </td>
        <td
          class="container"
          style="font-family: sans-serif; font-size: 14px;  display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"
        >
          <div
            class="content"
            style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"
          >
            <table
              class="main"
              style="border-collapse: separate; width: 100%; background: #ffffff; border-radius: 3px;"
            >
              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td
                  class="wrapper"
                  style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"
                >
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    style="border-collapse: separate;"
                  >
                    <tr>
                      <td
                        style="font-family: sans-serif; font-size: 14px; vertical-align: top;"
                      >
                        <p
                          style="font-family: sans-serif; font-size: 18px; font-weight: normal; margin: 0; margin-bottom: 15px;"
                        >
                          Dear ${name},
                        </p>
                        <p
                          style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;"
                        >
                          Thank you for your order!
                        </p>
                        <p
                          style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin-bottom: 15px;"
                        >
                          Here are the order details:
                        </p>
                        <ul style="list-style: none; padding-left: 0;">
                          ${orderDisplay}
                        </ul>

                        <p style="font-family: sans-serif; font-size: 16px; font-weight: normal; margin: 0; margin: 15px 0;">
                          We are committed to your satisfaction.
                        </p>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="btn btn-primary"
                          style="border-collapse: separate; "
                        >
                          <tbody>
                            <tr>
                              <td
                                style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  style="border-collapse: separate; "
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: ##31c082; border-radius: 5px; text-align: center;"
                                      >
                                        <a
                                          href="https://organic-fitness-world.herokuapp.com/login"
                                          target="_blank"
                                          style="display: inline-block; color: #ffffff; background-color: #31c082; border: solid 1px #31c082; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize;"
                                          >See Your Order and Rate Your Purchases</a
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p
                          style="font-family: sans-serif; font-size: 15px; font-weight: normal; margin: 0; margin: 15px 0;"
                        >
                          Organic Fitness World Team
                        </p>
       
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

      </tr>
    </table>
  </body>
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
