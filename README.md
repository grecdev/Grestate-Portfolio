# Grestate

Want to buy a house ? Maybe rent some apartment, here is the perfect place to find the property that suit your needs.

:computer: Live preview: [in progress]()

### To properly run the website on your local machine:

**Installing:**

1. Assuming you have [`git`](https://git-scm.com/downloads) installed type in console: `git clone https://github.com/grecdev/Grestate-Portfolio.git`

2. Make sure you have the latest version of [Node.js](https://nodejs.org/en/download/)

3. [node package manager](https://docs.npmjs.com/about-npm/), run the following command in the `CLI` (command line interface):
```
npm install -g npm@latest
```
4. Install all `dependencies / modules`, run the following command in the `CLI` (command line interface):
```
npm install
```

**To browse the website**:

1. `npm start` - To run development server on your local machine (`localhost`)

2. `npm run build` - To get all production files

### I used the following technologies for this project:

- Semantic HTML5
- [Sass](https://sass-lang.com/) (with `.scss` extension / syntax, see more details [here](https://sass-lang.com/documentation/syntax))
- Media Queries ( Responsive Design )
- React.js
- [Jump.js](http://callmecavs.com/jump.js/) library for smooth scroll
- [Webpack](https://github.com/webpack/webpack)
- For `version control system` i used [Git](https://git-scm.com/)

### Features for this website:

1. [Smooth Scroll](http://callmecavs.com/jump.js/)
2. Form regex validation
3. Single Page Application
4. For state management i used: `context api` + `state hook / class component setState / useReducer hook`
5. [Code splitting](https://reactjs.org/docs/code-splitting.html) with lazy() and Suspense
6. For my properties "database" i used a `json` file hosted with github pages
7. For the property page i created an `infinite slideshow gallery`
8. Filter functionality for properties
9. Authentication with Firebase / Firestore
10. Properties displayed on a [map](https://visgl.github.io/react-map-gl/)

For `api data` fetching i used:
```
XMLHttpRequest()
Fetch api
Async / await
```

### :bowtie: Contribuitors:

Grecu Alexandru aka [`grecdev`](https://github.com/grecdev)

### License:

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/grecdev/Grestate-Portfolio/blob/master/LICENSE.md) file for details

***Additional information:***

:iphone: Check for `responsive design` in chrome: 

1. Open `developer console` pressing `F12`
2. Click on the `Toggle Device Toolbar` button or press `Ctrl + Shift + M`

(make sure you `refresh` the page each time you change the mobile device)

You can check for website performance with `google audit` (it checks for individual page):

1. Open an `incognito tab`. ( Disables extenstions, and it works better )

- Windows | Linux, | Chrome OS: `Press Ctrl + Shift + n`.
- Mac: `Press ⌘ + Shift + n`.

2. Open `developer console` pressing `F12`
3. Select `Audits` tab
4. Press `Run audits` blue button on the bottom of the tab
