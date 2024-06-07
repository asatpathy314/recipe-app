import { useState, } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaRegStar, FaStar } from "react-icons/fa";

const Ratings = ({rating, setRating, submittedRating}) => {
  const [hovered, setHovered] = useState(0);

  const StarButton = ({num}) => {
    return(
      <IconButton 
        style={{display:"inline"}}
        onClick={()=>setRating(num)}
        bg='transparent'
        _hover={{bg:'transparent'}}
        onMouseEnter={()=>setHovered(num)}
        onMouseLeave={()=>{setHovered(0)}}
        icon={(rating >= num || hovered >= num)
              ? <FaStar color='#ff8e3c'/>
              : <FaRegStar />}
      />
    )
  }

  const SubmittedStar = ({num}) =>{
    return (
      <span style={{display:"inline-flex",marginRight:5}}>
        {submittedRating >= num
          ? <FaStar color='#ff8e3c'/>
          : <FaRegStar />}
      </span>
    )
  }

  if (setRating) {
    return (
      <Box>
        <StarButton num={1}/>
        <StarButton num={2}/>
        <StarButton num={3}/>
        <StarButton num={4}/>
        <StarButton num={5}/>
      </Box>
    )
  } else{
    return(
      <Box>
        <SubmittedStar num={1}/>
        <SubmittedStar num={2}/>
        <SubmittedStar num={3}/>
        <SubmittedStar num={4}/>
        <SubmittedStar num={5}/>
      </Box>
    )
  }
  
}
export default Ratings;