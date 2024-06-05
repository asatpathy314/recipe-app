// Source: https://chakra-templates.dev/navigation/navbar/
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext }  from "./AuthProvider";

const getNavItems = ( { isAdmin, isLoggedIn }) => {
    if (isAdmin) {
        return (
            [
            {
              label: "Admin Dashboard",
              href: "/admin",
            },
            {
              label: "Discover",
              href: "/discover",
            },
            {
              label: "My Recipes",
              href: "/my-recipes",
            },
            {
              label: "Create A Recipe",
              href: "/create",
              }, 
            ]
        )
    }
    else if (isLoggedIn === "true") {
        return (
            [
            {
            label: "Discover",
            href: "/discover",
            },
            {
            label: "My Recipes",
            href: "#",
            },   
            {
              label: "Create A Recipe",
              href: "create",
              }, 
            ]
        )
    } else {
        return (
            []
        )
    }
}


export default function Navbar() {
    const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { email, isLoggedIn, setEmail, setUserID, setAccessToken, setIsLoggedIn} = useContext(AuthContext);
  const logout = () => {
        localStorage.clear();
        setEmail('');
        setUserID('');
        setAccessToken('');
        setIsLoggedIn(false);
        navigate('/');
    };
  const isAdmin = email === "admin@savorytastes.org";
  return (
    <Box>
      <Flex
        bg={"#eff0f3"}
        color={"#0d0d0d"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href={"/"}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
          >
            Savory Stories
          </Text>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
        {!isLoggedIn ? (
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"/login"}
          >
            Sign In
          </Button>
        ) : (
            <Button
            fontSize={"sm"}
            fontWeight={400}
            onClick={logout}
            >
                Sign Out
            </Button>        
        )}
        {!isLoggedIn && (
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"#ff8e3c"}
            href={"/register"}
            _hover={{
              bg: "#ff9d56",
            }}
          >
            Sign Up
          </Button>
        )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav isAdmin={isAdmin} isLoggedIn={isLoggedIn}/>
      </Collapse>
    </Box>
  );
}

const DesktopNav = ( {isAdmin, isLoggedIn} ) => {
  const linkColor = "#2a2a2a";
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const NAV_ITEMS = getNavItems({isAdmin, isLoggedIn});

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ( {isAdmin, isLoggedIn} ) => {
    const NAV_ITEMS = getNavItems({isAdmin, isLoggedIn});
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
