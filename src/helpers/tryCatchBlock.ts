export default (fn, next) => {
  try {
    fn().catch((e) => {
      throw e;
    });
  } catch (e) {
    if (next === null) {
      throw e;
    }
    next(e);
  }
};
