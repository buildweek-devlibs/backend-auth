# backend-auth

## Proposal:

What problem does your app solve?

> Lets developers post quirky content to their twitter feed without having to spend too much time coming up with it and without having to think too hard about it.

Being as specific as possible, how does your app solve the problem?

> Give the dev a list of possible prompts and allow them to submit new ones easily. Completed prompts show on their profile and can be posted to Twitter.

What is the mission statement?
Make something that works!!! And try not to start a [holy war](http://www.catb.org/jargon/html/H/holy-wars.html) through the power of randomness!

## Features:

What features are required for your minimum viable product?

> - User can add, edit, and delete libs tied to their account.
> - User can complete libs and read the final result
> - User can post the completed lib to twitter via a share link (be mindful of the character limit for twitter)
> - User is able to access libs by category and has access to all of the libs that users have submitted.

What features may you wish to put in a future release?

> - Create a moderator user type that can review submitted libs and verify they are not violating a code of conduct that you come up with before they are available for everyone.
> - Automatically add a shortened link back to your app when libs are posted to twitter.
> - Add definitions that dynamically render for, adverbs, adjectives, pronouns, etc for those of us that can't remember exactly what they are when we are filling out the form. Bonus: be able to toggle it on and off.
> - Maybe OAuth and PostgresQL?

What do the top 3 similar apps do for their users?

> - Large library of libs
> - Multiple variations of same app based on category
> - Social media integration

## Frameworks - Libraries:

What 3rd party frameworks/libraries are you considering using?

> FrontEnd: React, ReachUI, Styled-Components
> BackEnd: Express, Knex, SQLite3/PostgresQL

Do APIs require you to contact its maintainer to gain access?

> None

Are you required to pay to use the API?

> No

Have you considered using Apple Frameworks? (MapKit, Healthkit, ARKit?)

> No

## Prototype Key Feature(s):

This is the “bread and butter” of the app, this is what makes your app yours. Calculate how long it takes to implement these features and triple the time estimated. That way you’ll have plenty of time to finish. It is preferred to drop features and spend more time working on your MVP features if needed.

> - Register an account.
> - View account overview.
>   - Name
>   - Bio
>   - Submitted Libs _(v2. tabs for all, drafts, pending, approved, and rejected)_
>   - _(v2 Friend’s approved Libs)_
> - _(v2 View other accounts and send friend requests)_
> - _(v2 Send friend requests directly by using their email address.)_
> - View Libs by category (all, <category1>, <category 2>, etc.) _(v2 sort by latest, top rated, etc.)_
> - Choose a Lib from the list and add to your account with your answers to it.
> - Submit a new Lib to the list and assign it the correct category from the available list.
> - Request to have a new LibCategory added through mod approval.
> - Moderator account access (able to view all accounts, approve/reject new Libs, approve/reject new LibCategories)
