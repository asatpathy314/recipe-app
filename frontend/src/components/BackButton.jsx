import { useNavigate } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";

const BackButton = ({ icon, ...rest }) => {
  // You can pass any styling props with the ...rest operator. Check LoginPage.jsx for an example
  const navigate = useNavigate();
  return (
    <IconButton
      position="absolute"
      top="1rem"
      left="1rem"
      onClick={() => navigate(-1, { replace: true })}
      icon={icon}
      {...rest}
    />
  );
};

export default BackButton;
