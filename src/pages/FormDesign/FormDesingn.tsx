import React from 'react';
import UFormRender from "../../components/Form/UFormRender";

interface IFormDesingnProps {
}

const FormDesingn: React.FC<IFormDesingnProps> = (props: IFormDesingnProps) => {

    const onSave = (json: any) => {
        console.log(json)
    }

    const onMout = (): Promise<any> => {
        return Promise.resolve('{\n' +
            '  "form": {\n' +
            '    "labelCol": 6,\n' +
            '    "wrapperCol": 12\n' +
            '  },\n' +
            '  "schema": {\n' +
            '    "type": "object",\n' +
            '    "properties": {\n' +
            '      "ucviqvk9zek": {\n' +
            '        "title": "Input",\n' +
            '        "type": "string",\n' +
            '        "x-decorator": "FormItem",\n' +
            '        "x-component": "Input",\n' +
            '        "x-validator": [],\n' +
            '        "x-component-props": {},\n' +
            '        "x-decorator-props": {},\n' +
            '        "x-designable-id": "ucviqvk9zek",\n' +
            '        "x-index": 0\n' +
            '      }\n' +
            '    },\n' +
            '    "x-designable-id": "kw088yzcxk7"\n' +
            '  }\n' +
            '}');
    }

    return <><UFormRender onSave={onSave} onMout={onMout}/></>;
}

export default FormDesingn;
