export default (msg, status) => {
  throw Object.assign(new Error(msg), { status });
};
