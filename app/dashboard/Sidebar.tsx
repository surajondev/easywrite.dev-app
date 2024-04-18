import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Stack,
  MenuList,
} from "@chakra-ui/react";
import { FiHome, FiCompass, FiMenu, FiChevronDown } from "react-icons/fi";
import { MdOutlineArticle } from "react-icons/md";
import { IoAnalyticsOutline } from "react-icons/io5";
import { SiPlatformdotsh } from "react-icons/si";
import { IconType } from "react-icons";
import { supabase } from "@/lib/supabase";
import { useEffect, useReducer, useMemo } from "react";
import { getProfile } from "@/api/Profile";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconContext } from "react-icons";
import { CgProfile } from "react-icons/cg";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const LinkItems: Array<any> = [
  { name: "Dashboard", icon: <FiHome />, href: "/dashboard" },
  { name: "Article", icon: <MdOutlineArticle />, href: "/dashboard/article" },
  {
    name: "Analytics",
    icon: <IoAnalyticsOutline />,
    href: "/dashboard/analytics",
  },
  {
    name: "Topic Generation",
    icon: <FiCompass />,
    href: "/dashboard/topic-generation",
  },
  { name: "Platform", icon: <SiPlatformdotsh />, href: "/dashboard/platform" },
  { name: "Profile", icon: <CgProfile />, href: "/dashboard/profile" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          EasyWrite Dev
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack gap={5} pl={7} mt={2}>
        {LinkItems.map((link) => (
          <Link href={link.href} key={link}>
            <Flex gap={5} _hover={{ color: "#8B54BD" }} pt={1} pb={1}>
              <IconContext.Provider
                value={{
                  color: "#8B54BD",
                  size: "1em",
                  className: "stats-card-icon",
                }}
              >
                {link.icon}
              </IconContext.Provider>
              <Text variant="secondary-text">{link.name}</Text>
            </Flex>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, name, href, ...rest }: any) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.100",
          color: useColorModeValue("brand.100", "brand.100"),
        }}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        <Text variant={"secondary-text"} colorScheme="red">
          {name}
        </Text>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const FETCH_SUCCESS = "FETCH_SUCCESS";
  const FETCH_FAILURE = "FETCH_FAILURE";

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case FETCH_SUCCESS:
        return {
          ...state,
          profileData: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_FAILURE:
        return { ...state, data: null, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    profileData: null,
    loading: true,
    error: null,
  });

  // const [profileData, setProfileData] = useState<any>();
  const router = useRouter();

  const handleFetchData = useMemo(
    () => async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      try {
        const data = await getProfile(session);
        dispatch({ type: FETCH_SUCCESS, payload: data });
        console.log("Loading Profile....");
      } catch (error) {
        dispatch({ type: FETCH_FAILURE, payload: error });
      }
    },
    []
  );

  const hanldeSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
    localStorage.removeItem("easywrite.dev-login-data");
    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    handleFetchData();
    return () => {};
  }, [handleFetchData]);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        EasyWrite Dev
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={state.profileData && state.profileData[0].profile_img}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {state.profileData &&
                      `${state.profileData[0].first_name} ${state.profileData[0].last_name}`}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => router.push("/dashboard/profile")}>
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={hanldeSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Sidebar = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.200", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
