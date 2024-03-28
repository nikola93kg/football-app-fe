export const handleKeyPress = (callback) => (event) => {
  if (event.key === "Enter") {
    callback();
  }
};
