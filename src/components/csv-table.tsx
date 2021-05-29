import React, { useMemo } from "react";
import { Table } from "antd";
import { HiArrowNarrowLeft } from "react-icons/hi";
import validator from "validator";

type CSVTableProps = {
  fileData: Array<any> | undefined;
  clearFileData: () => void;
  email: string;
  id: string;
};

export default function CSVTable({
  fileData,
  clearFileData,
  email,
  id
}: CSVTableProps) {
  const columns = useMemo(
    () =>
      fileData?.[0].data.map((title: string, index: number) => {
        if (title === email) {
          return {
            key: index.toString(),
            title,
            dataIndex: title.toLowerCase(),
            render: (email: string) => {
              if (!validator.isEmail(email)) {
                return (
                  <div className="flex items-center h-8 text-red-500 bg-red-100">
                    {email}
                  </div>
                );
              } else {
                return email;
              }
            }
          };
        } else {
          return {
            key: index.toString(),
            title,
            dataIndex: title.toLowerCase(),
            render: (value: any) => {
              if (value) {
                return value;
              } else {
                return (
                  <div className="flex items-center h-8 text-red-500 bg-red-100">
                    {value}
                  </div>
                );
              }
            }
          };
        }
      }),
    [fileData, email]
  );

  const dataSource = useMemo(() => {
    const rows = fileData?.filter((_, i) => i > 0).map(row => row.data);
    return rows?.map((row: Array<string>, index) => {
      const rowData: any = { key: index.toString() };
      for (let i = 0; i < row.length; i++) {
        rowData[columns[i].dataIndex] = row[i];
      }
      return rowData;
    });
  }, [fileData, columns]);

  return (
    <div className="space-y-4">
      <button
        className="flex items-center px-3 py-2 space-x-1 text-blue-400 border border-blue-400 rounded focus:outline-none"
        onClick={clearFileData}
      >
        <HiArrowNarrowLeft />
        <span>Back</span>
      </button>
      <Table columns={columns} dataSource={dataSource} />
      <div className="w-full px-12">
        <button
          className="flex items-center justify-center w-full px-3 py-2 space-x-2 text-white bg-blue-400 rounded focus:outline-none"
          onClick={clearFileData}
        >
          Upload New CSV File
        </button>
      </div>
    </div>
  );
}
