ZELLE MARCOVICCI #19029526
PASSWORD VISUALIZATION FOR 289.212
NEOPASSWORDS

This is a web app to sort, display, search and visualize passwords dumped from the virtual pet website “Neopets” in 2012. Prior to this leak, Neopets stored passwords in plaintext on their servers in order to email them directly to you in the event of a lost password. Every single account created between the site began in 1999 and the leak in 2012 was effected; around 70 million in all. 
Although I badly wanted to include all 70 million passwords for maximum accuracy, it ended up being too much for mySQL to handle. As a result, this is a proof-of-concept with a paltry 1.2 million passwords in its dataset. Because the password leak was sorted alphabetically, these are overwhelmingly from accounts whose name begins with a number. As a result, the passwords feel “more random” than samples taken from somewhere in the middle of the alphabet – people whose Neopets account began with “Robert”, for example, are overwhelmingly more likely to have “Robert” somewhere in their password. Until I can handle sorting through larger data, I am pretty happy with the samples here, and the “random” button is particularly fun.
Visually, I designed the site around a similar text visualization (word frequency in a text) from Generative Gestaltung, with an added (limited) color scheme. I usually prefer designing around cool colours, but I realized that (especially when showing passwords) colours like green and blue are used to represent that your password is “safe”. Since, by nature, none of the leaked passwords are safe, I went with warm traffic light colours. 
When it came to scrubbing my data, there was a huge amount of information to sort through. Luckily, everything was separated consistently and in a consistent order. One problem I found was that, because of the age of the dataset, many of the accounts had a completely empty field for their email address, which threw off some of my regular expressions – in the primordial days of Neopets, COPPA laws meant that users who listed themselves as under-13 were not required to give an email address. I made everything consistent and easy for myself by deleting *every* email address from the files before scrubbing them down to only passwords. To get it into SQLite format, was just a matter of saving the text files as .csv and importing them into DB Browser. 
After that, I quickly realized sorting through every password (especially to figure out their frequency) was monstrously slow. I got around this for my real-time site functions by creating a new table with only unique password entries, with a second column containing how many times that password was found in the original table, and then sorting by the second column. In the end, for my random function to work correctly, I also had to add a third column for a unique ID of each password.
I struggled with how to scale the text for a while before settling on the idea of using percentages: on any given list of results, the most frequent password was treated as the model text size, and every other password scaled down from it. This is most striking on the homepage, where the most common password (123456789) is many times larger than the others. I didn’t want my passwords to get too tiny (I want to be able to read them, damn it, not just make it look cool) so I was pretty conservative with how far down they scale.
I managed my time a lot better with this assignment, but there were a few things that still didn’t make it in…
STRETCH GOALS/ABANDONED FEATURES (MAYBE SOMEDAY)
Random sorting on random password selections
Dropdown for how many results to display at once
Hover over passwords also changes color of the hovered password
Click passwords to get exact count on a separate page & see similar passwords
Including more data types associated with each password? (the leak contained usernames, real names, emails, birthdates, countries, and genders)
Make it prettier (help)
SOURCES:
Many, many frantic StackExchange searches
w3schools
https://ourcodeworld.com/articles/read/557/how-to-calculate-a-percentage-change-increase-and-decrease-from-2-values-in-javascript