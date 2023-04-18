const languageExt = (language) => {
  let extension = "";
  if (language === "node") return "js";
  if (language === "c") return "c";
  if (language === "cpp") return "cpp";
  if(language === "python");
  return "py";
};
export default languageExt;
