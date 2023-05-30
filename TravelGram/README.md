# Project Summary

TravelGram is a trip planning and sharing web application for people who want to plan and organize trips collaboratively in real-time with other users, and share their trip plans with others. Our application allows users to create trips by adding certain information such as the timeframe of the trip, and several trip elements such as places to visit, activities, reservations, and more, through an intuitive drag and drop interface.

# Project Details

The application will be using data such as user information (username, email, password), trip information (trip name, description, trip dates, trip destinations, other users as collaborators), and trip elements (activity name, description, image, date of visit, location). Using this data, a user will be able to register and login, and create and edit trips. They will also able to add and edit destinations for each trip, and add collaborators to their trips. They should be able to see all their destinations on their respective trips.
Some additional functionality that we could include is a popularity system that allows users to rate and comment on other trips, and find trips based on related tags and popularity.

# Project Task Requirements

Minimum Requirements:

- Add, edit, delete, view trip information, such as title, description, duration, and trip elements representing activities, reservations… (Completed)
- Visualize the trip elements via a map interface (Completed)
- Add other users as collaborators to a trip, so that each collaborator can make changes on the trip (Completed)
- Basic user authentication functionality (Completed)

Standard Requirements:

- Users can publish their created trips so all other users can view them, and use them as templates when creating their own trips (Completed)
- Users can add attachments to their trip elements for the trip collaborators to see (Completed)
- Changes and updates done by one user should be reflected in real-time for all members of the trip. (Not Completed)

Stretch Requirements:

- Search for published trips using parameters such as locations, activities, tags, etc. (Not Completed)
- Popularity system that allows users to rate and comment on other trips. (Not Completed)
- Functionality to allow users to keep track of trip expenses and distribute costs among all travellers. (Not Completed)
- Automatic recommendations for trip routes based on activities and locations. (Not Completed)
- Integrations with travel-related applications such as Airbnb, Booking.com, etc. (Not Completed)

# Description of how technologies from units 1-5 are used

TravelGram uses all of the technologies that we learnt in Units 1 to 5. While we did not use pure HTML except for the index file, we did use CSS both directly and indirectly to style various components throughout the application. For the most part, styles were applied through Material UI's theme and useStyles hook, however we did use pure CSS for certain components that required more fine tuning (such as Timeline, Feed and Split Panel Resizer) that was harder to achieve through the library styles. 

From Unit 2, we used React to build the client-facing side of the app as we did generate the base project using create-react-app. We used components to reduce code duplication and reuse components throughout the app, React hooks in order to achieve complex functionality, and also Redux stores for easy access to authentication and application-wide data. 

We used Node.js and Express from Unit 3 to build out the backend for our application. We created all of our API endpoints here for creating, fetching, updating and deleting data that we wanted to store or process separately from the front-end. This is also where we ended up serving the front-end code from when we finally deployed our application as it was not practical to have the front-end and back-end running on separate ports.

We used MongoDB from Unit 4 to hold all of our user and travel data in long term storage since we did not want to lose this data when a user quit the application or when a different user that was a collaborator wanted to access the same data.

Finally, we utilized concepts of release engineering from Unit 5 to have a continuously integrated release line from pushing to Github to releasing publicly on Heroku.

# Above and Beyond

Our application is integrated with a variety of interesting technologies. Firstly, we used a Google Maps API wrapper component for visualizing the trip activities, and a Google Maps Location API component for creating an autocompleted location search. We also used browsers’ navigator API to fetch the current user’s location, and create the trip map based on that. In order to store trip images and attachments, we integrated our app with Firebase Storage, and created an interface to interact with the Firebase Storage API. We also made use of a tool called Storybook while developing our components, which allowed us to build and test our React components in an isolated way as we were developing them. We’ve also set up a Redux store in our app to manage data in a central place and make it available to the whole component tree.

# Next Steps

To increase the functionality of our app, we plan to implement the features in our stretch goals. These include giving users the ability to publish their trips publicly, to rate and comment on public trips, and to search for public trips based on popularity and other parameters such as trip location, tags, activities, etc. so they may use them as their inspiration. We also plan to integrate travel-related APIs such as Airbnb, Booking.com, etc. to allow users to manage and make accommodations for their trips. A plan to implement a trip recommendation system based on users’ activity and trip history is also in the forecast.

# Contributions

