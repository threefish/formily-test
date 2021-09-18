import React, { useMemo } from 'react';
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
import { createDesignableField, createDesignableForm } from "@formily/designable-antd";
import "antd/dist/antd.css";
import "@formily/designable-antd/dist/formily.designable.antd.umd.production.css";
import ReactDOM from "react-dom";

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


interface IAppProps {
}

const App: React.FC<IAppProps> = (props: IAppProps) => {

    const engine = useMemo(() => createDesigner(), [])

    return (
        <Designer engine={engine}>
            <MainPanel logo={<></>}>
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
                            <ViewToolsWidget use={['DESIGNABLE']}/>
                        </ToolbarPanel>
                        <ViewportPanel>
                            <ViewPanel type="DESIGNABLE">
                                {() => (<ComponentTreeWidget components={{Root, DesignableField}}/>)}
                            </ViewPanel>
                        </ViewportPanel>
                    </WorkspacePanel>
                </Workspace>
                <SettingsPanel title="panels.PropertySettings">
                    <SettingsForm/>
                </SettingsPanel>
            </MainPanel>
        </Designer>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"));
