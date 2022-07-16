![screenshot of website with opendeck logo overlayed](https://opendeck.dev/social.png)
# **opendeck**

Opendeck is an open source deck building platform that facilitates the creation and organization of playable cards. The cards and decks created by the community can then be consumed via API for use in custom games.

Built with ❤️ for the **Hashnode x PlanetScale Hackathon**

[Live app](https://opendeck.dev)

[GitHub Repo](https://github.com/huntertrammell/opendeck.io)

## **Stack**

- Next.js
- TypeScript
- Tailwind CSS
- PlanetScale
- Prisma
- Supabase (image storage)


## **Features**

### **Global alert system**
Created a pubsub to handle rendering the alert component for API driven components such as card/deck creation forms and pagination/sorting. More information on how this works can be [found on my blog](https://huntertrammell.dev/blog/how-to-create-a-dynamic-alert-component-in-react).

### **Live card editing**
When creating and editing your cards you can see your card updates in realtime.

### **Public API**
Built to be consumed via custom games, the public API allows you to query cards and decks created by the community. There is also an insomnia package that includes all the routes for more detailed examples.

### **Rate Limiting**
The public API has rate limiting in place to help keep the server load contained. API calls are limited to 50 calls per minute.

### **Community driven XP system**
Cards have levels determined by the XP assigned to a card. Each authenticated can assign 15pts of XP to each card, once the card has 200XP it will gain a level.