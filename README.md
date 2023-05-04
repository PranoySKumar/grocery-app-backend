
<h1>Grocery Application Backend</h1>


<h2>Summary</h2>
<p>
    This is a Backend application made with the help of Nodejs.Its a part of a group of software which are used to take item orders from customers and deliver them to customers through a delivery system much like swiggy or zomato.
</p>
<p>
    This app acts as a mainline server to facilitate data communcation and transformation between the Admin Pannel, Delivery App, and User Store Front
</p>

<h2>Tech Stack</h2>
<ul>
    <li><a href="https://nodejs.org/en">Node JS</a></li>
    <li><a href="https://graphql.org/">Graph QL</a></li>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
    <li><a href="https://mongoosejs.com/">Mongoose</a></li>
    <li><a href="https://typegraphql.com/">Typegraphql</a></li>
    <li><a href="https://www.typescriptlang.org/">Typescript</a></li>
    <li><a href="https://cloudinary.com/">Cloudinary</a></li>
    <li><a href="https://expressjs.com/">Express</a></li>
    <li><a href="https://socket.io/">Socket.io</a></li>
</ul>
<h2>How to run?</h2>
<ol>
    <li>Download the zip file of the project or use git clone</li>
    <li>Extract the folder (if not) and then run <code>npm install</code></li>
    <li>Make sure you have typescript installed and after that run <code>tsc -w</code> to run typescript compiler.</li>
    <li>And finally to run the local server use command<code>npm run dev</code>.</li>
</ol>
<h2>Features</h2>
<ul>
    <li>Most of the api's are written in graphql to facilitate easy access to data by all the apps</li>
    <li>Data storage is handled with help of mongooose and mongodb</li>
    <li>Websockets are used for quick communtication between apps.</li>
    <li>For storing Images cloudinary is being used</li>
    <li>The whole app was build using typescript so type support is available out of the box</li>
</ul>
