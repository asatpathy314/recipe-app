import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import '../styles/recipe-preview.css'

const RecipePreview = ({data, forAdmin, forMyRecipes}) => {

  return (
    <>
      {data &&
      <Card maxW='sm'className="preview-card" pb={5}>
        <CardBody className="preview-card-body">
          <Image
          src={data.image}
          borderRadius='lg'
          className='preview-img'
          fallbackSrc='https://via.placeholder.com/400'
          />
          <Heading size='md' className='preview-text'>{data.label}</Heading>
        </CardBody>
      </Card>
}
    </>
  )
  
}

export default RecipePreview

/*
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
            */