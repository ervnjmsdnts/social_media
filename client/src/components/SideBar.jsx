import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Link,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useNavigate, Link as RouteLink } from "react-router-dom";
import { FaCommentDots, FaNewspaper } from "react-icons/fa";
import { FiBell, FiChevronDown, FiMenu, FiSearch } from "react-icons/fi";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { LOGOUT } from "../config/graphql/mutations";
import { useAuth } from "../context/authContext";
import { GET_ALL_USERS } from "../config/graphql/queries";
import ProfileLink from "./ProfileLink";

const LinkItems = [
  { name: "Messages", icon: FaCommentDots, to: "/messages" },
  { name: "News Feed", icon: FaNewspaper, to: "/" },
];

const SideBar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="secondary">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Flex
        ml={{ base: 0, md: 60 }}
        p="4"
        alignItems="center"
        direction="column">
        {children}
      </Flex>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg="primary"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Social App
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <Link as={RouteLink} to={to} style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "secondary",
          color: "primary",
        }}
        {...rest}>
        <Box mr="4">
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{ color: "primary" }}
            as={icon}
          />
        </Box>
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const client = useApolloClient();
  const [Logout] = useMutation(LOGOUT);
  const { logout, user } = useAuth();

  const { isOpen, onOpen: modalOpen, onClose } = useDisclosure();

  const onClick = async () => {
    await Logout();
    localStorage.removeItem("accessToken");
    await client.clearStore();
    logout();
    navigate("/auth", { replace: true });
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="primary"
      color="secondary"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}>
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
        fontWeight="bold">
        Social App
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          icon={<FiSearch />}
          onClick={modalOpen}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}>
              <HStack>
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  color="secondary"
                  ml="2">
                  <Text fontSize="sm">{user.givenName}</Text>
                  <Text fontSize="xs">@{user.username}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList color="secondary">
              <Link
                style={{ textDecoration: "none" }}
                as={RouteLink}
                to={`/profile/${user.username}`}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem onClick={onClick}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      <SearchModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

const SearchModal = ({ isOpen, onClose }) => {
  const [searchUser, setSearchUser] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const { data: allUserData } = useQuery(GET_ALL_USERS);

  useEffect(() => {
    const results = allUserData?.getAllUsers.filter((user) =>
      user.username.toLowerCase().includes(searchUser)
    );

    setSearchResult(results);
  }, [searchUser, allUserData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bgColor="primary" color="secondary" mx="4">
        <ModalHeader>Search User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={searchUser}
            placeholder="Search Username"
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <Divider my="4" />
          <VStack alignItems="start" w="full" spacing="4">
            {searchResult?.map((result) => (
              <SearchUserItem
                key={result.id}
                firstName={result.firstName}
                lastName={result.lastName}
                username={result.username}
                profilePhoto={result.profilePhoto}
              />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const SearchUserItem = ({ firstName, lastName, username, profilePhoto }) => {
  return (
    <Box
      w="full"
      _hover={{ bgColor: "secondary", color: "primary" }}
      p="2"
      rounded="md">
      <ProfileLink username={username}>
        <Flex>
          <Avatar src={profilePhoto} />
          <Box ml="2">
            <Text>
              {firstName} {lastName}
            </Text>
            <Text>@{username}</Text>
          </Box>
        </Flex>
      </ProfileLink>
    </Box>
  );
};

export default SideBar;
