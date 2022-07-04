# opendeck.io
Opendeck.io is an open Source deck building community and API.

## API
API returns player decks for consumption in online games

- Get Deck: Returns a randomly generated deck
- Get Deck by ID: Returns a deck created by a player
- Get Card by ID: Returns a single card created by a player

## Community
Features
- Users can create their own account
- Once logged in, they can create a card to submit to the global deck
- Once logged in, they can create a custom deck
- Once logged in, they can assign XP to cards increasing their stats
  - Each account gets 100xp/day to assign to cards, each upvote is 15xp, and the levels grow every 100xp)
- Feed is based on recent cards added

## Cards
Cards are comprised of metadata including but not limited too
- cover art
- Created by
- description
- level (based on XP assigned by the community)
- powers (limit 3)
  - type (passive (save for next round), defensive (apply points to player health), aggressive (deal points to the opponent))
  - title
  - description
  - AP (each card gets 50 points to start, can either be directed at the player or opponent or saved for a more powerful attack)


## To figure out
- Image hosting (Use URL to begin with)

## Roadmap
- Watch prism tutorial
- watch planetscape tutorial
- concept refineement
- Get models created and API enpoints working in insomnia
- create homepage
- create login
- create card intake form
- create card feed (homepage enhancement)
- create deck building capability
- delpoy beta version

## Time permitting
- Admin dashboard to update profile information
- Update/Delete cards
- Image upload to storage bucket

## Icebox
- Stronger authentication
- Password reset/recovery