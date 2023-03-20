import React from 'react'
import "./duesDetailsForCustomer.css" 
// import { useDuesContext } from '../hooks/useDuesContext'
// import { useAuthContext } from '../hooks/useAuthContext'

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const DuesDetailsForCustomer = (props) => {
    // const {dispatch} = useDuesContext();
    // const {user} = useAuthContext();

    // const handleClick = async () => {
    //     if (!user) {
    //       return
    //     }
    
    //     const response = await fetch('/api/dues/' + props.due._id, {
    //       method: 'DELETE',
    //       headers: {
    //         'Authorization': `Bearer ${user.token}`
    //       }
    //     })
    //     const json = await response.json()
    
    //     if (response.ok) {
    //       dispatch({type: 'DELETE_DUES', payload: json})
    //     }
    //   }
    // console.log(props)

  return (
    <div className='due-details-for-customer' >
      <span>
         {props.due.Item} 
        </span>
           <span>
                 {props.due.Amount} 
            </span>
                {/* RollNo - {props.due.RollNo} <br></br> */}
                {/* Description - {props.due.Description} <br /> */}
                {/* shopName - {props.due.shopName} <br /> */}
           <span>
                  {props.due.Paid ? "Paid" : "Not Paid"} <br />
            </span>
      {/* <span className="material-symbols-outlined" onClick={handleClick} style={{cursor:"pointer"}}>delete</span> */}

    </div>
  )
}

export default DuesDetailsForCustomer