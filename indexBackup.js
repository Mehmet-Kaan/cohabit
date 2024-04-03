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
const redirectEmail = async ({ name, customerId, email, wpnumber, phonenumber, period, address, timePreference,studioBundle, largerSingleBed, smallDoubleBed, standardDoubleBed, premiumDoubleBed, twoChairs, fourChairs, largerDiningTable, storageShelves, rug, twoSeaterSofa, threeSeaterSofa, deliveryDate, anythingElse, userConsent, total, SNO, quantity}) => {
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
                            <td>Renting Period</td>
                            <td>${period}</td>
                        </tr>
                        <tr>
                            <td>Any  special requests?</td>
                            <td>${anythingElse}</td>
                        </tr>
                        <tr>
                            <td>User Consent</td>
                            <td>${userConsent ? "Accepted" : "Not accepted"}</td>
                        </tr>
                    </table>
                    <h4 class="title">Order Summery:<span style="font-weight: 500; margin-left: 5px;">Custom Student Bundle</span></h4>
                </td>
                </tr>
                <tr class="heading">
                    <td>Quantity</td>
                    <td>Product</td>
                </tr>
                <tr class="item">
                    <td>${quantity}</td>
                    <td>Large Single Bed (Mattress with Frame + Legs)</td>
                </tr>
            </table>
            <br />
        </div>
    </body>
</html>
    `;

    return sendMail(mailOptions);
}

//Prepares the email configurations to customer with attached "Cohabit terms.pdf" file
const sendTermsAndOrderRecievedEmail = async ({ name, customerId, email, wpnumber, phonenumber, period, address, timePreference, studioBundle, largerSingleBed, smallDoubleBed, standardDoubleBed, premiumDoubleBed, twoChairs, fourChairs, largerDiningTable, storageShelves, rug, twoSeaterSofa, threeSeaterSofa, deliveryDate, anythingElse, userConsent, total, SNO, quantity}) => {
    let furnitureUrl = "https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/Bundle.jpeg?raw=true";
    
    mailOptions.to = email;
    mailOptions.subject = "Order Recieved";
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
    <meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@600&family=Mitr:wght@200;400&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

    <title>Cohabit - Order Received</title>
    <style>
        .content {
            max-width: 800px;
            margin: auto;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 16px;
            line-height: 18px;
        }
        .logoBox{
            width: 100%;
            display: flex;
            justify-content: center;
        }
        .section{
            margin-top: 20px;
            border-top: 1px solid #ddd;
        }
        .welcome{
            padding: 0px 5px;
        }
        .welcome > p{
            margin: revert;
            ${stylesMap.regularFont}
        }
        .welcome p:first-child{
            ${stylesMap.mediumFont}
            font-weight: bold
        }
        .note{
            border-top: 1px solid #ddd;
            padding: 0px 15px;
            ${stylesMap.regularFont}
        }
        .noteUL li{
            margin-bottom: 4px;
        }

        /* Thansk for your order part */
        .orderRecievedBox{
            display: flex;
            display: block;
            justify-content: space-evenly;
            align-items: center;
            flex-direction: column;

            width: 100%;
            color: white;
            background-color: ${stylesMap.primaryColor};
            gap: 10px;
        }
        .orderRecievedCircle {
            width: 90px;
            height: 90px;
            background-color: white;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            left: calc(50% - 45px);
            margin-bottom:35px;
        }
        .checkIcon {
            color: white;
            font-size: 100px;
        }
        .orderRecievedBox p{
            margin: 0;
            width: 90%;
            ${stylesMap.mediumFont}
        }

        /* Order details */
        .orderInfoTitle{
            height: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 20px;
        }

        h2, h3, h5{
            ${stylesMap.titleFont}
            margin: 0;
        }
        .orderInfoTitle h5{
            color: #555;
        }
        .orderDetailsBox{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
        }
        .furnitureImg{
            width: 30%;
            max-width: 180px;
        }
        .orderDetails{
            width: 65%;
            display: flex;
            flex-direction: column;
        }
        .orderDetail{
            border-top: 1px solid #a0d5ea;
            border-top: 1px solid #ddd;
            padding: 10px 15px;
            ${stylesMap.regularFont}
        }
        .orderDetailContent{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }
        .orderDetailContent h3,p {
            margin: 5px;
        }
        .orderDetailContent p {
            ${stylesMap.regularFont}
        }
        .totalCost, .deliveryBox{
            display: flex;
            justify-content: space-around;
            width: 100%;
            flex-direction: column;
        }
        .deliveryBox{
            flex-direction: row;
            justify-content: space-between;
        }
        .deliveryDetail {
            width: 100%;
            border-top: 1px solid #ddd;
            padding: 10px 15px;
        }
        .direction{
            flex-direction: column;
        }
        .icons{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            min-height: 40px;
            gap: 20px;
        }
        .icons a{
            width: 6vw;
            max-width: 48px;
        }
        .followLogo{
            width: 100%;
        }
        #paymentDetailsP{
            ${stylesMap.regularFont}
        }
        .checkmark{
            width:75%;
        }
        @media only screen and (max-width: 600px) {
            .orderRecievedBox h2{
                font-size: 20px;
                text-align: center;
            }
            .orderRecievedBox > p{
                font-size: 15px;
                text-align: center;
            }

            .orderInfoTitle{
                height: 110px;
            }
            .orderDetailsBox{
                flex-direction: column;
                align-items: center;
            }
            .orderDetails{
                width: 100%;
            }
            .furnitureImg{
                width: 50%;
            }
            .deliveryBox{
                flex-direction: column;
            }
            .deliveryDetail{
                width: auto;
            }
        }

    </style>
    </head>
    <body>
    <div class="content">
        <div class="logoBox">
            <img src="https://mehmet-kaan.github.io/cohabit/static/media/COHABIT-horizontal.5582d01b7d675537aca2.png"
            style="width:60%; max-width:225px;">
        </div>

        <div class="section">
            <div class="welcome">
                <p class="welcomeP">Hello ${name},</p>
                <p class="welcomeP">We've received your order and will contact you as soon as possible. Order information and Terms of renting can be found down below. To confirm your order, please make a payment to the account details below and we will send a confirmation upon payment receipt.</p>
                <p class="welcomeP">If you have further questions you can contact us through <a className='link' href="mailto:hello@cohabit.se">hello@cohabit.se</a> or you can also book a call with us <a href="" class="link">here</a>.</p>
            </div>
            <div class="orderRecievedBox">
                <h2 class="titleText" style="text-align: center;margin: 0px 0px 35px 0px;padding-top: 20px;">ORDER RECEIVED!</h2>
                <div class="orderRecievedCircle">
                    <img class="checkmark" src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/checkmark.png?raw=true">
                </div>
                <h2 style="text-align: center;padding-bottom: 20px;">Thanks for choosing Cohabit, ${name}!</h2>
            </div>
        </div>

        <div class="orderInfoTitle">
            <h2>Order Details</h2>
            <h5>${now}</h5>
        </div>
        <div class="orderDetailsBox">
            <img class="furnitureImg" src="${furnitureUrl}" alt="furnitureImg">
            <div class="orderDetails">
                <div class="orderDetail">
                    <div class="orderDetailContent">
                        <h3><strong>Custom Student Bundle</strong></h3>
                        <p style="min-width: 46px;">299 kr</p>
                    </div>

                </div>
                <div class="orderDetail">
                    <div class="orderDetailContent">
                        <p>Product ID:</p>
                        <p>123123:</p>
                    </div>
                    <div class="orderDetailContent">
                        <p>Dimensions:</p>
                        <p>240x220</p>
                    </div>
                    <div class="orderDetailContent">
                        <p>Weight:</p>
                        <p>50 kg</p>
                    </div>
                    <div class="orderDetailContent">
                        <p>Quantity:</p>
                        <p>1</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Total Cost -->
        <div class="orderInfoTitle" style="height: 60px;">
            <h3>Total Cost</h3>
        </div>
        <div class="orderDetailsBox">
            <div class="totalCost">
                <div class="orderDetail">
                    <div class="orderDetailContent">
                        <p>Bundle price:</p>
                        <p>299 kr</p>
                    </div>
                    <div class="orderDetailContent">
                        <p>Shipping price:</p>
                        <p>600 kr</p>
                    </div>
                </div>
                <div class="orderDetail">
                    <div class="orderDetailContent">
                        <h3><strong>Total price</strong></h3>
                        <h3><strong>${total} kr</strong></h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delivery -->
        <div class="orderDetailsBox" style="margin-top: 30px;">
            <div class="deliveryBox">
                
                <div class="deliveryDetail">
                    <h3 style="margin: revert;">Delivery Details</h3>

                    <div class="orderDetailContent">
                        <p>Adress:</p>
                        <p style="max-width: 65%; overflow: scroll;">${address}</p>
                    </div>
                    <div class="orderDetailContent">
                        <p>Date:</p>
                        <p>2024/06/21</p>
                    </div>
                    <div class="orderDetailContent">
                        <p>Time:</p>
                        <p>09:00-12:00</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment -->
        <div class="orderDetailsBox direction" style="border-top: 1px solid #ddd; margin-top: 30px;">
            <h2 style="text-align: center; margin: revert;">Payment Details</h2>
            <p id="paymentDetailsP">If you are ready to confirm the order, Kindly make a refundable deposit equivalent to one month´s rent on the furniture selected. The account details for making the payment are below:</p>
            <div class="totalCost">

                <div class="orderDetail" style="border-top: none;">
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">Euro Bank a/c:</span></p>
                        <p>Revolut</p>
                    </div>
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">Beneficiary:</span></p>
                        <p>Maximillian Pangerl</p>
                    </div>
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">Revolut shortcut:</span></p>
                        <p>@maximim8at</p>
                    </div>
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">Email:</span></p>
                        <p><a href="mailto:m.pangerl97@gmail.com">m.pangerl97@gmail.com</a></p>
                    </div>
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">EBAN:</span></p>
                        <p>LT48 3259 9678 7219 6968</p>
                    </div>
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">BIC:</span></p>
                        <p>REVOLT21</p>
                    </div>
                    <div class="orderDetailContent" style="margin-top: 10px; font-size: 16px;">
                        <p>If in case, you are asked for and address, please use the official Revolut Bank address:</p>
                    </div>
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">Country:</span></p>
                        <p>Lituania</p>
                    </div>
                    <div class="orderDetailContent">
                        <p><span style="font-weight: bold;">Address:</span></p>
                        <p style="max-width: 55%; overflow: scroll;">REVOLUT BANK UAB, Konstitucijos ave. 21Bm Vilnius, LT-08130</p>
                    </div>
                </div>
            </div>            
        </div>

        <!-- Kindly note -->
        <div class="note">
            <h3 style="margin: revert;">Kindly Note</h3>
            <ul class="noteUL">
                <li style="font-weight: bold;">Images shared in this document are indicative of the type of furniture that can be expected. The exact furniture delivered could be slightly different based on availability.</li>
                <li>If you have strong prefences for color, style, etc, kindly mention them at the time of placing the order.</li>                  
                
                <li>All the products are delivered to the costumer after through cleaning and sanitization</li>
                <li>Quality check is performed to ensure full functionality is assured on every product.</li>
            </ul>
        </div>

        <!-- Social Media -->
        <div class="orderDetailsBox direction iconsBox" style="border-top: 1px solid #ddd; margin-top: 30px;">
            <h3 style="margin-top: 10px; text-align: center;margin-bottom: 5px;">Join us on Social Media!</h3>
            <h5 style="margin-bottom: 10px; color: #555; text-align: center;">#Cohabit</h5>
            <div class="icons">
                <a href="https://www.facebook.com/cohabit.se" target="_blank"><img class="followLogo" src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/fb.png?raw=true" loading="lazy" alt="facebook"></a>
                <a href="https://www.instagram.com/cohabit.se/" target="_blank"><img class="followLogo" src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/instagram.png?raw=true" loading="lazy" alt="instagram"></a>
                <a href="https://twitter.com" target="_blank"><img class="followLogo" src="https://github.com/Mehmet-Kaan/cohabit/blob/main/src/assets/email/icons/twitter.png?raw=true" loading="lazy" alt="twitter"></a>
            </div>
        </div>
    </div>
    </body>
<html>
    `;
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