import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ClipLoader from 'react-spinners/ClipLoader'


export default function Textiles() {

  const [textiles, updateTextiles] = useState([])
  const [loading, updateLoading] = useState(true)

  useEffect(() => {
    axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Textiles&has_image=1&q=Iran')
      .then(({ data }) => {
        updateTextiles(data.data)
        updateLoading(false)
      })
  }, [])

  // useEffect(() => {
  //   axios.all([
  //     axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Textiles&has_image=1&q=Syria'),
  //     axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Textiles&has_image=1&q=Iran'), 
  //     axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Textiles&has_image=1&q=Iraq'),
  //     axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Textiles&has_image=1&q=Turkey'), 
  //     axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Textiles&has_image=1&q=Egypt'),
  //     axios.get('https://openaccess-api.clevelandart.org/api/artworks/?department=Textiles&collection=T%20-%20Islamic&has_image=1&q=Spain')
  //   ])
  //     .then(({ data }) => {
  //       updateTextiles(data.data)
  //       updateLoading(false)
  //     })
  // }, [])


  console.log(textiles[1])

  //guard condition 
  if (loading) {
    // return <GridLoader loading={loading} size={15} margin={2}/>
    return <ClipLoader loading={loading} size={35} />
  }
  // .slice(0, 25)
  return <div>
    {textiles.map(item => {
      // { console.log(item.title) }

      if (item.fun_fact === null && item.wall_description === null || item.wall_description === null) {
        return <div className="textile-card" key={item.id}>
          <h3 className="title">{item.title}</h3>
          <img className="image" src={item.images.web.url} alt={item.title} width='200' />
          <h3 className="date">Date: {item.creation_date} | Culture: {item.culture}</h3>
        </div>
      } else if (item.fun_fact === null) {
        return <div className="textile-card" key={item.id}>
          <h3 className="title">{item.title}</h3>
          <img className="image" src={item.images.web.url} alt={item.title} width='200' />
          <h3 className="date">Date: {item.creation_date} | Culture: {item.culture}</h3>
          <h4 className="description">Description: {item.wall_description}</h4>
        </div>
      } else {
        return <div className="textile-card" key={item.id}>
          <h3 className="title">{item.title}</h3>
          <img className="image" src={item.images.web.url} alt={item.title} width='200' />
          <h4 className="date-culture">Date: {item.creation_date} | Culture: {item.culture}</h4>
          <h4 className="description">Description: {item.wall_description}</h4>
          <h4 className="fun-fact">Fun Fact: {item.fun_fact}</h4>
        </div>
      }


    })}

  </div>
}




