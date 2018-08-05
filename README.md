# WDI Project 2 - Travel Recommendations

### A full stack express app
##### by Bianca Jemsten
---

##### Overview
The application allows users to create a profile where they can add all the countries that they've been to and then add recommendations to each country for other users to check out. There is also a user index page which enables searching for all users on the site.

The app is deployed on Heroku (insert link here)

##### Technologies used
|           |                     |         |
|-----------|---------------------|---------|
| JavaScript | EJS                 | HTML    |
| SCSS      | CSS                 | Node.js |
| MongoDB   | Amazon Web Services | bcrypt  |
| bluebird  | body-parser         |         |



---

#### User Experience

<p align="center"><img src="https://i.imgur.com/Dn18bkz.png" width="700"><p>

**Signing up**
<p align="center"><img src="https://i.imgur.com/82ymoIC.png" width="700"></p>

The user starts the journey by signing up to the site via a form. There the user can also upload a profile picture. This is enabled by the usage of Amazon Web Services. When clicking the register button the user is directed to the login page where they put in the credentials they just signed up with.

**Viewing the profile**
<p align="center"><img src="https://i.imgur.com/id4GN9r.png" width="700"></p>
After logging in, the user is taken to their profile. They can also browse for other users' profiles by going to the `All Travelers` tab. The `Preview of reviewed countries` shows the first few countries that this user has reviewed. Likewise, `Uploaded photos` shows up to the 4 first photos uploaded by the user in their recommendations.

**Viewing the recommendations**
To view all countries reviewed, the user clicks on `View all countries`. If on their own profile, the user can then chose to `Add new country` in which they can then `Add new recommendation` by filling out a form. If on someone else's profile, they can click around and just browse the different countries.

#### The build process

**Planning.** The process started with sketching out the wireframes for the site and planning out the models accordingly. The planning also included a list of features that had to be in the MVP and a list of features to be added if there was extra time.

**Building** The site was built out starting with setting up the server and then adding the routes. Thereafter adding the views one by one, testing each feature along the way.

**Styling** Styling was done last, but in hindsight that is something that should have been done continuously throughout the project.



##### Challenges
I did not get as far with the project as I would have liked to because the nesting of information turned out to be trickier than expected in EJS. Given that each user has a set of countries, and each country has a set of recommendations, making sure that all the information came through to the next page was difficult.

If I had rebuilt the app again I would have built out the models differently and planned to have a general database of recommendations for users to browse rather than the recommendations only displaying per country per user. Alternatively, I could see the app being built more easily with React or Angular.

##### Features to be added
- A search function to search for other users.
- A general database to view all recommendations for a certain country.
- A comment section for users to comment on each other's recommendations.
