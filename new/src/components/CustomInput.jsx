import { Input, FormControl, FormLabel } from "@chakra-ui/react";

const CustomInput = ({ label, placeholder, ...props }) => {
  return (
    <FormControl isRequired>
      <FormLabel fontSize="lg">{label}</FormLabel>
      <Input
        placeholder={placeholder}
        _placeholder={{ color: "gray.500" }}
        color="primary"
        borderColor="primary"
        bgColor="white"
        name="username"
        size="lg"
        mb="4"
        {...props}
      />
    </FormControl>
  );
};

export default CustomInput;
