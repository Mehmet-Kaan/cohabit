const logoURL = "https://cohabit.se/wp-content/uploads/2022/07/cropped-Copy-of-COHABIT-horizontal-2.png";
// const logoURL = "../logo.png";

module.exports = ({ name, customerId, email, wpnumber, phonenumber, period, address, studioBundle, largerSingleBed, smallDoubleBed, standardDoubleBed, premiumDoubleBed, twoChairs, fourChairs, largerDiningTable, storageShelves, rug, twoSeaterSofa, threeSeaterSofa, individualFurniture, deliveryDate,timePreference, preferenceFurniture, anythingElse, userConsent, total, SNO, description, dimensions, quantity, furnitureImgUrl }) => {
    const currentTime = new Date();
return `
    <!doctype html>
    <html>
      <head>
         <meta charset="utf-8">
         <title>Order Recieved</title>
         <style>
            .titleText{
               text-align: center;
            }
            .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;

            box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            font-size: 10px;
            line-height: 18px;
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
               width: 60%;
            }

            .noteUL li{
               margin-bottom: 4px;
            }
            .noteUL li:nth-child(2){
               margin-left: 50px;
               list-style: circle;
            }
            .accountInfo {
              
            }
            .accountInfo div {
               width: 50%;
            }
            .accountInfo div p{
               margin: 0;
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
                     <table >
                        <tr >
                           <td class="title">
                              <img src=${logoURL}
                              style="width:100%; max-width:156px;">
                           </td>
                           <td>
                              ${`${currentTime.getDate()}. ${currentTime.getMonth() + 1}. ${currentTime.getFullYear()}`}
                           </td>
                        </tr>
                     </table>
                     <h2 class="titleText">Order Recieved</h2>
                  </td>
               </tr>
               <tr class="information">
                  <td colspan="5">
                     <table class="informationTable">
                        <tr>
                           <td>Customer ID:</td>
                           <td>${customerId}</td>
                        </tr>
                        <tr>
                           <td>Customer Name:</td>
                           <td>${name}</td>
                        </tr>
                        <tr>
                           <td>Delivery Address:</td>
                           <td>${address}</td>
                        </tr>
                        <tr>
                           <td>Date Of Delivery:</td>
                           <td>${deliveryDate}</td>
                        </tr>
                        <tr>
                           <td>Time preference for Delivery:</td>
                           <td>${timePreference}</td>
                        </tr>
                        <tr>
                           <td>Rental Period:</td>
                           <td>${period}</td>
                        </tr>
                        <tr>
                           <td>Monthly Rent:</td>
                           <td>${total} SEK</td>
                        </tr>
                        <tr>
                           <td>Delivery Charges:</td>
                           <td>Standard request: 600 SEK</td>
                        </tr>
                  </table>
                  <h4 class="title">Order Summery:<span style="font-weight: 500; margin-left: 5px;">Custom Student Bundle</span></h4>
                  </td>
               </tr>
               <tr class="heading">
                  <td>S.N o</td>
                  <td>Product Description (including components)</td>
                  <td>Measurements in cms (L/B/H)</td>
                  <td>Quantity</td>
                  <td>Indicative Images</td>
               </tr>
               <tr class="item">
                  <td>${SNO} / 1</td>
                  <td>${description} / Large Single Bed (Mattress with Frame + Legs)</td>
                  <td>${dimensions} / 200x120x45</td>
                  <td>${quantity} / 1</td>
                  <td>${furnitureImgUrl} / img</td>
               </tr>
               <tr class="item">
                  <td>${SNO} / 2</td>
                  <td>${description} / Storage</td>
                  <td>${dimensions} / 45x40x90</td>
                  <td>${quantity} / 1</td>
                  <td>${furnitureImgUrl} / img</td>
               </tr>
            </table>
            <br />
         </div>
      </body>
      </html>
   <!doctype html>
   <html>
    `;
};


