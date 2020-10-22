<template>
  <div ref="editor"></div>
</template>
<script>
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
export default {
  name: "JsonEditor",
  mounted() {
    console.log(this.$refs.editor);

    function make_json(schema) {
      if (schema.type == "object") {
        const model = {};
        for (const key in schema.properties) {
          model[key] = make_json(schema.properties[key]);
        }
        return model;
      }
      if (schema.type == "array") {
        return [];
      }

      if (schema.type == "string") {
        return schema.default || "";
      }
    }
    const schema = {
      title: "Employee",
      description: "Object containing employee details",
      type: "object",
      properties: {
        firstName: {
          title: "First Name",
          description: "The given name.",
          examples: ["John"],
          type: "string",
        },
        lastName: {
          title: "Last Name",
          description: "The family name.",
          examples: ["Smith"],
          type: "string",
        },
        gender: {
          title: "Gender",
          enum: ["male", "female"],
        },
        availableToHire: {
          type: "boolean",
          default: false,
        },
        age: {
          description: "Age in years",
          type: "integer",
          minimum: 0,
          examples: [28, 32],
        },
        job: {
          $ref: "job",
        },
      },
      required: ["firstName", "lastName"],
    };

    const j = make_json(schema);
    console.log(j);

    const job = {
      title: "Job description",
      type: "object",
      required: ["address"],
      properties: {
        company: {
          type: "string",
          examples: ["ACME", "Dexter Industries"],
        },
        role: {
          description: "Job title.",
          type: "string",
          examples: ["Human Resources Coordinator", "Software Developer"],
          default: "Software Developer",
        },
        address: {
          type: "string",
        },
        salary: {
          type: "number",
          minimum: 120,
          examples: [100, 110, 120],
        },
      },
    };

    const json = {
      firstName: "John",
      lastName: "Doe",
      gender: null,
      age: "28",
      availableToHire: true,
      job: {
        company: "freelance",
        role: "developer",
        salary: 100,
      },
    };

    const options = {
      schema: schema,
      schemaRefs: { job: job },
      mode: "tree",
      modes: ["code", "text", "tree", "preview"],
    };
    const editor = new JSONEditor(this.$refs.editor, options);
  },
};
</script>