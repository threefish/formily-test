import React, { useEffect, useMemo, useState } from 'react';
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
    WorkspacePanel,
} from '@designable/react'
import { SettingsForm } from '@designable/react-settings-form'
import { createDesigner, GlobalRegistry } from '@designable/core'
import { createDesignableField, createDesignableForm, } from '@formily/designable-next'
import 'antd/dist/antd.less'
import { ActionsWidget, MarkupSchemaWidget, PreviewWidget, SchemaEditorWidget } from "./widgets";
import { transformToTreeNode } from "@designable/formily";
import { Spin } from "antd";

GlobalRegistry.registerDesignerLocales({
    'zh-CN': {
        sources: {
            Inputs: '输入控件',
            Layouts: '布局组件',
            Arrays: '自增组件',
        },
    },
    'en-US': {
        sources: {
            Inputs: 'Inputs',
            Layouts: 'Layouts',
            Arrays: 'Arrays',
        },
    },
})

const Root = createDesignableForm({
    registryName: 'Root',
})

const DesignableField = createDesignableField({
    registryName: 'DesignableField',
})


interface IUFormRenderProps {
    onSave: (jsonSchema: string) => void
    onMout: () => Promise<string>
}

const UFormRender: React.FC<IUFormRenderProps> = (props: IUFormRenderProps) => {

    const [loading, setLoading] = useState<boolean>(true);

    const engine = useMemo(() => createDesigner(), [])

    useEffect(() => {
        props.onMout().then((schema: any) => {
            engine.setCurrentTree(
                transformToTreeNode(JSON.parse(schema), {
                    designableFieldName: 'DesignableField',
                    designableFormName: 'Root',
                })
            )
        }).finally(() => setLoading(false));
    })

    return (
        <Spin tip="加载中...." spinning={loading}>
            <Designer engine={engine}>
                <MainPanel logo={<ActionsWidget onSave={props.onSave}/>}>
                    <CompositePanel>
                        <CompositePanel.Item title="panels.Component" icon="Component">
                            <DragSourceWidget title="sources.Inputs" name="inputs"/>
                            <DragSourceWidget title="sources.Layouts" name="layouts"/>
                            <DragSourceWidget title="sources.Arrays" name="arrays"/>
                        </CompositePanel.Item>
                        <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
                            <OutlineTreeWidget/>
                        </CompositePanel.Item>
                        <CompositePanel.Item title="panels.History" icon="History">
                            <HistoryWidget/>
                        </CompositePanel.Item>
                    </CompositePanel>
                    <Workspace id="form">
                        <WorkspacePanel>
                            <ToolbarPanel>
                                <DesignerToolsWidget/>
                                <ViewToolsWidget use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}/>
                            </ToolbarPanel>
                            <ViewportPanel>
                                <ViewPanel type="DESIGNABLE">
                                    {() => (<ComponentTreeWidget components={{Root, DesignableField}}/>)}
                                </ViewPanel>
                                <ViewPanel type="JSONTREE" scrollable={false}>
                                    {(tree, onChange) => <SchemaEditorWidget tree={tree} onChange={onChange}/>}
                                </ViewPanel>
                                <ViewPanel type="MARKUP" scrollable={false}>
                                    {(tree) => <MarkupSchemaWidget tree={tree}/>}
                                </ViewPanel>
                                <ViewPanel type="PREVIEW">
                                    {(tree) => <PreviewWidget tree={tree}/>}
                                </ViewPanel>
                            </ViewportPanel>
                        </WorkspacePanel>
                    </Workspace>
                    <SettingsPanel title="panels.PropertySettings">
                        <SettingsForm/>
                    </SettingsPanel>
                </MainPanel>
            </Designer>
        </Spin>
    )
}

export default UFormRender;
