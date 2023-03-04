import React, { useContext, useEffect } from 'react'
import AddNote from './AddNote'

import Notes from './notes'

const Home = (props) => {

  // console.log(context);
  // console.log(setnote);


  return (
    <div>
      <AddNote ShowAlerts={props.ShowAlerts} />
      <Notes ShowAlerts={props.ShowAlerts} />

    </div >

  )
}

export default Home