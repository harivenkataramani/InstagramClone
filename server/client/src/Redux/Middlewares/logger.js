const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("WL action: ", action);
  const returnValue = next(action);
  console.log("WL new state: ", store.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;
