# Fan Flights

Fan Flights is a web application that allows NBA fans to browse NBA schedules, search for flights to NBA games, and create trip itineraries. Users can book flights, see details about their favorite NBA games, and manage their travel plans all in one place.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)


## Project Overview

Fan Flights is designed for NBA fans who love to travel and attend live games. It helps users:
- View NBA game schedules.
- Search and book flights to attend live NBA games.
- Save trips, update travel details, and manage itineraries.
- Use Firebase for user authentication (login, logout, and user management).

## Features

- **NBA Schedule**: View a full calendar of upcoming NBA games.
- **Flight Search**: Find flights based on game schedules using the Amadeus API.
- **Trip Management**: Create, update, and delete trips with flight and game details.
- **Authentication**: Users can register, log in, and log out via Firebase Authentication.
- **Seamless Navigation**: Use React Router for smooth navigation between different sections of the application.

## Technologies Used

- **Frontend**: 
  - React.js (with Vite)
  - React Router DOM for navigation
  - Custom CSS for styling and animations
  - Axios for making API requests

- **Backend**:
  - Node.js and Express.js (API routes)
  - MongoDB (Database for storing trips)
  - Firebase Authentication for user management

- **APIs**:
  - **Amadeus API**: For flight search and booking.

## Challenges
- Authentication was a huge struggle, unfortunately, the CRUD functionality I have coded so far is not properly working. The trip won't save, you won't be able to update or delete.
- I was back and forth with API's I started with 3 and realized I was doing too much and only needed 1.

## Future Additions
- Use Amadeus API to integrate Hotel Search and Booking to be apart of the trip to organize everything needed at once.
- Autofill Destination Airport Code to make user experience easier.
- Flight Filtering and Sorting.
- Actually Book flights and tickets through the website.
  
