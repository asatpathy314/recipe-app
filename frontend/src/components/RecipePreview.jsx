import {
  Card,
  CardBody,
  Image,
  Heading,
} from "@chakra-ui/react";
import "../styles/recipe-preview.css";

const RecipePreview = ({ data }) => {
  return (
    <>
      {data && (
        <Card maxW="sm" className="preview-card" pb={5}>
          <CardBody className="preview-card-body">
            <Image
              src={data.image}
              borderRadius="lg"
              className="preview-img"
              fallbackSrc="https://via.placeholder.com/400"
            />
            <Heading size="md" className="preview-text">
              {data.label}
            </Heading>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default RecipePreview;
