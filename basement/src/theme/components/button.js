export const buttonStyles = {
  components: {
    Button: {
      variants: {
        noHover: {
          _hover: {
            boxShadow: "none",
          },
        },
        transparentWithIcon: {
          bg: "transparent",
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
          },
        },
        brand: {
          bg: "brand.200",
          color: "#fff",
          _hover: {
            bg: "brand.300",
          },
          _active: {
            bg: "brand.400",
          },
          _focus: {},
        },
        secondary: {
          bg: "transparent",
          color: "#fff",
          borderColor: "brand.300",
          borderWidth: "1px",
          _hover: {
            bg: "brand.100",
          },
          _active: {
            bg: "brand.200",
          },
          _focus: {},
        },
        outlineWhite: {
          bg: "transparent",
          color: "#fff",
          borderColor: "white",
          borderWidth: "1px",
          _hover: {
            bg: "whiteAlpha.100",
          },
          _active: {
            bg: "whiteAlpha.200",
          },
          _focus: {},
        },
        danger: {
          bg: "transparent",
          color: "red.800",
          borderColor: "red.800",
          borderWidth: "1px",
          _hover: {
            bg: "red.500",
          },
          _active: {
            bg: "red.500",
          },
          _focus: {},
        }
      },
      baseStyle: {
        borderRadius: "12px",
        _focus: {
          boxShadow: "none",
        },
        _active: {}
      },
    },
  },
};