Gokce: For our app, I created a dashboard page that displays a paginated feed of user’s trips via filtering the trips on the backend. I created a comprehensive form component that allows users to upload images, search for other user accounts in our app and add them to their trips as collaborators, search for a location using the Google Maps Places API, I also customized this component to be reused in multiple places in our app: when creating trips, trip activities, and trip templates. I also implemented the trip editing and deleting functionality and backend routes, such that only the trip owners or collaborators can perform these actions, and I implemented a trip templating functionality that allows users to copy over certain properties from an existing trip when creating a new trip. I also integrated our app with Storybook, Firebase Storage, and the Google Maps wrapper components.

Ryan: I was responsible for implementing the Navigation bar with drawers, as well as user profiles and user avatars. The navigation bar included routes to other components, as well as showing the currently logged in user and the options it can take such as linking to the profile or signing out. The profile component allows users to see their information that is linked to MongoDB and edit their information as well as their user Icon. The profile icon component was implemented in a modular way so that users can call it with varying sizes depending on their needs, or pass in a picture if their component already has it, and if not, pass in a user ID so the profile icon component can find it itself.

Maia: For TravelGram, I worked on features like user authentication, which included login, register, conditional routing (aka limiting access to pages only viewable by logged in users), and persistent sessions (or, being able to stay logged in even after refreshing the page). I was also responsible for integrating Redux into our app to hold the user information, to allow the rest of the team to easily access the user data they needed. I also worked on routing, which included putting the pages of the app together as one coherent collection of pages all connected together by routes and the main parent component. I also added some smaller forms of error handling like catching a non-existent page or bad user data. My other responsibility was engineering the release, which included restructuring our folders, writing the yaml file, creating our heroku account, and connecting it to our Github repo. Once code is pushed to the 'release' branch, it will automatically get deployed to our live heroku site by using Github activities. 

Avi: My most significant contribution to the project was creating a consistent and coherent experience for the user by re-designing the entire front-end for the application in order to utilize a global style. This included creating a color palatte, determining default margins and rounding values, producing font styles and weights, and finally applying all of these to the previously unstyled components. Secondly, I worked on modification of all components to ensure our application was responsive and as easy to use on a mobile device as on a desktop. Another major aspect of the application that I worked on was the actual view/edit trip page. I created this screen from scratch and worked on creating all the CRUD endpoints in the backend while also connecting them to the MongoDB cluster. I also worked on integration of user interactivitiy features throughout the application including activity drag and drop, trip itinerary timeline, draggable map split panel, and the dashboard tile layout. Lastly, I also made other minor contributions throughout the project such as writing the Mongoose schemas for the models that we wanted to implement and some basic input validation for the forms.

# Task Breakdown

Task 1: User profile

- Implement register functionality
  - Store data: Email, name, password
- Implement login functionality
  - Get/use data: Email, password
- Allow users to see their profile information
  - Get data: Email, name
- Allow users to edit certain parts of their profile
  - Get/edit data: Email, name, password
- Allow users to deactivate their account
  - If the trips made by the user have collaborators, the trips will still be accessible by the collaborators

Task 2: Create Trip / Add details about Trip

- Implement functionality to add other users to the current trip as collaborators.
  - Add users through email/username.
  - Extra feature: User can accept/decline invitation.
- Button to add elements to a trip
  - Shows pop-up window with preset elements to choose from
- Allow users to set trip dates
  - Start Date
  - End Date
- Display the added trip elements on a map interface
- Drag and drop interface that allows users to move trip elements around
  - Trash bucket to delete items
  - Order activities based on when they will take place

# Sketches

![Capture](https://user-images.githubusercontent.com/44722892/119239649-5e82f680-baff-11eb-8c42-f1435bdb0625.PNG)
![Capture](https://user-images.githubusercontent.com/44722892/119239636-47dc9f80-baff-11eb-9365-3ea998524887.PNG)
![Capture](https://user-images.githubusercontent.com/44722892/119239659-6b9fe580-baff-11eb-9564-80f3c5e10bb2.PNG)
![Capture](https://user-images.githubusercontent.com/44722892/119239671-78bcd480-baff-11eb-9f38-85451b93e0e2.PNG)
![Capture](https://user-images.githubusercontent.com/44722892/119239678-85d9c380-baff-11eb-9355-d89dab811314.PNG)
