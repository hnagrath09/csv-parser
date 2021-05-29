import React, { useEffect, useState } from "react";
import { CSVReader } from "react-papaparse";
import { Modal, Select } from "antd";
import CSVTable from "./components/csv-table";

function App() {
  const [fileData, setFileData] = useState<Array<any> | undefined>();
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<"idle" | "uploaded" | "mapped">("idle");

  const requiredColumns = ["id", "email"];
  const columns = fileData?.[0].data;

  useEffect(() => {
    if (!!fileData) {
      setIsVisible(true);
    }
  }, [fileData]);

  const handleOnDrop = (data: any) => {
    console.log("---------------------------");
    console.log(data);
    setFileData(data);
    setStatus("uploaded");
    console.log("---------------------------");
  };

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data: any) => {
    console.log("---------------------------");
    // console.log(data);
    console.log("---------------------------");
  };

  const clearFileData = () => {
    setFileData(undefined);
    setStatus("idle");
  };

  const { Option } = Select;

  if (status === "idle") {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex flex-col items-center h-32 max-w-md mx-auto">
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            onRemoveFile={handleOnRemoveFile}
          >
            <span>Drop CSV file here or click to upload.</span>
          </CSVReader>
        </div>
      </div>
    );
  } else if (status === "uploaded") {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Modal
          title="CSV Column Mapping"
          visible={isVisible}
          onOk={() => {
            setIsVisible(false);
            setStatus("mapped");
          }}
        >
          <div className="px-16 space-y-4">
            {requiredColumns.map(title => (
              <div className="grid grid-flow-col grid-cols-2 space-x-4">
                <div>{title}</div>
                <Select
                  className="w-32"
                  onChange={(val: string) => {
                    if (title === "email") {
                      setEmail(val);
                    } else if (title === "id") {
                      setId(val);
                    }
                  }}
                >
                  {columns.map((header: string) => (
                    <Option value={header}>{header}</Option>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  } else if (status === "mapped") {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <CSVTable
          fileData={fileData}
          clearFileData={clearFileData}
          email={email}
          id={id}
        />
      </div>
    );
  } else {
    return <div className="text-red-500">Falled into unknown status</div>;
  }
}

export default App;
