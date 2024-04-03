const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf'); // Correct import if you're using 'html-pdf'
const nodemailer = require('nodemailer');
const cors = require('cors');

const pdfTemplate = require('./documents');
const cvTemplate = require('./cv');

const app = express();
const port = process.env.PORT || 6000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Conf for email sending
const userEmail = 'cohabitTest@hotmail.com';
const userPassword = 'testCohabit1!';

//Post - PDF genereations
app.post('/sendEmails', async (req, res)=>{
    let emailRedirected = await redirectEmail(req.body);
    let sendTermsAndOrder = await sendTermsAndOrderRecievedEmail(req.body);

    if (emailRedirected && sendTermsAndOrder) {
        res.status(200).send("Order recieved");
    }else{
        res.status(400).send("Email could not be sent. Please call us to complete your order!");
    }
})

app.post('/create-pdf', async (req, res)=>{
    let emailRedirected = await redirectEmail(req.body);
    let sendTermsAndOrder = await sendTermsAndOrderRecievedEmail(req.body);

    if (emailRedirected && sendTermsAndOrder) {

        //To Create a pdf file
        pdf.create(pdfTemplate(req.body),{}).toFile('order.pdf',(err)=>{
            if(err){
                res.send(Promise.reject());
            }
    
            res.send(Promise.resolve());
        })
    }else{
        res.status(400).send("Email could not be sent. Please call us to complete your order!");
    }
})

//Get - PDF fetcing
app.get('/get-pdf', (req, res)=>{
   res.sendFile(`${__dirname}/order.pdf`);
})

app.listen(port, ()=> console.log("listening on port", port));

