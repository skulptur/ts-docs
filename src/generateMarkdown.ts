import {
  bold,
  heading,
  inlineCode,
  italic,
  lines,
  link,
  ordered,
  spaces,
  strike,
  times,
  unordered,
  code,
} from "markdown-fns";

function getFunctionInfo(funcObj) {
  const signature = funcObj.signatures[0];
  const comment = signature.comment || {};
  const summary = comment.summary || [];
  const blockTags = comment.blockTags || [];

  const name = funcObj.name;
  const description = summary
    .map((s) => s.text)
    .join(" ")
    .trim();

  const remarks = blockTags
    .filter((tag) => tag.tag === "@remarks")
    .map((tag) => tag.content.map((c) => c.text).join(" "))
    .join(" ")
    .trim();

  const see = blockTags
    .filter((tag) => tag.tag === "@see")
    .map((tag) => tag.content.map((c) => c.text).join(" "))
    .join(" ")
    .trim();

  const example = blockTags
    .filter((tag) => tag.tag === "@example")
    .map((tag) => tag.content.map((c) => c.text).join(" "))
    .join(" ")
    .trim();

  const parameters = (signature.parameters || [])
    .map((param) => {
      const paramName = param.name;
      const paramType = param.type.name || JSON.stringify(param.type);
      return `${paramName}: ${paramType}`;
    })
    .join(", ");

  const returnType = signature.type.name;
  const signatureString = `(${parameters}) => ${returnType}`;

  return {
    name,
    signature: signatureString,
    description,
    remarks,
    see,
    example,
  };
}

const functionMarkdown = ({
  name,
  signature,
  description,
  remarks,
  see,
  example,
}: any) => {
  return lines([
    heading(2, name),
    description,
    code("typescript", signature),
    remarks,
    code("typescript", example),
    see,
  ]);
};

export const generateMarkdown = (typedocJson: any) => {
  const functions = typedocJson.children
    .filter((child) => child.kindString === "Function")
    .map(getFunctionInfo);

  // const functionObjects = typedocJson.children.filter(
  //   (obj) => obj.kindString === "Function"
  // );

  return functions.map(functionMarkdown).join("\n");
};
