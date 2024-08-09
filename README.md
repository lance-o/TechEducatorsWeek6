# Assignment Reflection

I had a lot of trouble with this, but that's okay. I really think I'll like react with a little bit more time getting used to it.
Getting used to a library that does so many things in a specific way makes it feel very arbitrary, but when react works,
I can see why it's so good.

# Requirements & Stretch goals

I use useState all over the place in this project, and I use useEffect quite a lot, too.

JSX is used by all of my components, of which there are plenty. I normally make a zillion files in my own projects, 
so I'm happy to be tasked with making some :)

I basically copied the setinterval implementation from the demo, and thankfully it works. I did it inside of my App.jsx instead of in
its own component, and post getting-used to react, I think I'd just do that next time>

.map() is cool. I used it for both Buildings (what original Cookie Clicker calls "Upgrades") and Upgrades (Making your buildings stronger).
It's fundamentally just a for loop, no?

Purchasing Buildings and Upgrades was super easy to implement, it's the last thing I really did logic-wise and react made it super easy to do it.
I pass the function through a sort of middle-management thing, which I regretted at first, but now I'm happy enough with it.

I did have to do some very probably bad things to get the rest of the react app to update alongside loading LocalStorage.
If you break it, it's your fault! My app is flawless (pls dont break it :C)

I made my own little api this time (reference the api directory for this). I pull from it for the Upgrades and Buildings.
I also made it look at stars on the repo.

Is the UI excellent? Not really... I didn't implement half the things I did last time. It's fine, but I understand not being given a point on that :)