//Full Order Confirmation
// return `
//     <!doctype html>
//     <html>
//       <head>
//          <meta charset="utf-8">
//          <title>PDF Result Template</title>
//          <style>
//             .titleText{
//                text-align: center;
//             }
//             .invoice-box {
//             max-width: 800px;
//             margin: auto;
//             padding: 30px;

//             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
//             font-size: 10px;
//             line-height: 18px;
//             font-family: 'Helvetica Neue', 'Helvetica';
//             color: #555;
//             }
//             .margin-top {
//             margin-top: 50px;
//             }
//             .justify-center {
//             text-align: center;
//             }
//             .invoice-box table {
//             width: 100%;
//             line-height: inherit;
//             text-align: left;
//             }
//             .invoice-box table td {
//             padding: 5px;
//             vertical-align: top;
//             }
//             .invoice-box table tr td:nth-child(2) {
//             text-align: right;
//             }
//             .invoice-box table tr.top table td {
//             padding-bottom: 20px;
//             }
//             .invoice-box table tr.top table td.title {
//             font-size: 45px;
//             line-height: 45px;
//             color: #333;
//             }
//             .invoice-box table tr.information table td {
//             padding-bottom: 15px;
//             border-right: 1px solid #eee;
//             }
//             .invoice-box table tr.heading td {
//             background: #eee;
//             border-bottom: 1px solid #ddd;
//             font-weight: bold;
//             border-right: 1px solid #eee;
//             }
//             .invoice-box table tr.details td {
//             padding-bottom: 20px;
//             }
//             .invoice-box table tr.item td {
//             border-bottom: 1px solid #eee;
//             }
//             .invoice-box table tr.item.last td {
//             border-bottom: none;
//             }
//             .invoice-box table tr.total td:nth-child(2) {
//             border-top: 2px solid #eee;
//             font-weight: bold;
//             }

//          .informationTable {
//                border-collapse: collapse;
//                width: 100%;
//             }

//             .informationTable th, td {
//                border-bottom: 1px solid #dddddd;
//                text-align: left;
//                padding: 8px;
//             }

//             .invoice-box table tr.information table td:first-child{
//                background: #eee;
//                font-weight: bold;
//             }
//             .informationTable th {
//                width: 40%;
//             }

//             .informationTable td {
//                width: 60%;
//             }

//             .noteUL li{
//                margin-bottom: 4px;
//             }
//             .noteUL li:nth-child(2){
//                margin-left: 50px;
//                list-style: circle;
//             }
//             .accountInfo {
              
//             }
//             .accountInfo div {
//                width: 50%;
//             }
//             .accountInfo div p{
//                margin: 0;
//             }

//             @media only screen and (max-width: 600px) {
//             .invoice-box table tr.top table td {
//             width: 100%;
//             display: block;
//             text-align: center;
//             }
//             .invoice-box table tr.information table td {
//             width: 100%;
//             display: block;
//             text-align: center;
//             }
//             }

