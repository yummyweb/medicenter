# MediCenter

## Inspiration
In these trying times, it is necessary to have a solution which can provide vital medical information and awareness at your finger tips. The internet fails to provide such accurate information due to biases and credibility issues. To deal with such widespread medical information, we felt that as citizens we were responsible to create a solution that would give us such information anytime, anywhere, hence we came up with a solution which does just that. It is built to provide accurate information pertaining to general medicine and specialised COVID information. Currently it implements limited services, but they can be extended over time. Also it is vital to keep in mind that the project in scoped to India due to availability of APIs and the residence of our team members.

## What it does
MediCenter gives users the ability to query vital general medical information such as lists of vacant beds in hospitals in a particular region or the medical helpline numbers for an area. We use Dasha to relay this information to the end user. The user starts an engaging conversation with Dasha, and asks her about any one service while providing information like location which allows Dasha to respond back with necessary details regarding the service like the helpline numbers for a location.

## How we built it
**HTML:** HTML was used to define the skeletal structure of the entire application. The elements and structure of the website was built using HTML.

**CSS:** We used CSS to give shape and structure along with form to the HTML elements. CSS played a big role in making the website look nice, in fact, without CSS the website would have been really ugly.

**Node.js:** We built the entire backend with Node.js and Express.js. We queried the data from the REST api using Node.js in the backend through external functions provided by Dasha, thus Node.js was really important in the entire application.

**JavaScript:** We used client side JavaScript for animations and a touch of interactivity. GSAP, a popular animation framework for JavaScript was used for all the animations in the website like text animations and ring animations. JavaScript was key for the frontend to communicate with the backend.

## Challenges we ran into
We ran into several challenges some of which were more prominent than the others. One of the challenge was in getting the web server up and running while talking with the Dasha app. After several hours of grinding, we got it to work. After that, we faced some more problems in getting Dasha to speak on the frontend. There also we spent quite some time to get it to work, but once that worked, everything else was a breeze.

## Accomplishments that we're proud of
I am proud of the fact that I was able to build an application in two days, alone using technologies I had never known before. In two days' time I learnt Dasha Scripting Language, using it with Node.js and Dasha external functions for making REST api calls, in building a wholesome application. This was an amazing learning experience for me and a big accomplishment for me, considering the time constraint.

## What we learned
I learnt a lot about Dasha's platform and the Dasha Scripting Language. Along with that I learn about integrating Dasha with a frontend through WebRTC. My main takeaway from this project is the power of Dasha in building conversational AI applications. Using what I have learnt in this project, I will certainly try and apply them in building other applications.

## What's next for MediCenter
In the future, I would certainly love to add more services and features making this application more useful for users. I could also work on making the application more interactive through text messaging with Dasha  and giving Dasha some form rather than an entity without any representation.