//Fonts and Colors as variables
const linksOfFonts = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&family=Mitr:wght@200;400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
`;

const stylesMap = {
    ['mainFont']: `font-family: "Mitr", sans-serif; font-weight: 400; font-style: normal;`, 
    ['baseFont']: ` font-family: "Mitr", sans-serif; font-weight: 200; font-style: normal;`, 

    ['titleFont']: `font-family: "Lora", serif; font-optical-sizing: auto; font-weight: 600; font-style: normal;`,
    ['extraLightFont']: `font-family: "Lora", serif; font-optical-sizing: auto; font-weight: 400; font-style: normal;`, 

    ['mediumFont']: `font-family: "Raleway", sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal;`,
    ['regularFont']: `font-family: "Raleway", sans-serif; font-optical-sizing: auto; font-weight: 400; font-style: normal;`,

    ['primaryColor']: '#66C2C9',
    ['secondaryColor']: '#70A054',
    ['thirdColor']: '#93032E',
    ['fourthColor']: '#FDCA40',
    ['lightColor']: '#DBD3D8',
};

//Email conf
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: userEmail,
        pass: userPassword
    }
});

// cohabitTest@hotmail.com
// testCohabit1!

const logoURL = "https://cohabit.se/wp-content/uploads/2022/07/cropped-Copy-of-COHABIT-horizontal-2.png";

const currentTime = new Date();
let now = `${currentTime.getDate()}. ${currentTime.getMonth() + 1}. ${currentTime.getFullYear()}`;

// Defines email options
const mailOptions = {
    from: `Cohabit.se <${userEmail}>`,
    to: 'cohabitTest@hotmail.com',
    subject: 'New Order',
};

//Prepares the email configurations to Cohabit
const redirectEmail = async ({ name, customerId, email, phonenumber, period, address, timePreference, deliveryDate, deliveryCharge, orderList, anythingElse, userConsent, total, totalCost}) => {
    let ordersSection = getListOfOrders(orderList, "redirectEmail");

    mailOptions.to = 'cohabitTest@hotmail.com';
    mailOptions.subject = "New Order";
    mailOptions.attachments=[];
    mailOptions.html = `
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Order</title>
        <style>
            .titleText{
                text-align: center;
            }
            .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica';
            color: #555;
            }
            .margin-top {
            margin-top: 50px;
            }
            .justify-center {
            text-align: center;
            }
            .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            }
            .invoice-box table td {
            padding: 5px;
            vertical-align: top;
            }
            .invoice-box table tr td:nth-child(2) {
            text-align: right;
            }
            .invoice-box table tr.top table td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
            }
            .invoice-box table tr.information table td {
            padding-bottom: 15px;
            border-right: 1px solid #eee;
            }
            .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            border-right: 1px solid #eee;
            }
            .invoice-box table tr.details td {
            padding-bottom: 20px;
            }
            .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
            }
            .invoice-box table tr.item.last td {
            border-bottom: none;
            }
            .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
            }

            .informationTable {
                border-collapse: collapse;
                width: 100%;
            }

            .informationTable th, td {
                border-bottom: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            .invoice-box table tr.information table td:first-child{
                background: #eee;
                font-weight: bold;
            }
            .informationTable th {
                width: 40%;
            }

            .informationTable td {
                width: 50%;
            }

            @media only screen and (max-width: 600px) {
                .invoice-box table tr.top table td {
                width: 100%;
                display: block;
                text-align: center;
                }
                .invoice-box table tr.information table td {
                width: 100%;
                display: block;
                text-align: center;
                }
            }

        </style>
    </head>
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                <td colspan="5">
                    <table>
                        <tr>
                            <td class="title">
                            <img src=${logoURL}
                            style="width:100%; max-width:156px;">
                            </td>
                            <td>
                                Date: ${now}
                            </td>
                        </tr>
                    </table>
                    <h2 class="titleText">New Order</h2>
                </td>
                </tr>
                <tr class="information">
                <td colspan="5">
                    <table class="informationTable">
                        <tr>
                            <td>Customer Name</td>
                            <td>${name}</td>
                        </tr>
                        <tr>
                            <td>E-mail</td>
                            <td>${email}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>${phonenumber}</td>
                        </tr>
                        <tr>
                            <td>Delivery Address</td>
                            <td>${address}</td>
                        </tr>
                        <tr>
                            <td>Date Of Delivery</td>
                            <td>${deliveryDate}</td>
                        </tr>
                        <tr>
                            <td>Time preference for Delivery</td>
                            <td>${timePreference}</td>
                        </tr>
                        <tr>
                            <td>Delivery Charge</td>
                            <td>${deliveryCharge}</td>
                        </tr>
                        <tr>
                            <td>Renting Period</td>
                            <td>${period}</td>
                        </tr>
                        <tr>
                            <td>Total Cost</td>
                            <td>${totalCost}</td>
                        </tr>
                        <tr>
                            <td>User Consent</td>
                            <td>${userConsent ? "Accepted" : "Not accepted"}</td>
                        </tr>
                        <tr>
                            <td>Any  special requests?</td>
                            <td>${anythingElse}</td>
                        </tr>
                    </table>
                    <h4 class="title">Order Summery:<span style="font-weight: 500; margin-left: 5px;">${orderList[0].name}</span></h4>
                </td>
                </tr>
                <tr class="heading">
                    <td>Quantity</td>
                    <td>Product</td>
                </tr>
                ${ordersSection}
            </table>
            <br />
        </div>
    </body>
</html>
    `;

    return sendMail(mailOptions);
}

const getListOfOrders = (orderList, domain) => {
    // let furnitureUrl = "https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/Bundle.jpeg?raw=true";

    let section = ``;
    
    orderList.forEach(order => {
 
        if(domain === "@hotmail.com") {

            section += `
            <div class="orderDetailsBox marginBottom">
                    <img class="furnitureImg" src="${order.githubIMGURL}" alt="furnitureImg">
                    <div class="orderDetails regularFont">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                                <td style="border-bottom: 1px solid #ddd;">
                                    <div class="orderDetailContent">
                                        <p style="width: 35%; text-align: left; font-weight: bold;">Product:</p>
                                        <p style="width: 65%; text-align: right;">${order.name}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="orderDetailContent">
                                        <p style="width: 35%; text-align: left; font-weight: bold;">Price:</p>
                                        <p style="width: 65%; text-align: right;">${order.cost}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="orderDetailContent">
                                        <p style="width: 40%; text-align: left; font-weight: bold;">Quantity:</p>
                                        <p style="width: 60%; text-align: right;">${order.quantity}</p>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
        }
        else if (domain === "redirectEmail"){
            section += `
                <tr class="item">
                    <td>${order.quantity}</td>
                    <td>${order.name}</td>
                </tr>
            `;
        }
        else{
            section+= `
            <tr>
                <td style="border-bottom: 1px solid #ddd;">
                    <div class="orderDetailContent">
                        <p style="width: 35%; text-align: left; font-weight: bold;">Product:</p>
                        <p style="width: 65%; text-align: right;">${order.name}</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="orderDetailContent">
                        <p style="width: 35%; text-align: left; font-weight: bold;">Price:</p>
                        <p style="width: 65%; text-align: right;">${order.cost}</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div class="orderDetailContent">
                        <p style="width: 35%; text-align: left; font-weight: bold;">Quantity:</p>
                        <p style="width: 65%; text-align: right;">${order.quantity}</p>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding-bottom: 20px;">
                    <p style="width: 35%; text-align: left; font-weight: bold;">   </p>
                    <p style="width: 65%; text-align: right;">   </p>
                </td>
            </tr>
            `;
        }
    });

    return section;
}

