# ![General Assembly logo](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project #2: A React App using a third-party API

## Technical Requirements:

* **Consume a public API** 
* **Have several components** 
* **The app should include a router** - with several "pages"
* **Include wireframes** 
* Have **semantically clean HTML** 
* **Be deployed online** and accessible to the public

## Overview and Concept

My project partner, Katherine, and I were both excited to be paired together for this 48 hour pair project to build a React application that consumes a public API. We both love museums and discovered we were both interested in Islamic Art (and exchanged recommendations for our favourite galleries), so we decided this would be the project's theme. Katherine found the Cleveland Museum of Art's API, which was perfect for our needs. 

The first challenge was to set the scope of the app we'd build - the Museum's Islamic Art collection and data offered us many options. We used the API's detailed docs to come up with a list of likely endpoints we could use for our project, ultimately deciding on filtering and displaying the collection by 3 object categories: textiles, decorative arts and books. Textiles can then be filtered further by country, and the latter two categories can be filtered by further object types. Each object can be clicked on and a new page will show more information about it.

We chose to display the following data on each object: 
* name
* image
* object date 
* culture of origin
* description
* fun fact (we were especially thrilled to discover the API data included this!)
* credit

Not all objects had data for all of these fields, so we added logic to ensure that those fields would not be rendered if empty.

In terms of style, we used the Smithsonian Design Museum's website to discover colour palettes by viewing different objects from the Islamic Art collection.

The project can be viewed here: https://bojanacodes.github.io/project-2/

We mostly pair-programmed throughout this project using LiveShare on VS Code. 


## Technologies used

* HTML
* CSS
* JavaScript
* React
* Axios 
* React Spinner
* Lodash Shuffle


## Tools used

* VS Code
* Insomnia
* Git 
* GitHub
* Npm 
* Google Chrome Developer tools


## Approach taken

Once we had the general outlines sketched in wireframes, and some pseudocode to check the main coding components, particularly getting the right data from the API and filtering, we started on the homepage. After deciding on using images from the collections to create a simple look, we both shortlisted our favourite likely portrait images and then agreed on the three to use. We experimented with a couple of styles with the text over the image including having a background behind the text, and we loved the look of the homepage images with the linear gradient over the images - the gradient colours were chosen from our colour scheme. 

![Homepage view](https://i.imgur.com/5xPOPVH.png)


For each of the 3 main sections, we used similar code to set each of the pages up. 

![Textiles section page view](https://i.imgur.com/yuDNaHx.png)




We had to use data from more than one API endpoint, so we used Axios.all for the multiple Get requests, then combined the data by concatenating the arrays. All the API requests were set to include the search string 'has_image=1' because we knew we only wanted to display the results of objects with an image.

We then used a Lodash Shuffle component to shuffle this data, to make it more interesting to the website user.

``` 
useEffect(() => {
    axios.all([
      axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Islamic%20Art&has_image=1&type=Manuscript'),
      axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Islamic%20Art&has_image=1&type=Calligraphy'),
      axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Islamic%20Art&has_image=1&type=Book%20Binding')
    ])
      .then(axios.spread((...responses) => {
        const booksArray = responses[0].data.data.concat(responses[1].data.data, responses[2].data.data)
        const shuffledBooksArray = _.shuffle(booksArray)
        // updateBooks(responses[0].data.data.concat(responses[1].data.data, responses[2].data.data).slice(0,10))
        updateBooks(shuffledBooksArray)
        updateLoading(false)
      }))
  }, [])
```


Given the large amount of data, we added a React Spinner to appear while the data was being obtained from the API via Axios. A state variable, loading, was updated to false when the data state variable was updated (books in the example above).

```
  if (loading) {
    return <ClipLoader loading={loading} size={35} color="#a0522d" />
  }
```

We wanted a simple way to display the object and decided to stick with the homepage colour scheme. As the objects were so varied and beautiful in themselves, we didn't want to clash with or distract from them. We decided on displaying data about the objects in columns of 'cards'. Each card had a border and the same colour background to its title, the object name. 

Each card is a link to a page with more information about the object.

```
<div className="card-container">
      {books.filter(item => {
        return (filter === 'All' || filter === item.type.toLowerCase())
      })
        .map(item => {

          return <Link key={item.id} to={`/project-2/book/${item.id}`}>

            <div className="card" key={item.id}>
              <h3 className="title">{item.title}</h3>
              <img className="image" src={item.images.web.url} alt={item.title} width='200' />
              <h3 className="date">Date: {item.creation_date}</h3>
              <h3 className="culture">Culture: {item.culture}</h3>
            </div>
          </Link>

        })}

    </div>
    
```

We added a second nav-bar equivalent for filtering purposes, to keep the style consistent.

```  
<ul className="books-nav">
    <li className="books-nav-links" onClick={(event) => updateFilter('manuscript')} value={'manuscript'}>Manuscript
      {/* <Link to={'/project-2/books/manuscript'}>Manuscript</Link> */}
    </li>
    <li className="books-nav-links" onClick={(event) => updateFilter('calligraphy')} value={'calligraphy'}>Calligraphy
      {/* <Link to={'/project-2/books/manuscript'}>Calligraphy</Link> */}
    </li>
</ul>
      
```

For the individual object pages, we slightly changed the style as the page was less busy. 

![Individual object page view](https://i.imgur.com/cV8E3IM.png)


## Bugs and challenges

Some elements displayed differently on our respective screens despite using the same browser, so we found that we couldn't quite get this so that it appeared consistently for both of us, for example the line crediting the Cleveland Museum of Art at the bottom of the homepage.

There was a bug with the navigation once a filter had been selected: after clicking on a filter, then trying to immediately go back to the original unfiltered category page via the nav bar, the page did not appear without the filter applied, as you would expect. 

One of the biggest challenges here was time - as we only had 48 hours we had to quickly agree on the concept and plan, make the code work and make it look pretty. So we had to keep checking on time and re-evaluate our plan (and our list of desired features) to make sure we could deliver on time.

## Wins and learnings

This was my first time working on a coding project with someone else and it was a really good experience to have insight into someone else's thought process, I learned so much from working with Katherine and discovering other ways of thinking. I felt we did really well overall, we communicated well and planned in detail, so I felt we were both clear on what was happening with the project at all times. 

We spent a good amount of time just getting to know the museum API and thinking about how best to use it. We had a lot of ideas and I am really happy with the endpoints we chose and how we worked with them. 

## Future features

* Adding a map API to show where a collection item is from
* Adding pagination to limit how many objects are displayed per page
* Adding a search bar
* Adding a 'random' page to display a random object
* Adding mobile responsiveness

