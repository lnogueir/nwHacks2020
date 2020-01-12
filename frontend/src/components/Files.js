import React, { useState, useEffect }from 'react'
import axios from 'axios';
import Utils from '../assets/js/Utils'

function Files(props) {
    const fileIds = props.notes;

    return fileIds.map(e => {
        axios.get('http://localhost:5000/note/' + e)
            .then(res => {
                return (
                    <div>
                        <p>{res}</p>
                    </div>
                )
            })
    })
  }

  export default Files;