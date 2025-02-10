export const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "#1E1E1E",
      borderColor: "#444",
      color: "#fff",
      boxShadow: "none",
      "&:hover": { borderColor: "#666" },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "#1E1E1E",
      border: "1px solid #444",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#333" : isFocused ? "#292929" : "transparent",
      color: "#fff",
      "&:active": { backgroundColor: "#444" },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#fff",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "#aaa",
    }),
    input: (styles) => ({
      ...styles,
      color: "#fff",
    }),
  };