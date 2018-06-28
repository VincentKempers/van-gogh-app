<h1 align="center">Van Gogh Multi Media Tour & Dashboard</h1>

<div align="center">
  :chart_with_upwards_trend: :bar_chart: :tada: <img src="https://img.shields.io/badge/vanGogh-v1.0.0-yellow.svg">
</div>
<div align="center">
  <strong>van Gogh museum complete package for data analyzation</strong>
</div>
<br />

![app image](/documents/images/app-home-screen.png)
![dashboard image](/documents/images/home.png)


# Van Gogh Multi-Media Tour/Dashboard

Van Gogh Multi-media Tour and Dashboard is a tour personalising and analytics solution made with SSR Vue/Vuex/Node. This application is a concept prototype made for the Van Gogh Museum in Amsterdam.


# Table of Content
- [Getting started](#getting-started)
- [Goal of the prototype](#goal-of-the-prototype)
- [Features](#features)
- [Our stack](#about-the-stack)
- [Data model](#)
- [Data lifecycle](#)
- [Optimalizations](#optimalizations)
- [Wishlist](#wishlist)

# Getting started
**Before you start:** Make sure you have `node` and `mongodb` installed on your computer

If you want to work on this project, follow these steps:
1. First we clone (fork if you want) the repo.
	Run `git clone https://github.com/VincentKempers/van-gogh-app.git` in your terminal
1. create a file called `vars.env` in the root of your folder
1. Add a `PORT=3000` and `DATABASE=mongodb://localhost:27017/<your-db-name>` in `vars.env
1. Start up the mongo database by running `mongod` in your terminal
1. `cd` to the repo and run `npm install` to install the dependencies

1. Run `npm run dev` to start the application
1. Go to `http://localhost:3000/`
1. Happy coding!

# Goal of the Prototype
The goal of the application is to serve as a concept to verify whether this way of getting insight about the visitors of the museum works or not. This will serve as a possible steppingstone/milestone for the Van Gogh Museum.

# Features
The following are the features of the App and Dashboar side from the prototype.

## App features
- Choose custom theme's for your own tour
- Generate an personal tour (static as for now)
- Listen to the stories behind a piece
- Choose where you start yourself during your tour
- Keeps track of the tour checkpoints

## Dashboard features
- Shows graphs about the amount of visitors divided over all four floors (Floor 1 is connected)
- Shows the details from each floor (Floor 1 only for the prototype)
- Shows the details from each painting (One only for the prototype)

# Our stack
Our stack consists of the following main dependencies.

- [Vue][vue]
- [VueX][vuex]
- [Vue Router][vue-router]
- [Mongoose][mongoose] (MongoDB)
- [Chart.js][chart.js]
- [Socket.io][socket.io]



# Data model
We setup the model based on the tours instead of the paintings or works. If there was more time we could add this in the near future.
```JS
const Tour = new Schema({
	device_id: {
		type: String,
		isRequired: 'device needs an id',
	},
	current_way_point: {
		type: Number,
		default: 0, // 0 means pausing or walking / not at a tour item
	},
	current_floor: Number,
	start_tour_time: Date,
	end_tour_time: Date,
	date: {
		type: Date,
		default: helpers.getCurrentDate(),
	},
	cancelled: {
		type: Boolean,
		default: false,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	tour: [
		{
			id: {
				type: Number,
				isRequired: 'Device needs an id',
			},
			start_time: Date,
			end_time: Date,
			type_tour: String,
			painting: String,
			painting_no: String,
			imageUrl: String,
			floor: Number,
			origins: String,
			description: String,
			visited: {
				type: Boolean,
				default: false,
			},
			theme: {
				type: String,
				isRequired: 'A tour has to be assigned',
			},
			audio: [
				{
					title: String,
					audio_url: String,
				},
			],
		},
	],
});

module.exports = mongoose.model('Tour', Tour);

```

# Data lifecycle
![](/documents/images/datacycle1.jpg)


# Optimalizations
The following optimalizations have been/are to be implemented:
- [x] Lazyloading images
- [x] Gzipping
- [x] Js compression
- [ ] Service worker
- [ ] Font subsetting
- [ ] Fonts async loading
- [ ] Code-splitting

# Our Prototype application
[Here it is.](https://github.com/VincentKempers/van-gogh-project)

# Wishlist
What we would like to have done if we had more time.

- [x] Create an overview page of the selected themes for the user
- [ ] Make all actions available when there is no javascript (Partly done)


...

# Vincents Readme

# Table of contents

*   [Introduction](#introduction)
*   [Things I made](#things-i-made)
*   [My goals](#my-goals)
*   [The Process](#the-process)
*	[research](#research)
*	[teamwork](#teamwork)
*   [Conclusion](#conclusion)

# Introduction
The application we've build is more a complete package and a new way of approaching a problem that the van Gogh museum had. We noticed that van Gogh wanted a personalised tour with a focus on giving a unique experience to the visitor. We noticed that van Gogh had a navigation issue on their hands. As well as wanted to know where a user is going. We approached this issue from many angles and eventually made our application with a Dashboard.

# Components I made
The process of working was we split everything to meet eachother at every end. We noticed we needed eachother on multiple applications. Because of this we planning every small thing that needed to be made.

## Prototype
The first week we didn't really work together but the moment we shook our hands and focussed on one goal. We focussed on a design and small functionalities. But we had less than two days to build. So this prototype was split in half and build in the mind of... show what we got!
[The prototype we've build](https://github.com/VincentKempers/van-gogh-first-prototype)
The things I build from this prototype was the following: 
- [zero state](https://github.com/VincentKempers/van-gogh-first-prototype/pull/1)
- [add basic styling](https://github.com/VincentKempers/van-gogh-first-prototype/pull/3)
- [Chosen items page](https://github.com/VincentKempers/van-gogh-first-prototype/pull/4)
- [The inbetween pages for flow](https://github.com/VincentKempers/van-gogh-first-prototype/pull/9)

## Started working on the Application
Before we began working on the application itself we wanted to know from eachother in what language we were going to build everything. What goals did we have and what were the hurdles. After the meeting with van Gogh we noticed there were technologies we couldn't access. As an example they had the multimedia device that was pretty much closed off. Then they had beacons that was very hard to access. Not only we had to be there but we both knew that it wasn't really the focus.

I started working on some new ideas to make the technology work, and have an better understanding of the problem. I re-read their problems and noticed they wanted a way to monitor each floor. 


Kevin and I started re thinking the ideas and went drawing. I came up with an idea to generate data that van Gogh can "monitor" the user and know how long a user stays with a painting. We could catch a users clicks and send them to the server. When the server knows you clicked one and the user wants to listen to an audio it will **confirm** that the user is standing in front of a painting listening. We could monitor visitors passivly. Without needing people counting visitors.

<details>
<summary>Dataflow concept</summary>

![dataflow concept](/documents/images/dataflow-concept.jpg)
</details>

After recieving building we needed to start over again. But it was worth it because we had the most solid idea.

## Things I created on the finished product.
On the database side I've build:
[Setup on the database](https://github.com/VincentKempers/van-gogh-app/pull/20)

The problem: I started learning the wild ways of mongo. So the commits split between us and we worked together on the database connection and build.
The schema that is used in the main repo is the schema that I made but built further upon.

```JS
const Tour = new Schema({
	device_id: {
		type: String,
		isRequired: 'device needs an id',
	},
	current_way_point: {
		type: Number,
		default: 0, // 0 means pausing or walking / not at a tour item
	},
	current_floor: Number,
	start_tour_time: Date,
	end_tour_time: Date,
	date: {
		type: Date,
		default: helpers.getCurrentDate(),
	},
```

## Dashboard
I've build the dashboard in the bigger lines. The concept has been tested with our productowners. We found out that there wasn't much need for a wave of insane graphs but gigantic styles. With the knowledge we know and the desires of the product owner. We could test the interface and basic functionalities. Because of this we could easily build upon the ideas.
[]()

I kept my components fairly DRY. But more important readable without using comments. We filtered all the code comments out of the project so this project wouldn't be littred with "ghost code".
```SCSS
nav {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 0 1em;
	background-color: rgba(0, 0, 0, 1);
	@media screen and (min-width: 40rem) {
		flex-direction: row;
	}
	h1 {
		color: white;
	}
	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 0;
		@media screen and (min-width: 40em) {
			flex-direction: row;	
		}
		li {
			border: none;
			padding: 1.5em 1em;
			a {
				background-color: #454545;
				text-decoration: none;
				color: white;
				padding: 1em 2em;
				max-width: 2em;
				&.router-link-exact-active {
					color: white;
					border-bottom: white solid 4px;
				}
```

## Socket connection
I didn't understand how sockets worked (as a failing real time web grade). I really wanted to learn and tackle the problem I had with learning socket connections.

```JS
		function sendDashboard(newTest) {
			console.log('Join Dashboard');
			socket.join('Dashboard');
		}
```

I can gladly say I know how sockets work because of a great teammate kevin. I now couldn't recieve data from the api kevin created real time. 

```JS
		this.socket = io();

		this.socket.emit('Dashboard');
		this.socket.on('sendPosition', this.sendPosition);
		this.socket.on('exitAudio', this.exitAudio);
```
 sendPosition would get the current paint data and Id and add it to the count.
```JS
		sendPosition(paintingData, count, paintingId) {
			this.updateTourData(paintingData, count, paintingId);
		},
```

# My Goals

## Real Time
My goals included to work with sockets and have a realt time experience. This worked pretty fine! We had a great flow and because of the socket connection the app worked pretty well. This even helped me to build my product for real time web.

## VueJS
I really wanted to know how VueJS would work and feel. I now notice that this looks a lot like a mixture of Wafs and Browser Tech. Because you build everything in a file and you can build in an OOP (object oriented programming) way with templating. So this actually works better than expected.

## Dry
Working on DRY I do believe I need some more time with learning to write dry from the get go. But I do believe i'm getting there. I do believe I wrote less code to make this work. On the dashboard side at least.

## Understanding and working with back-end.
As someone who never followed the back-end course I wanted to learn and work on this skill. I only did the setup and created the database and set some data. But I never thought i would achieve this.

# teamwork
We worked pretty closely together! We neve had a moment that we couldn't work together. We worked everything through Git and [Github projects](https://github.com/VincentKempers/van-gogh-app/projects). Every new week we sat down and had a talk about how we could tackle a new idea. We deconstructed a new week before starting and it helped through alot. This made working together a bit more clearer. Even though I had so much todo for RTW (real time web). I had a great parnet that understood the situation and somebody I could spar with.


# Research
I do believe I was showing my best part on the research. I made a user story that was the following: 
```
Jenkin Lloyd Jones is hier in Nederland om cultuur te bekijken en heeft besloten om een multi media tour te doen in het Van Gogh Museum. Dit is zijn eerst keer in het Van Gogh Museum. Jenkins heeft wel eens van Van Gogh gehoord en wilt meer weten over zijn werken. Hij heeft gehoord dat hij de natuur werken niet mag missen.

Hij neemt de multi media tour tour en ziet dat hij een tour kan doen. Jenkins kiest voor de thematour en ziet een lijst met thema's waaruit hij kan kiezen en kiest een thema die hem interesseerd. Hij vindt zijn bloemen en merkt dat hij meer thema's kan kiezen. Jenkins begint meer thema's te kiezen zoals Legacy Van Gogh en Wealth of Nature.

Een tour wordt voor hem gegenereerd gebaseerd op zijn keuzes. Zijn startpunt begint in dit geval bij verdieping 1 over de boeren en "Simple life". Jenkins merkt dat het bij de Potato Eaters erg druk is en besluit om een ander stuk te kiezen die de op de kaart is weergeven. Later komt Jenkins terug en ziet dat het minder druk "voor hem" is en pakt de route weer op. Jenkins heeft niet het gevoel dat het zo druk is omdat hij zelf door kan gaan naar een ander stuk.
```

After this we wanted to check if we were wrong and visited the Rijksmuseum and Mocomuseum. To see if their interactive tours were better or have the same problems as the van gogh. We knew that the Rijkmuseum had a much well balanced experience but it wasn't optimal because you missed way to many pieces! You avoid busyness and never come back.  


# Conclusion
I learned so much. It was working with databases, managing git, project management, User experience or CSS. I really learned alot. Ofcourse not only in the master assignment, but think i made a leap forward in starting my own projects like the quality of this or probably better. I have more confidence in creating some bigger projects than I did before. 

# License
Code [GPLv3](LICENSE)

Audio files and Art images copyright Van Gogh Museum


[vue]: https://vuejs.org/
[vuex]: https://vuex.vuejs.org/
[vue-router]: https://router.vuejs.org/
[mongoose]: http://mongoosejs.com/
[socket.io]: https://socket.io/
[chart.js]: https://www.chartjs.org/