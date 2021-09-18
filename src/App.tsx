import React, { useMemo, useState } from "react";
import {
  ComponentTreeWidget,
  CompositePanel,
  Designer,
  DesignerToolsWidget,
  DragSourceWidget,
  HistoryWidget,
  MainPanel,
  OutlineTreeWidget,
  SettingsPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace,
  WorkspacePanel
} from "@designable/react";
import { SettingsForm } from "@designable/react-settings-form";
import { createDesigner, GlobalRegistry } from "@designable/core";
import {
  createDesignableField,
  createDesignableForm
} from "@formily/designable-next";
import {
  ActionsWidget,
  MarkupSchemaWidget,
  PreviewWidget,
  SchemaEditorWidget
} from "./components/Form/UFormRender/widgets";
import { useMount } from "ahooks";
import { Spin } from "antd";
import "antd/dist/antd.css";
import "@alifd/next/dist/next.css";
import "@formily/designable-next/dist/formily.designable.next.umd.production.css";

GlobalRegistry.registerDesignerLocales({
  "zh-CN": {
    sources: {
      Inputs: "输入控件",
      Layouts: "布局组件",
      Arrays: "自增组件"
    }
  },
  "en-US": {
    sources: {
      Inputs: "Inputs",
      Layouts: "Layouts",
      Arrays: "Arrays"
    }
  }
});

const Root = createDesignableForm({
  registryName: "Root"
});

const DesignableField = createDesignableField({
  registryName: "DesignableField"
});

interface IAppProps {
  onSave: (jsonSchema: string) => void;
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  const engine = useMemo(() => createDesigner(), []);

  useMount(() => {
    setLoading(false);
  });

  return (
    <Spin tip="加载中...." spinning={loading}>
      <Designer engine={engine}>
        <MainPanel logo={<ActionsWidget onSave={props.onSave} />}>
          <CompositePanel>
            {/** @ts-ignore **/}
            <CompositePanel.Item title="panels.Component" icon="Component">
              <DragSourceWidget title="sources.Inputs" name="inputs" />
              <DragSourceWidget title="sources.Layouts" name="layouts" />
              <DragSourceWidget title="sources.Arrays" name="arrays" />
            </CompositePanel.Item>
            {/** @ts-ignore **/}
            <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
              <OutlineTreeWidget />
            </CompositePanel.Item>
            {/** @ts-ignore **/}
            <CompositePanel.Item title="panels.History" icon="History">
              <HistoryWidget />
            </CompositePanel.Item>
          </CompositePanel>
          <Workspace id="form">
            <WorkspacePanel>
              <ToolbarPanel>
                <DesignerToolsWidget />
                <ViewToolsWidget
                  use={["DESIGNABLE", "JSONTREE", "MARKUP", "PREVIEW"]}
                />
              </ToolbarPanel>
              <ViewportPanel>
                <ViewPanel type="DESIGNABLE">
                  {() => (
                    <ComponentTreeWidget
                      components={{ Root, DesignableField }}
                    />
                  )}
                </ViewPanel>
                <ViewPanel type="JSONTREE" scrollable={false}>
                  {(tree, onChange) => (
                    <SchemaEditorWidget tree={tree} onChange={onChange} />
                  )}
                </ViewPanel>
                <ViewPanel type="MARKUP" scrollable={false}>
                  {(tree) => <MarkupSchemaWidget tree={tree} />}
                </ViewPanel>
                <ViewPanel type="PREVIEW">
                  {(tree) => <PreviewWidget tree={tree} />}
                </ViewPanel>
              </ViewportPanel>
            </WorkspacePanel>
          </Workspace>
          <SettingsPanel title="panels.PropertySettings">
            <SettingsForm />
          </SettingsPanel>
        </MainPanel>
      </Designer>
    </Spin>
  );
};

export default App;
