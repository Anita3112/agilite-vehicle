import React from 'react';
import { Table } from 'antd';
export const VehicleData = ({VehicleData}) => {
    const columns = [
        {
          title: 'Make ID',
          dataIndex: 'Make_ID',
          key: 'Make_ID',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Make Name',
          dataIndex: 'Make_Name',
          key: 'Make_Name',
        },
        {
          title: 'Model ID',
          dataIndex: 'Model_ID',
          key: 'Model_ID',
        },
        {
            title: 'Model Name',
            dataIndex: 'Model_Name',
            key: 'Model_Name',
          },
    ];

    return (
        <div>
            <Table style={{width:'100%'}} columns={columns} dataSource={VehicleData} />
        </div>
    )
}