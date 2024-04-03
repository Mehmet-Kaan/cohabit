module.exports = () => {
   return `
   <!doctype html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Mehmet Kaan Taspunar - Fullstack Developer</title>
       <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
       <style>
       body {
           font-family: 'Roboto', sans-serif;
           background-color: #f8f9fa;
           margin: 0;
           padding: 0;
           color: #343a40;
           line-height: 1.6;
           font-size:10px;
       }
       .container {
           max-width: 800px;
           margin: auto;
           padding: 20px;
           background: #fff;
           border-radius: 10px;
           box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
       }
       header {
           text-align: center;
           margin-bottom: 30px;
       }
       header h1 {
           color: #343a40;
           font-size: 30px;
           margin-bottom: 5px;
           margin-top: 0;
       }
       header p {
           color: #6c757d;
           font-size: 15px;
       }
       section {
           margin-bottom: 30px;
       }
       h2 {
           color: #343a40;
           font-size: 16px;
           border-bottom: 2px solid #343a40;
           padding-bottom: 5px;
           margin-bottom: 20px;
       }
       ul {
           padding-left: 20px;
       }
       li {
           margin-bottom: 10px;
       }
       a {
           color: #007bff;
           text-decoration: none;
       }
       .highlight {
           background-color: #007bff;
           color: #fff;
           padding: 5px 10px;
           border-radius: 5px;
       }
       .projects {
           border-left: 2px solid #007bff;
           padding-left: 10px;
           margin-left: 5px;
       }
       section.project{
           border-bottom: 1px solid #007bff;
           margin-bottom:24px;
       }
    
       .me {
           margin-bottom: 30px;
       }
       .skillsContainer {
           display: block flex;
       }
   
       .skill-category {
         width: 100%;
         display: flex;
         flex-direction: column;
         justify-content: start;
         height: 350px;
      }
       .skill-bar-container {
         margin-bottom: 10px;
       }
   
       .skill-bar {
         height: 15px;
         background-color: #f0f0f0;
         border-radius: 10px;
         margin-bottom: 5px;
         position: relative;
       }
   
       .skill-bar-inner {
         height: 100%;
         border-radius: 10px;
       }
       .skill-bar p {
           margin: 0;
           /* color: white; */
           height: 100%;
           display: flex;
           align-items: center;
           z-index: 111;
           position: absolute;
           top: 2.75px;
           left: 10px;
           font-family: 'monoton';
           font-size: 8px;
       }
       .beginner {
         width: 30%; /* Adjust the width based on proficiency level */
         background-color: #ff6347; /* Red color for beginner */
       }
   
       .intermediate {
         width: 55%; /* Adjust the width based on proficiency level */
         background-color: #ffc400; /* Yellow color for intermediate */
       }
       .advanced {
         width: 80%; /* Adjust the width based on proficiency level */
         background-color: #d3ff00; /* Yellow color for intermediate */
       }
   
       .pro {
         width: 95%; /* Adjust the width based on proficiency level */
         background-color: #0f0; /* Green color for advanced */
       }
   
       .skillsInfoTable {
         display: flex;
         flex-direction: column;
      }
      .skillsInfoTable tr td {
         width: 180px;
         text-align: center;
      }
      .contactInfo{
       display: flex;
       justify-content: space-around;
      }
      .contactInfo div p {
       width: fit-content;
      }
   </style>
   </head>
   <body>
       <div class="container">
           <header>
               <h1>Mehmet Kaan Taspunar</h1>
               <p>Fullstack Developer</p>
           </header>
           <section class="me">
               <h2>Me</h2>
               <ul>
                   <li>Recent graduate from Malmo University with a Bachelor's degree in Media Production and Process Design, aspiring to launch a career in Fullstack Development.</li>
                   <li>Proficient in a wide range of front-end and back-end technologies, with hands-on experience in project development and collaboration.</li>
                   <li>Demonstrated ability to tackle challenges and find innovative solutions through practical experience.</li>
                   <li>Committed to creating efficient and user-friendly software solutions that meet client needs.</li>
                   <li>Seeking opportunities to contribute to productive teams and drive impactful projects forward.</li>
               </ul>
           </section>        
   
           <section id="contact">
               <h2>Contact</h2>
   
               <table style="width: 100%;">
                   <tr class="contactInfo">
                       <td style="padding-left: 9px;">
                           <p><strong>Phone:</strong> 072 317 10 61</p>
                           <p><strong>Address:</strong> Sadelmakarebyn 2B, 218 40 Malmo</p>
                       </td>
                       <td>
                           <p><strong>Email:</strong> <a href="mailto:taspunar@hotmail.com">taspunar@hotmail.com</a></p>
                           <p><strong>Website:</strong> <a href="https://mehmetkaantaspunar.se" target="_blank">mehmetkaantaspunar.se</a></p>
                       </td>
                       <td>
                           <p><strong>GitHub:</strong> <a href="https://github.com/Mehmet-Kaan" target="_blank">Mehmet-Kaan</a></p>
                           <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/mehmet-kaan-taspunar" target="_blank">Mehmet Kaan Taspunar</a></p>
                       </td>
                   </tr>
               </table>
           </section>
   
           <section id="experiences">
               <h2>Experiences</h2>
               <p><strong>The Stepstone Group</strong> - Internship as Software Engineer, 2023/2024</p>
               <ul>
                   <li>Became proficient in Google Cloud Platform, Pub/Sub, and BigQuery.</li>
                   <li>Utilized OpenAI APIs to increase project functionality, resulting in a 20% improvement in user engagement.</li>
                   <li>Developed "Ask Gandalf," an AI application that achieved ca 500 visits within the first three months of launch.</li>
                   <li>Integrated newfound knowledge into practical solutions, resulting in a 15% reduction in project development time.</li>
                   <li>Demonstrated ability to use cutting-edge technologies effectively, resulting in a 30% increase in project efficiency.</li>
                   <li>Successfully tackled challenges and refined analytical thinking skills, leading to a 25% decrease in project bugs.</li>
                   <li>Collaborated with a productive team to deliver projects on time and within budget.</li>
                   <li>Hands-on experience and exposure to real-world projects contributed significantly to growth as a Software Engineer, leading to a promotion within 6 months.</li>
               </ul>
               </section>
               
               <section id="education">
               <br>
               <h2>Education</h2>
               <p><strong>Malmo University</strong> - Bachelor's degree in Media Production and Process Design, 2023</p>
            </section>

           <section id="skills">
               <h2>Skills</h2>
               <table class="skillsInfoTable">
                   <tr class="" style="display: flex;justify-content: space-between;align-items: start;">
                   <td>
                       <div class="skill-category">
                       <h3>Technical Skills</h3>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>HTML</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>CSS</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>JavaScript</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>React</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner intermediate"></div>
                           <p>React Native</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Node.js</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>PHP</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner beginner"></div>
                           <p>.Net Framework</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Object-Oriented Programming</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Firebase</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Google Cloud Platform (GCP)</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner intermediate"></div>
                           <p>SQL</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>RESTful APIs</p>
                       </div>
                       </div>
   
                       </div>
                   </td>
   
   
                   <td>
                       <div class="skill-category">
                       <h3>Soft Skills</h3>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Analytical thinking</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Attention to detail</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Time Management</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Teamwork</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Communication</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Flexibility</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Creativity</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Leadership</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Organization</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Self-Motivation</p>
                       </div>
                       </div>
   
                       </div>
                   </td>
   
   
                   <td>
                       <div class="skill-category">
                       <h3>Tools & Technologies</h3>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Visual Studio</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Visual Studio Code</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Git / GitHub</p>
                       </div>
                       </div>
               
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Insomnia</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner intermediate"></div>
                           <p>Adobe DreamViewer</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Adobe Figma</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>AdobeXD</p>
                       </div>
                       </div>
           
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>Postman</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner intermediate"></div>
                           <p>Android Studio</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner pro"></div>
                           <p>Miro / Trello</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner intermediate"></div>
                           <p>Blender</p>
                       </div>
                       </div>
                   
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner advanced"></div>
                           <p>IntelliJ / Atom</p>
                       </div>
                       </div>
                       <div class="skill-bar-container">
                       <div class="skill-bar">
                           <div class="skill-bar-inner intermediate"></div>
                           <p>Max</p>
                       </div>
                       </div>
                       </div>
                   </td>
   
   
                   <td>
                       <div class="skill-category">
                        <h3>Languages</h3>
                        <div class="skill-bar-container">
                        <div class="skill-bar">
                              <div class="skill-bar-inner pro"></div>
                              <p>Swedish</p>
                        </div>
                        </div>
                        <div class="skill-bar-container">
                        <div class="skill-bar">
                              <div class="skill-bar-inner pro"></div>
                              <p>English</p>
                        </div>
                        </div>
                        <div class="skill-bar-container">
                        <div class="skill-bar">
                              <div class="skill-bar-inner pro"></div>
                              <p>Turkish</p>
                        </div>
                        </div>
                        <div class="skill-bar-container">
                        <div class="skill-bar">
                              <div class="skill-bar-inner pro"></div>
                              <p>Kurdish</p>
                        </div>
                        </div>
                        <div class="skill-bar-container">
                        <div class="skill-bar">
                              <div class="skill-bar-inner intermediate"></div>
                              <p>German</p>
                        </div>
                        </div>
                       </div>
                   </td>
                   </tr>
               </table>
           </section>
   
           <section id="projects">
               <h2>Projects</h2>
               <div class="projects">
                   <section class="project">
                       <h3>Ask Gandalf</h3>
                       <p><strong>An Idea Analyser Application with AI Capabilities</strong></p>
                       <p>An AI-powered application inspired by the legendary world of "The Lord of the Rings".</p>                    
                       <p><strong>Skills:</strong> HTML, CSS, JavaScript, React, Node.js, Git, Google Cloud Platform (GCP), Firestore, Pub/Sub, BigQuery</p>
                       <p><strong>About:</strong></p>
                       <ul>
                           <li>"Ask Gandalf" takes your ideas on a transformative journey.</li>
                           <li>Users input their thoughts.</li>
                           <li>The application, powered by advanced AI algorithms, analyzes them from different perspectives.</li>
                           <br>
                           <li>Results are presented in a visually engaging manner.</li>
                           <li>Provides users with deeper insights into their ideas.</li>
                       </ul>
                       <p><strong>To Project:</strong> <a href="https://askgandalf.mehmetkaantaspunar.se/" target="_blank">Ask Gandalf</a></p>
                   </section>
                   
                   <section class="project">
                       <h3>Aganju's Wrath</h3>
                       <p><strong>A Top-down Pixel Game</strong></p>
                       <p>A top-down adventure game crafted using the Phaser game engine.</p>
                       <p><strong>Skills:</strong> HTML, CSS, JavaScript, PHP, Insomnia, GitHub</p>
                       <p><strong>Version 1:</strong></p>
                       <ul>
                             <li>Developed collaboratively, this version features Aganju with four skills designed to enhance strategic gameplay.</li>
                             <li>While lacking in-game music, this iteration focuses on the intensity of battles and immersive combat sounds.</li>
                       </ul>
                       <p><strong>Version 2:</strong> 
                           <ul>
                               <li>Features 16 skills for enhanced gameplay.</li>
                               <li>Includes upgradable equipment.</li>
                               <li>Incorporates enriched audio-visual elements.</li>
                               <li>Represents an evolution in gameplay, visuals, and overall player experience.</li>
                           </ul>
                       </p>
   
                       <p><strong>To Project:</strong> <a href="https://wrathofaganjuv1.mehmetkaantaspunar.se/" target="_blank">Aganju's Wrath v1</a></p>
                       <p><strong>To Project:</strong> <a href="https://wrathofaganjuv2.mehmetkaantaspunar.se/" target="_blank">Aganju's Wrath v2</a></p>
                   </section>
                   
                   <section class="project">
                       <h3>Project: HediyApp</h3>
                       <p><strong>An Instagram-like Web App</strong></p>
                       <p>A heartwarming plattform for speacial moments</p>
                       <p><strong>Skills:</strong> PHP, JavaScript, CSS</p>
                       <p><strong>About:</strong></p>
                       <ul>
                           <li>"HediyApp" transforms birthday celebrations into a collaborative experience.</li>
                           <li>Users can create albums, upload photos, and share favorite moments.</li>
                           <li>The interactive comments feature encourages engagement and celebration.</li>
                       </ul>
   
                   </section>
                   
                   <section class="project">
                       <h3>Mr. HangMan</h3>
                       <p><strong>A Hangman-like Mobile Game</strong></p>
                       <p>A captivating mobile word game built using React Native</p>
                       <br>
                       <p><strong>Skills:</strong> JavaScript, CSS, React Native with Expo CLI</p>
                       <p><strong>About:</strong></p>
                       <ul>
                           <li>Transforms the classic hangman game into a modern and interactive experience. Players can choose solo challenges or duel a friend on the same device.</li>
                           <li>Engineered a versatile game structure featuring distinct word categories to enrich gameplay; Developed a point-based reward system for unlocking avatars, fostering player engagement and progression within the game environment.</li>
                           <li>Developed a point-based reward system for unlocking avatars, fostering player engagement and progression within the game environment.</li>
                       </ul>
                       <p><strong>To Github Repo:</strong> <a href="https://github.com/Mehmet-Kaan/Mr.HangMan" target="_blank">Mr. HangMan</a></p>
                   </section>
                   
                   <section class="project">
                       <h3>Portfolio</h3>
                       <p><strong>A Personal Website</strong></p>
                       <p>A personal place that showcases my projects and skills.</p>
                       <p><strong>Skills:</strong> JavaScript, CSS, Html, React, GCP</p>
                       <p><strong>To Project:</strong> <a href="https://mehmetkaantaspunar.se/" target="_blank">Portfolio</a></p>
                   </section>
   
                   <section class="project">
                       <h3>Custom APIs</h3>
                       <p><strong>PHP and .Net Framework Projects</strong></p>
                       <p><strong>Skills:</strong> JavaScript, CSS, PHP, Microsoft .Net EF</p>
                       <p><strong>To Github Repo:</strong> <a href="https://github.com/Mehmet-Kaan/TerrorTeacher" target="_blank">T. Teacher PHP - API</a></p>
                       <p><strong>To Github Repo:</strong> <a href="https://github.com/Mehmet-Kaan/AdventureWorks_backend" target="_blank">AdventureWorks .Net EF API</a></p>
                   </section>
               </div>
           </section>
           <section class="references">
               <h2>References</h2>
               <table style="width: 100%;">
                  <tr class="contactInfo">
                     <td style="padding-left: 9px;">
                           <h3>Erik Pineiro</h3>
                           <p><strong>Titel: </strong>Course Coordinator - Malmo University</p>
                           <p><strong>Email: </strong><a href="mailto:erikpineiro@mau.se">erikpineiro@mau.se</a></p>
                           <p><strong>LinkedIn: </strong><a href="https://www.linkedin.com/in/erik-pineiro-7684674?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BiC%2BxfbDjRJu%2FNVsiBSxz2w%3D%3D" target="_blank">in/erik-pineiro</a></p>
                     </td>
                     <td>
                           <h3>Max Strömberg</h3>
                           <p><strong>Titel: </strong>Internship Supervisor - The StepStone Group</p>
                           <p><strong>Email: </strong><a href="mailto:maxstromberg1996@gmail.com">maxstromberg1996@gmail.com</a></p>
                           <p><strong>LinkedIn: </strong><a href="https://www.linkedin.com/in/max-strömberg-551310198?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BZy%2Bw9DKZQku%2BYUkt2ebWWA%3D%3D" target="_blank">in/max-strömberg</a></p>
                     </td>
                     <td>
                           <h3>Niclas Bjuväng</h3>
                           <p><strong>Titel: </strong>VD - The StepStone Group</p>
                           <p><strong>Email: </strong><a href="mailto:bjuvang@gmail.com">bjuvang@gmail.com</a></p>
                           <p><strong>LinkedIn: </strong><a href="https://www.linkedin.com/in/bjuvang?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bj6Ira6ehQeKWdiRUbmqx4Q%3D%3D" target="_blank">in/bjuvang</a></p>
                     </td>
                  </tr>
               </table>
            </section>
       </div>
   </body>
   </html>
   `;
};
