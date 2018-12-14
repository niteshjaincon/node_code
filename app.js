const express = require('express');
/* Using hbs as the default view engine requires just one line of code in your app setup. 
This will render .hbs files when res.render is called. */
const hbs = require('hbs');
const fs  = require('fs');
var app   = express();

hbs.registerPartials(__dirname +'/views/partials/');
app.set('view engine', 'hbs');

/* app.use function is just like constructor function.
   Each app.use(middleware) is called every time a request is sent to the server. */ 
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    //console.log(`${now}:${req.method} ${req.url}`)
    console.log(log);
    fs.appendFile('server.log',log +'\n');
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear',() => {
 	return new Date().getFullYear()
});

hbs.registerHelper('getCurrentDateTime',() => {
 	var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
         month = '0'+month;
    }
    if(day.toString().length == 1) {
         day = '0'+day;
    }   
    if(hour.toString().length == 1) {
         hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
         minute = '0'+minute;
    }
    if(second.toString().length == 1) {
         second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
});

hbs.registerHelper('screamIt',(text) => {
 return text.toUpperCase();
});

app.get('/',(req,res)=>{
	//res.send('Hello node');
	// res.send({
	// 	name:"nitesh",
	// 	likes:['bikes','cities']
	// });
	res.render('home.hbs',{
		pageTitle:'Home page',
		welcomeMessage:'welcome to my website'
		//currentYear:new Date().getFullYear()
	})
});

app.get('/about',(req,res)=>{
	//res.send('About Page');
	res.render('about.hbs',{
		pageTitle:'About page'
		//currentYear:new Date().getFullYear()
	});
});

app.get('/contact',(req,res)=>{
	res.render('contact.hbs',{
		pageTitle:'Contact us page',
		address:'403, Gold Stone Building, 3/5 New Palasia, Near 56 Shops, Indore, Madhya Pradesh 452001',
		mobile:'0731 497 4448',
		website:'https://www.consagous.com/',
	});
});

app.listen(3000,() => {
	console.log('server is up on port 3000');
});