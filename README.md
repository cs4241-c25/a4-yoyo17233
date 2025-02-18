## Kermit Rubik's Cube Timer Solo Project

http://a4-yoyo17233.glitch.me

This project is almost identical to assignment 3, however it is implemented in next.js and react. Instead of passport, is uses nextauth for authorization, and has more formal API calls as well, though it still uses mongoDB - connecting to an identical, but different DB than a3.

!!!Similarly to the last project, I had some issues getting mongo to connect to vercel, but running the code directly allows for full implementations, and the home pages can still be seen on vercel!!!

This project has a home, register, login, data, and timer page. After creating an account and logging in, you can record times by holding the spacebar, releasing, and then pressing it again. Additionally, by clicking the times in the sidebar, you may add a status effect to each solve, such as OK (undo status effect) +2 (adds 2 seconds) or DNF. Additionally, you can delete the solve. The largest challenge was implementing the authorization, because most of it is done via premade functions, and it isn't very intuititve. I chose to use a local strategy with passport, as it is the simplest auth method that lets you keep sessions. I used tailwind CSS, and it allowed me to create a much prettier website than A2, using much easier syntax.