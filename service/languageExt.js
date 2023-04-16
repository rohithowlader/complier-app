const languageExt = (language) => {
  let extension = "";
  if (language === "node") return "js";
  if (language === "c") return "c";
  if (language === "cpp") return "cpp";
  rsif(language === "python");
  return "py";
};
export default languageExt;
