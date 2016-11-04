# Clambake
## Project 2 (WDI - Orange Chicken's Revenge)

### Deliverables

* __HTML & HBS views__

* __CSS__
	* built on the Materialize framework
	* SASS

* __Scripts__
	* controllers
	* models
	* a main app.js file

* __Images__
	* example material found doing a simple internet search

* __package.json__
	* various nodes necessary to the construction and operation of the app

---

### __Technical Requirements__
This application was built as a humor blog. The git repository can be downloaded and installed ("npm install" in the terminal). After download, a database titled "clambake" with two tables (users, contents) must be created. The application must then be connected to the database on the server.

### __App Construction__
This application was built using HTML, CSS, Javascript, and mySQL.

__Materialize__ (http://materializecss.com/) provided the framework and allowed for the site to be responsive.  Additional styling was done using __SASS__.

__Javascript__ (Node JS, Express) allows for users to register, login, logout, and contribute content to the site. Database connections were also built using Javascript (models and controllers).

User passwords are not collected but are instead encrypted and stored in the database using __bcrypt__.

---

### __Summary__
Clambake is a humor blog where users can submit photos or screen captures of offensive people/things or general things that may make one do a "double take".

The content will be user submitted (registered users only) and each post will be titled by the user. Users also provide additional details in the form of a comment.

This content will then be displayed on the main page for registered users and non-registered users to view.

#### __Registration__
Users register by creating a unique user name, providing an e-mail address, and creating a password secured using bcrypt.

#### __Login__
Upon return to the site, registered users can login using their username and password (matched to encrypted password using bcrypt)/

#### __Posting Content__
Only registered and logged in users can post content - this is confirmed using Sessions. The submission form includes a field for a title, a comment to provide additional details about the post, and a photo upload. Images are stored as a string in the content table within the Clambake database. This content is then extracted and displayed on the content page.

---

### __Unsolved Problems / Future Work__
- [ ] 'Username is taken' functionality
- [ ] Password reset and forgot username functionality
- [ ] Post tags (by topic)
- [ ] Display posts in ascending order (displaying most recent submissions first)
- [ ] Include the date the post was authored
- [ ] Post tags (by topic)
- [ ] Display warning when size of file exceeds a certain size.
