<h1 align="center">Welcome to HackyStack!</h1>
<p>

   [![Build Status](https://travis-ci.org/arshiyasolei/hafte-cards.svg?branch=master)](https://travis-ci.org/arshiyasolei/hafte-cards)
</p>

HackyStack is a website that allows you do COVID contact tracing! The backend is written with Node.js and the frontend is vanilla javascript. The front end is implemented with Bootstrap and uses [sigma.js](https://github.com/jacomyal/sigma.js) as the graph drawing utility. This project uses the Socket.io framework as its networking framework. For data storage, we use SQLite3 with a local database. In order to implement the graph data structure in our relational database, we simply have two tables, one that keeps track of the nodes while the other keeps track of the edges.

## Demo Images
![Alt text](img/main_img.png "Graph")
![Alt text](img/second_img.png "Map")

## Install


```sh
npm install
```

## Usage

```sh
npm start
```

## Author

**Arshia Soleimani, Allen Benjamin, Zachary Taylor**

* Github: [@arshiyasolei](https://github.com/arshiyasolei), [@taylozac](https://github.com/taylozac), [@BobbySinclusto](https://github.com/BobbySinclusto)

## Show your support

Give a ⭐️if this project helped you!

***
