import React, { useEffect, useState } from "react";
import Axios from 'axios';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    Axios.get('http://localhost:5000/api/colors', {
      headers: {
        authorization: token
      }
    })
      .then(res => {
        setColorList([...res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container" data-testid='color-list'>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
