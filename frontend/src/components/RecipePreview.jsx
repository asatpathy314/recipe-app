import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { FaBookmark, FaRegBookmark, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import '../styles/recipe-preview.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const RecipePreview = ({data, forAdmin, forMyRecipes}) => {
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const handleSave = () => {
    if (saved) {
      setSaved(false);
    } else {
      setSaved(true)
    }
  }
  const handleApprove = () => {
  }
  const handleDelete = () => {
  }
  const handleNavigate = () => {
    //navigate("");
  }
  return (
    <>
      <Card maxW='sm' onClick={handleNavigate} className="preview-card">
        <CardBody className="preview-card-body">
          <Image
          src={data.img}
          borderRadius='lg'
          className='preview-img'
          />
          <Heading size='md' className='preview-text'>{data.title}</Heading>
        </CardBody>
        {forAdmin ? 
          <CardFooter className="preview-footer-admin">
            <IconButton 
                aria-label='Delete recipe'
                style={{"backgroundColor":"transparent"}}
                icon={<FaTimesCircle/>}
                fontSize={22}
                onClick={handleDelete}
              />
              <IconButton 
                aria-label='Approve recipe'
                style={{"backgroundColor":"transparent"}}
                icon={<FaCheckCircle color="ff8e3c"/>}
                fontSize={22}
                onClick={handleApprove}
              />
          </CardFooter> :
          forMyRecipes ? 
          <></> :
          <CardFooter className="preview-footer">
            {saved ?
              <IconButton 
                aria-label='Bookmark recipe'
                style={{"backgroundColor":"transparent"}}
                icon={<FaBookmark color="ff8e3c"/>}
                fontSize={18}
                onClick={handleSave}
              /> :
              <IconButton 
                aria-label='Undo bookmark recipe'
                style={{"backgroundColor":"transparent"}}
                icon={<FaRegBookmark/>}
                fontSize={18}
                onClick={handleSave}
              />
            }
        </CardFooter>}
      </Card>
    </>
  )
  
}

export default RecipePreview