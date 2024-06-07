import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Box } from "@chakra-ui/react";
// make sure average rating is updated correctly when a new comment is added.
// make sure it's in an inline span with good margins
// make every icon orange
// make sure the avg is
const Stars = ({avg}) => {
  if (avg > 4.75){
    return (
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 4.25){
    return (
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStarHalfAlt color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 3.75){
    return (
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 3.25){
    return(
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStarHalfAlt color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 2.75){
    return(
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 2.25){
    return(
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStarHalfAlt color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 1.75){
    return (
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 1.25){
    return(
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaStarHalfAlt color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 0.75){
    return(
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else if (avg > 0.25){
    return(
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaStarHalfAlt color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  } else {
    return(
      <>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
        <span style={{display:"inline-flex",marginRight:5}}><FaRegStar color='#ff8e3c'/></span>
      </>
    )
  }
}
const AverageRating = ({avg, numComments}) => {
  return(
    <Box alignContent={"center"}>
      <span style={{display:"inline-flex",marginRight:5}}>{avg}</span>
      <Stars avg={avg} paddingBottom/>
      <span style={{display:"inline-flex",marginRight:5}}>({numComments})</span>
    </Box>
  )
}
export default AverageRating