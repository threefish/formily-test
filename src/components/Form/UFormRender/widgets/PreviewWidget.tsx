import React, { useMemo } from "react";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import {
  ArrayCards,
  ArrayTable,
  Cascader,
  Checkbox,
  DatePicker,
  Editable,
  Form,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload
} from "@formily/antd";
import { Card, Rate, Slider } from "antd";
import { TreeNode } from "@designable/core";
import { transformToSchema } from "@designable/formily";

const SchemaField = createSchemaField({
  components: {
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate
  }
});

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree, {
    designableFormName: "Root",
    designableFieldName: "DesignableField"
  });
  const SchemaFieldSchema = schema as any;
  // @ts-ignore
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={SchemaFieldSchema} />
    </Form>
  );
};
