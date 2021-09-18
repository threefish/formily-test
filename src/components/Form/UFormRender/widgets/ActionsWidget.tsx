import React from "react";
import { Button, Modal, Space } from "antd";
import { useDesigner } from "@designable/react";
import { observer } from "@formily/react";
import { ExclamationCircleOutlined, FileSyncOutlined } from "@ant-design/icons";
import { transformToSchema } from "@designable/formily";

interface IActionsWidgetProps {
  onSave?: (json: string) => void;
}

export const ActionsWidget = observer((props: IActionsWidgetProps) => {
  const designer = useDesigner();

  const onSave = () => {
    const json = JSON.stringify(
      transformToSchema(designer.getCurrentTree(), {
        designableFieldName: "DesignableField",
        designableFormName: "Root"
      })
    );
    console.log(json);
  };

  const routeBack = () => {
    Modal.confirm({
      title: "确定返回到列表页面?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => {}
    });
  };

  return (
    <Space style={{ marginRight: 10 }}>
      <Button
        icon={<FileSyncOutlined title="保存" />}
        size={"middle"}
        onClick={onSave}
      >
        保存
      </Button>
      <Button
        icon={<FileSyncOutlined title="返回" />}
        size={"middle"}
        onClick={routeBack}
      >
        返回
      </Button>
    </Space>
  );
});
