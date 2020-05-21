[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-pug.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

# ![Alt Text](https://i.imgur.com/FNi3qlt.gif)
### An open-source, web-based music platform, catered to *your* vibes.

Vibe is a non-commercial, social music platform with an emphasis on finding music suited to your 'vibe'.
From rock, to jazz, to pop and everything around and in-between, Vibe will help you create your perfect playlist.


# Latest Public Release

*Vibe can be found at https://aa-vibe-app.herokuapp.com/*

*No installation necessary. Tested on Google Chrome v. 81.0.4044*

---
![](https://i.gyazo.com/66db483da45cd066b308acd25faac651.jpg)




# Features
- Vibe works off of both a front-end and a back-end database to handle displays, authentication and relations between profiles

- Vibe uses bcrypt's hashing functions to obscure and store user passwords, ensuring user security.

- We utilize JWTs and cookies to ensure user privacy. No longer will anybody see how many times you've played "Grandma got Run Over by a Reindeer".

---
# Coding highlights

### Regex-Based Song Search
```
const regExMaker = (value, word) => {
    const pattern = word.split(' ').map(letter => {
      return `(?=.*${word})`
    }).join(' ')
  
    const reg =  new RegExp(`${pattern}`, 'g')
    return value.match(reg)
}
```
---
# Troubleshooting

We ran into a few major and minor problems to overcome, including:

- We encountered a bug implementing searches due to function ordering. The stored values were declared outside of the asyn callback to the route and caused the values not to reset.

- We had some troubles keeping out HTTP calls down for each page while keeping our application organized. We used pug's string interpolation feature to dynamically call scripts/css files as they were needed for each page. 

- Due to Heroku's slow speed we added a loading screen and a cursor change to indicate that the app *is* working.

- We had to make separate repos for the front and back end within the main repo folder in order to push things to Heroku.

- We had to learn quickly to keep our commits small and frequent, or one branch would end up far behind the others.

- We had to decide between using an API to stream music and using locally stored music files. We decided on the latter so that we could customize our player.

- Issues with require auth being called on the wrong routes were fixed through rearranging our router mounts so that the javascript didn't run into an auth requirement before hitting the route that was meant to be called. Order of operations matters.

---
# Database Structure

![](https://i.imgur.com/qIx984r.png)
---
# Contributors
-  **Backend Lead:** Geoffrey Otieno (gootieno)
-  **UX/UI Lead:** Zachary Henderson (zachary-henderson)
-  **Team Lead:** Emily Burnham (Aderyn1121)