//Prepares the email configurations to customer with attached "Cohabit terms.pdf" file
const sendTermsAndOrderRecievedEmail = async ({ name, customerId, email, domain, period, address, timePreference, deliveryDate, deliveryCharge, orderList, anythingElse, userConsent, total, totalCost}) => {
    let ordersSection = getListOfOrders(orderList, domain);

    mailOptions.to = email;
    mailOptions.subject = "Order Received";
    mailOptions.attachments = [
        {
            filename: 'Cohabit_Terms_of_Renting_2024.pdf', // Name of the attached file
            path: __dirname + '/Cohabit_Terms_of_Renting_2024.pdf', // Path to the PDF file
            contentType: 'application/pdf' // Content type of the attachment
        }
    ];


    mailOptions.html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&family=Mitr:wght@200;400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <title>Cohabit - Order Received</title>
        <style>
            /* Global styles */
            .regularFont{
                font-family: "Raleway", sans-serif; 
                font-optical-sizing: auto; 
                font-weight: 400; 
                font-style: normal;
            }
            .meduimFont{
                font-family: "Raleway", sans-serif; 
                font-optical-sizing: auto; 
                font-weight: 400; 
                font-style: normal;
            }
            .marginBottom{
                margin-bottom: 20px;
            }
    
            body {
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
                color: #000;
            }
            .container {
                max-width: 800px;
                margin: auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                background-color: #fff;
            }
            h2, h3, h5 {
                margin: 0;
                font-family: "Lora", serif; 
                font-optical-sizing: auto; 
                font-weight: 600; 
                font-style: normal;
            }
            p {
                margin: 5px 0;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
            img {
                max-width: 80%;
                height: auto;
            }
    
            /* Order received box */
            .orderRecievedBox {
                text-align: center;
                margin-bottom: 20px;
                padding: 20px;
                background-color: #66C2C9;
                color: #fff;
                border-radius: 5px;
            }
            .orderRecievedCircle {
                display: inline-block;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background-color: #fff;
                line-height: 100px;
                margin-bottom: 20px;
            }
    
            /* Order details */
            .orderDetails {
                padding: 20px 15px 20px 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                color: #000;
            }
            .orderDetails h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .orderDetail {
                border-top: 1px solid #ddd;
                padding: 10px 0;
            }
    
            /* Payment details */
            .paymentDetails {
                padding: 10px 15px;
                color: #000;
            }
            .paymentDetails h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .paymentDetail {
                border-top: 1px solid #ddd;
                padding: 10px 0;
            }
            .paymentDetail p{
                display: flex;
                justify-content: space-between;
            }
    
            /* Note */
            .note {
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                color: #000;
            }
            .note h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .note ul li {
                margin-bottom: 7px;
            }
            /* Social media */
            .socialMedia {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                max-width: 760px;
            }
            .socialMedia h2 {
                color: #000000;
                margin-bottom: 10px;
                text-align: center;
            }
            .icons {
                text-align: center;
                width: 100%;
            }
            .icons a {
                display: inline-block;
                width: 40px;
            }
            .orderDetailsBox {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
            }
       
            .furnitureImg {
                width: 30%;
                max-width: 180px;
            }
    
            .orderDetails {
                width: 65%;
                width: 95%;
                display: flex;
                flex-direction: column;
                text-align: right;
            }

            .orderDetails table {
                width: 100%;
                text-align: right;
            }
            .orderDetails table tr td div p:last-child{
                margin-left: auto;
            }
            .orderDetailContent {
                display: flex;
                justify-content: space-between;
                padding: 5px 0;
                width: 100%;
                color: #000;
            }
    
            .orderDetailContent p {
                margin: 0;
            }

            .deliveryDetail {
                width: 100%;
                padding: 10px 15px;
            }
            .deliveryDetail h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .logo {
                margin-bottom: 5px;
            }
            .logo img {
                width: 60%;
                max-width: 225px;
                height: auto;
            }
            .welcome-text {
                border-top: 1px solid #ddd;
                margin-bottom: 20px;
                color: #000;
                padding-top: 20px;
            }
            .welcome-text p:first-child strong{
                font-weight: bold;
            }
            .total-cost {
                padding: 15px;
                border-radius: 5px;
            }
            .total-cost h3 {
                margin-top: 0;
                margin-bottom: 10px;
                color: #000000;
                text-align: center;
            }
            .cost-details {
                border-top: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                padding: 10px 0;
            }
            .item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .item p {
                margin: 0;
                color: #000000;
            }
            .total-price {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                font-weight: bold;
                width: 100%;
                color: #000;
            }
            .orderInfoTitle{
                padding: 20px 0;
                width: 100%;
                text-align: center;
                margin-bottom: 15px;
                color: #000;
            }
            .orderInfoTitle h5{
                margin-top: 10px;
            }
            @media only screen and (max-width: 600px) {
             
                .orderDetails{
                    width: 100%;
                }
                .furnitureImg{
                    width: 20%;
                    margin-right: 5px;
                }
                .deliveryBox{
                    flex-direction: column;
                }
            }
    
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://cohabit.se/wp-content/uploads/2022/07/cropped-Copy-of-COHABIT-horizontal-2.png" alt="Logo">
            </div>
            <div class="welcome-text regularFont">
                <p><strong class="regularFont">Hello ${name}</strong>,</p>
                <p style="color: #000;">We've received your order and will contact you as soon as possible. Order information and Terms of renting can be found down below. To confirm your order, please make a payment to the account details below and we will send a confirmation upon payment receipt.</p>
                <p style="color: #000;">If you have further questions you can contact us through <a className='link' href="mailto:hello@cohabit.se">hello@cohabit.se</a> or you can also book a call with us <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2cEEdCFOzTPUR_eIxwtrtMJ-CiFl_XHn6mexmLRyY6gwwqd1IoKt6xiAO1ljzynh763vT1fCq4" class="link">here</a>.</p>
            </div>
    
            <!-- Order received -->
            <div class="orderRecievedBox">
                <h2 style="margin-bottom: 20px;">ORDER RECEIVED!</h2>
                <div class="orderRecievedCircle">
                    <img class="checkIcon" src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/checkmark.png?raw=true" alt="Checkmark">
                </div>
                <h3>Thanks for choosing Cohabit, ${name}!</h3>
            </div>
    
            <div class="orderInfoTitle">
                <h2>Order Details</h2>
                <h5>${now}</h5>
            </div>
    

            <div class="orderDetails regularFont">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    ${ordersSection}
                </table>
            </div>

            
            <div class="total-cost regularFont">
                <h3>Total Cost</h3>
                <div class="cost-details">
                    <div class="item">
                        <p style="width: 35%; text-align: left; font-weight: bold;">Bundle Price:</p>
                        <p style="width: 65%; text-align: right;">${total} kr</p>
                    </div>
                    <div class="item">
                        <p style="width: 35%; text-align: left; font-weight: bold;">Shipping:</p>
                        <p style="width: 65%; text-align: right;">${deliveryCharge} kr</p>
                    </div>
                </div>
                <div class="total-price">
                    <p style="width: 35%; text-align: left; font-size: 18px;">Total price:</p>
                    <p style="width: 65%; text-align: right; font-size: 18px;">${totalCost} kr</p>
                </div>
            </div>
            
    
            <!-- Delivery Details -->
            <div class="orderDetailsBox">
                <div class="deliveryDetail">
                    <h3>Delivery Details</h3>
                    <div class="orderDetail regularFont">
                        <div class="orderDetailContent">
                            <p style="width: 35%; text-align: left; font-weight: bold;">Address:</p>
                            <p style="width: 65%; text-align: right;">${address}</p>
                        </div>
                        <div class="orderDetailContent">
                            <p style="width: 50%; text-align: left; font-weight: bold;">Delivery Date:</p>
                            <p style="width: 50%; text-align: right;">${deliveryDate}</p>
                        </div>
                        <div class="orderDetailContent">
                            <p style="width: 50%; text-align: left; font-weight: bold;">Delivery Time:</p>
                            <p style="width: 50%; text-align: right;">${timePreference}</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <!-- Payment details -->
            <div class="paymentDetails">
                <h3>Payment Details</h3>
                <div class="paymentDetail regularFont">
                    <p><strong style="width: 40%;">Euro Bank a/c:</strong> <span style="width: 65%; text-align: right;">Revolut</span></p>
                    <p><strong style="width: 35%;">Beneficiary:</strong> <span style="width: 65%; text-align: right;">Maximillian Pangerl</span></p>
                    <p><strong style="width: 50%;">Revolut shortcut:</strong> <span style="width: 50%; text-align: right;">@maximim8at</span></p>
                    <p><strong style="width: 35%;">Email:</strong> <span style="width: 65%; text-align: right;"><a href="mailto:m.pangerl97@gmail.com">m.pangerl97@gmail.com</a></span></p>
                    <p><strong style="width: 35%;">EBAN:</strong> <span style="width: 65%; text-align: right;">LT48 3259 9678 7219 6968</span></p>
                    <p><strong style="width: 35%;">BIC:</strong> <span style="width: 65%; text-align: right;">REVOLT21</span></p>
                    <p style="margin: 20px 0px;">If in case, you are asked for an address, please use the official Revolut Bank address:</p>
                    <p><strong style="width: 35%;">Country:</strong> <span style="width: 65%; text-align: right;">Lituania</span></p>
                    <p><strong style="width: 35%;">Address:</strong> <span style="width: 65%; overflow: scroll;text-align: right;">REVOLUT BANK UAB, Konstitucijos ave. 21Bm Vilnius, LT-08130</span></p>
                </div>
            </div>        
    
            <!-- Note -->
            <div class="note regularFont">
                <h3>Kindly Note</h3>
                <p><strong>Images shared in this document are indicative of the type of furniture that can be expected. The exact furniture delivered could be slightly different based on availability.</strong></p>
                <ul>
                    <li >If you have strong preferences for color, style, etc., kindly mention them at the time of placing the order.</li>
                    <li>All products are delivered to the customer after thorough cleaning and sanitization.</li>
                    <li>Quality checks are performed to ensure full functionality of every product.</li>
                </ul>
            </div>
            
    
            <!-- Social media -->
            <div class="socialMedia">
                <h3 style="text-align: center; color: #000;">Join us on Social Media!</h3>
                <h5 style="margin-bottom: 10px; color: #555; text-align: center;">#Cohabit</h5>
                <div class="icons" style="text-align: center;width: 100%;">
                    <a href="https://www.facebook.com/cohabit.se" target="_blank"><img src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/fb.png?raw=true" alt="Facebook"></a>
                    <a href="https://www.instagram.com/cohabit.se/" target="_blank"><img src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/instagram.png?raw=true" alt="Instagram"></a>
                    <a href="https://twitter.com" target="_blank"><img src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/twitter.png?raw=true" alt="Twitter"></a>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    if(domain === "@hotmail.com"){
        mailOptions.html = `        
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&family=Mitr:wght@200;400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
        <title>Cohabit - Order Received</title>
        <style>
            /* Global styles */
            .regularFont{
                font-family: "Raleway", sans-serif; 
                font-optical-sizing: auto; 
                font-weight: 400; 
                font-style: normal;
            }
            .meduimFont{
                font-family: "Raleway", sans-serif; 
                font-optical-sizing: auto; 
                font-weight: 400; 
                font-style: normal;
            }
            .marginBottom{
                margin-bottom: 20px;
            }
    
            body {
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
                color: #000;
            }
            .container {
                max-width: 800px;
                margin: auto;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                background-color: #fff;
            }
            h2, h3, h5 {
                margin: 0;
                font-family: "Lora", serif; 
                font-optical-sizing: auto; 
                font-weight: 600; 
                font-style: normal;
            }
            p {
                margin: 5px 0;
            }
            a {
                color: #007bff;
                text-decoration: none;
            }
            img {
                max-width: 80%;
                height: auto;
            }
    
            /* Order received box */
            .orderRecievedBox {
                text-align: center;
                margin-bottom: 20px;
                padding: 20px;
                background-color: #66C2C9;
                color: #fff;
                border-radius: 5px;
            }
            .orderRecievedCircle {
                display: inline-block;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background-color: #fff;
                line-height: 100px;
                margin-bottom: 20px;
            }
    
            /* Order details */
            .orderDetails {
                padding: 20px 15px 20px 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                color: #000;
            }
            .orderDetails h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .orderDetail {
                border-top: 1px solid #ddd;
                padding: 10px 0;
            }
    
            /* Payment details */
            .paymentDetails {
                padding: 10px 15px;
                color: #000;
            }
            .paymentDetails h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .paymentDetail {
                border-top: 1px solid #ddd;
                padding: 10px 0;
            }
            .paymentDetail p{
                display: flex;
                justify-content: space-between;
            }
    
            /* Note */
            .note {
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                color: #000;
            }
            .note h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .note ul li {
                margin-bottom: 7px;
            }
            /* Social media */
            .socialMedia {
                background-color: #f9f9f9;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
                max-width: 760px;
            }
            .socialMedia h2 {
                color: #000000;
                margin-bottom: 10px;
                text-align: center;
            }
            .icons {
                text-align: center;
                width: 100%;
            }
            .icons a {
                display: inline-block;
                width: 40px;
            }
            .orderDetailsBox {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 100%;
            }
       
            .furnitureImg {
                width: 30%;
                max-width: 180px;
                min-width: 120px;
            }
    
            .orderDetails {
                width: 100%;
                display: flex;
                flex-direction: column;
                text-align: right;
            }
            .orderDetails table {
                width: 100%;
                text-align: right;
            }
            .orderDetails table tr td div p:last-child{
                margin-left: auto;
            }
            .orderDetailContent {
                display: flex;
                justify-content: space-between;
                padding: 5px 0;
                width: 100%;
                color: #000;
            }
    
            .orderDetailContent p {
                margin: 0;
            }
    

            .deliveryDetail {
                width: 100%;
                padding: 10px 15px;
            }
            .deliveryDetail h2 {
                color: #000000;
                margin-bottom: 10px;
            }
            .logo {
                margin-bottom: 5px;
            }
            .logo img {
                width: 60%;
                max-width: 225px;
                height: auto;
            }
            .welcome-text {
                border-top: 1px solid #ddd;
                margin-bottom: 20px;
                color: #000;
                padding-top: 20px;
            }
            .welcome-text p:first-child strong{
                font-weight: bold;
            }
            .total-cost {
                padding: 15px;
                border-radius: 5px;
            }
            .total-cost h3 {
                margin-top: 0;
                margin-bottom: 10px;
                color: #000000;
                text-align: center;
            }
            .cost-details {
                border-top: 1px solid #dddddd;
                border-bottom: 1px solid #dddddd;
                padding: 10px 0;
            }
            .item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
            }
            .item p {
                margin: 0;
                color: #000000;
            }
            .total-price {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                font-weight: bold;
                width: 100%;
                color: #000;
            }
            .orderInfoTitle{
                padding: 20px 0;
                width: 100%;
                text-align: center;
                margin-bottom: 15px;
                color: #000;
            }
            .orderInfoTitle h5{
                margin-top: 10px;
            }
            @media only screen and (max-width: 600px) {
             
                .orderDetails{
                    width: 100%;
                }
                .furnitureImg{
                    height: 120px;
                }
                .deliveryBox{
                    flex-direction: column;
                }
            }
    
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <img src="https://cohabit.se/wp-content/uploads/2022/07/cropped-Copy-of-COHABIT-horizontal-2.png" alt="Logo">
            </div>
            <div class="welcome-text regularFont">
                <p><strong class="regularFont">Hello ${name}</strong>,</p>
                <p style="color: #000;">We've received your order and will contact you as soon as possible. Order information and Terms of renting can be found down below. To confirm your order, please make a payment to the account details below and we will send a confirmation upon payment receipt.</p>
                <p style="color: #000;">If you have further questions you can contact us through <a className='link' href="mailto:hello@cohabit.se">hello@cohabit.se</a> or you can also book a call with us <a href="" class="link">here</a>.</p>
            </div>
    
            <!-- Order received -->
            <div class="orderRecievedBox">
                <h2 style="margin-bottom: 20px;">ORDER RECEIVED!</h2>
                <div class="orderRecievedCircle">
                    <img class="checkIcon" src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/checkmark.png?raw=true" alt="Checkmark">
                </div>
                <h3>Thanks for choosing Cohabit, ${name}!</h3>
            </div>
    
            <div class="orderInfoTitle">
                <h2>Order Details</h2>
                <h5>${now}</h5>
            </div>
    
            ${ordersSection}
        
            <div class="total-cost regularFont">
                <h3>Total Cost</h3>
                <div class="cost-details">
                    <div class="item">
                        <p style="width: 35%; text-align: left; font-weight: bold;">Bundle Price:</p>
                        <p style="width: 65%; text-align: right;">${total} kr</p>
                    </div>
                    <div class="item">
                        <p style="width: 35%; text-align: left; font-weight: bold;">Shipping:</p>
                        <p style="width: 65%; text-align: right;">${deliveryCharge} kr</p>
                    </div>
                </div>
                <div class="total-price">
                    <p style="width: 35%; text-align: left; font-size: 18px;">Total price:</p>
                    <p style="width: 65%; text-align: right; font-size: 18px;">${totalCost} kr</p>
                </div>
            </div>
            
    
            <!-- Delivery Details -->
            <div class="orderDetailsBox">
                <div class="deliveryDetail">
                    <h3>Delivery Details</h3>
                    <div class="orderDetail regularFont">
                        <div class="orderDetailContent">
                            <p style="width: 35%; text-align: left; font-weight: bold;">Address:</p>
                            <p style="width: 65%; text-align: right;">${address}</p>
                        </div>
                        <div class="orderDetailContent">
                            <p style="width: 50%; text-align: left; font-weight: bold;">Delivery Date:</p>
                            <p style="width: 50%; text-align: right;">${deliveryDate}</p>
                        </div>
                        <div class="orderDetailContent">
                            <p style="width: 50%; text-align: left; font-weight: bold;">Delivery Time:</p>
                            <p style="width: 50%; text-align: right;">${timePreference}</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <!-- Payment details -->
            <div class="paymentDetails">
                <h3>Payment Details</h3>
                <div class="paymentDetail regularFont">
                    <p><strong style="width: 40%;">Euro Bank a/c:</strong> <span style="width: 65%; text-align: right;">Revolut</span></p>
                    <p><strong style="width: 35%;">Beneficiary:</strong> <span style="width: 65%; text-align: right;">Maximillian Pangerl</span></p>
                    <p><strong style="width: 50%;">Revolut shortcut:</strong> <span style="width: 50%; text-align: right;">@maximim8at</span></p>
                    <p><strong style="width: 35%;">Email:</strong> <span style="width: 65%; text-align: right;"><a href="mailto:m.pangerl97@gmail.com">m.pangerl97@gmail.com</a></span></p>
                    <p><strong style="width: 35%;">EBAN:</strong> <span style="width: 65%; text-align: right;">LT48 3259 9678 7219 6968</span></p>
                    <p><strong style="width: 35%;">BIC:</strong> <span style="width: 65%; text-align: right;">REVOLT21</span></p>
                    <p style="margin: 20px 0px;">If in case, you are asked for an address, please use the official Revolut Bank address:</p>
                    <p><strong style="width: 35%;">Country:</strong> <span style="width: 65%; text-align: right;">Lituania</span></p>
                    <p><strong style="width: 35%;">Address:</strong> <span style="width: 65%; overflow: scroll;text-align: right;">REVOLUT BANK UAB, Konstitucijos ave. 21Bm Vilnius, LT-08130</span></p>
                </div>
            </div>        
    
            <!-- Note -->
            <div class="note regularFont">
                <h3>Kindly Note</h3>
                <p><strong>Images shared in this document are indicative of the type of furniture that can be expected. The exact furniture delivered could be slightly different based on availability.</strong></p>
                <ul>
                    <li >If you have strong preferences for color, style, etc., kindly mention them at the time of placing the order.</li>
                    <li>All products are delivered to the customer after thorough cleaning and sanitization.</li>
                    <li>Quality checks are performed to ensure full functionality of every product.</li>
                </ul>
            </div>
            
    
            <!-- Social media -->
            <div class="socialMedia">
                <h3 style="text-align: center; color: #000;">Join us on Social Media!</h3>
                <h5 style="margin-bottom: 10px; color: #555; text-align: center;">#Cohabit</h5>
                <div class="icons" style="text-align: center;width: 100%;">
                    <a href="https://www.facebook.com/cohabit.se" target="_blank"><img src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/fb.png?raw=true" alt="Facebook"></a>
                    <a href="https://www.instagram.com/cohabit.se/" target="_blank"><img src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/instagram.png?raw=true" alt="Instagram"></a>
                    <a href="https://twitter.com" target="_blank"><img src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/twitter.png?raw=true" alt="Twitter"></a>
                </div>
            </div>
        </div>
    </body>
    </html>
        `;
    }

    return sendMail(mailOptions);
}

// Sends the email
const sendMail = async (mailOptions)=>{
   try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}





//Post - CV genereations
app.post('/create-cv', async (req, res)=>{
        pdf.create(cvTemplate(),{}).toFile('Resume_Mehmet_Kaan_Taspunar.pdf',(err)=>{
            if(err){
                res.send(Promise.reject());
            }
    
            res.send(Promise.resolve());
        })
    
})

//Get - CV fetcing
app.get('/get-cv', (req, res)=>{
   res.sendFile(`${__dirname}/Resume_Mehmet_Kaan_Taspunar.pdf`);
})