//          </style>
//       </head>
//       <body>
//          <div class="invoice-box">
//             <table cellpadding="0" cellspacing="0">
//                <tr class="top">
//                   <td colspan="5">
//                      <table >
//                         <tr >
//                            <td class="title">
//                               <img src=${logoURL}
//                               style="width:100%; max-width:156px;">
//                            </td>
//                            <td>
//                               ${`${currentTime.getDate()}. ${currentTime.getMonth() + 1}. ${currentTime.getFullYear()}`}
//                            </td>
//                         </tr>
//                      </table>
//                      <h2 class="titleText">Order Confirmation</h2>
//                   </td>
//                </tr>
//                <tr class="information">
//                   <td colspan="5">
//                      <table class="informationTable">
//                         <tr>
//                            <td>Customer ID:</td>
//                            <td>${customerId}</td>
//                         </tr>
//                         <tr>
//                            <td>Customer Name:</td>
//                            <td>${name}</td>
//                         </tr>
//                         <tr>
//                            <td>Delivery Address:</td>
//                            <td>${address}</td>
//                         </tr>
//                         <tr>
//                            <td>Date Of Delivery:</td>
//                            <td>${deliveryDate}</td>
//                         </tr>
//                         <tr>
//                            <td>Time preference for Delivery:</td>
//                            <td>[Time preference for Delivery Value]</td>
//                         </tr>
//                         <tr>
//                            <td>Rental Period:</td>
//                            <td>${period}</td>
//                         </tr>
//                         <tr>
//                            <td>Monthly Rent:</td>
//                            <td>${total} SEK</td>
//                         </tr>
//                         <tr>
//                            <td>Delivery Charges:</td>
//                            <td>Standard request: 600 SEK</td>
//                         </tr>
//                   </table>
//                   <h4 class="title">Order Summery:<span style="font-weight: 500; margin-left: 5px;">Custom Student Bundle</span></h4>
//                   </td>
//                </tr>
//                <tr class="heading">
//                   <td>S.N o</td>
//                   <td>Product Description (including components)</td>
//                   <td>Measurements in cms (L/B/H)</td>
//                   <td>Quantity</td>
//                   <td>Indicative Images</td>
//                </tr>
//                <tr class="item">
//                   <td>${SNO} / 1</td>
//                   <td>${description} / Large Single Bed (Mattress with Frame + Legs)</td>
//                   <td>${dimensions} / 200x120x45</td>
//                   <td>${quantity} / 1</td>
//                   <td>${furnitureImgUrl} / img</td>
//                </tr>
//                <tr class="item">
//                   <td>${SNO} / 2</td>
//                   <td>${description} / Storage</td>
//                   <td>${dimensions} / 45x40x90</td>
//                   <td>${quantity} / 1</td>
//                   <td>${furnitureImgUrl} / img</td>
//                </tr>
//             </table>
//             <br />

//             <div class="note">
//                <h4>Kindly Note:</h4>
//                <ul class="noteUL">
//                   <li style="font-weight: bold;">Images shared in this document are indicative of the type of furniture that can be expected. The exact furniture delivered could be slightly different based on availability.</li>
//                   <li>If you have strong prefences for color, style, etc, kindly mention them at the time of placing the order.</li>                  
                     
//                   <li>All the products are delivered to the costumer after through cleaning and sanitization</li>
//                   <li>Quality check is performed to ensure full functionality is assured on every product.</li>
//                </ul>
//             </div>
//             <div class="note">
//                <h4>Next Steps:</h4>
//                <p>If you are ready to confirm the order, Kindly make a refundable deposit equivalent to one month´s rent on the furniture selected. The account details for making the payment are below:</p>
//                <div class="accountInfo">
//                <table>
//                   <tr class="item">
//                      <td style="width: 50%;">
//                         <p style="margin:0; margin-bottom: 5px;">Euro Bank a/c: Revolut</p>
//                         <p style="margin: 0;">Beneficiary: Maximillian Pangerl</li>
//                         <p style="margin: 0;">Revolut shortcut: @maximim8at</li>
//                         <p style="margin: 0; margin-bottom: 5px;">Email: <a href="mailto:m.pangerl97@gmail.com">m.pangerl97@gmail.com</a></p>
//                         <p style="margin: 0;">EBAN: LT48 3259 9678 7219 6968</p>
//                         <p style="margin: 0;">BIC: REVOLT21</p>
//                      </td>
//                      <td style="width: 50%; text-align: start;">
//                         <p style="margin: 0;">If in case, you are asked for and address, please use hte official Revolut Bank address:</p>
//                         <p style="margin: 0;">Country: Lituania</p>
//                         <p style="margin: 0;">Address: REVOLUT BANK UAB, Konstitucijos ave. 21Bm Vilnius, LT-08130.</p>
//                      </td>
//                   </tr>
//                  </table>
//                </div>            
//             </div>
//          </div>
//       </body>
//       </html>
//    <!doctype html>
//    <html>
//     `;
