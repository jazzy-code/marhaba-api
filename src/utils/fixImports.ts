import { Project } from "ts-morph";

const project = new Project({
  tsConfigFilePath: "tsconfig.json",
});

project.getSourceFiles().forEach((file) => {
  file.getImportDeclarations().forEach((imp) => {
    const spec = imp.getModuleSpecifierValue();

    // Solo imports relativos
    if (
      (spec.startsWith("./") || spec.startsWith("../")) &&
      !spec.endsWith(".js") &&
      !spec.endsWith(".json")
    ) {
      imp.setModuleSpecifier(spec + ".js");
    }
  });
});

project.save().then(() => {
  console.log("✅ Imports actualizados");
});