export const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      borderColor: "#444",
      color: "#fff",
      boxShadow: "none",
      borderRadius: "10px",
      "&:hover": { borderColor: "#666" },
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      border: "1px solid rgb(59, 59, 59, 0.5)",
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