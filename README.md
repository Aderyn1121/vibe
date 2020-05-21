![Alt Text](https://i.imgur.com/FNi3qlt.gif)
### An open-source, web-based music platform, catered to *your* vibes.

Vibe is a non-commercial, social music platform with an emphasis on finding music suited to your 'vibe'.
From rock, to jazz, to pop and everything around and in-between, Vibe will help you create your perfect playlist.


# Latest Public Release

*Vibe can be found at https://pure-gorge-09335.herokuapp.com/*

*No installation necessary. Tested on Google Chrome v. 81.0.4044*

---
![](https://i.gyazo.com/66db483da45cd066b308acd25faac651.jpg)




# Features
- Vibe works off of both a front-end and a back-end database to handle displays, authentication and relations between profiles

- Vibe uses bcrypt's hashing functions to obscure and store user passwords, ensuring user security.

- We utilize JWTs and cookies to ensure user privacy. No longer will anybody see how many times you've played "Grandma got Run Over by a Reindeer".

---
# Coding highlights

```
Favorite snippets
```
---
# Troubleshooting

We ran into a few major and minor problems to overcome, including:

- Github workflow: We had to learn quickly to keep our commits small and frequent, or one branch would end up far behind the others.
- Solving Music Storage/Playback: We had to decide between using an API to stream music and using locally stored music files. We decided on the latter so that we could customize our player.

- Issues with require auth being called on the wrong routes were fixed through rearranging our routers so that the javascript didn't run into an auth requirement before hitting the route that was meant to be called. Order of operations matters.

---
# Database Structure

![](https://i.imgur.com/qIx984r.png)
---
# Contributors
-  **Backend Lead:** Geoffrey Otieno (gootieno)
-  **UX/UI Lead:** Zachary Henderson (zachary-henderson)
-  **Team Lead:** Emily Burnham (Aderyn1121)

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-pug.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
