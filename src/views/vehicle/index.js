
import React, { useEffect, useState } from 'react';
import { VehicleSearchForm } from "./VehicleSearchForm";
import { Spin, Row, Col } from "antd";
import { VehicleData } from "./VehicleData";
import vehicleService from "../../service/VehicalService";
export const Vehicle = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [vehicleData, setVehicleData] = useState([]);

    const handleOnSearch = (searchParam) => {
        setIsLoading(true);
        setVehicleData([]);
        const makes = searchParam.makes;
        let modelUrl = '';
        const vehicleType = searchParam.vehicleType;
        const year = searchParam.year;
        const isChecked = searchParam.isChecked;
        //if multiple makes are selected then api call is made for each make
        for (let i = 0; i < makes.length; i++) {
            if (isChecked) {

                modelUrl = `make/${makes[i]}/modelyear/${year}/vehicleType/${vehicleType}?format=json`
            } else {
                modelUrl = `make/${makes[i]}/vehicleType/${vehicleType}?format=json`
            }
            vehicleService.getVehicleModels(modelUrl).then((response) => {
                setVehicleData((vehicleData) => [...vehicleData, ...response.Results]);

            }).finally(() => {
                setIsLoading(false);
            }
            )
        }


    }
    return (

        <div>
            <VehicleSearchForm onSearch={handleOnSearch} />
            {
                <Row justify={"space-around"}>
                    <Col span={18}>
                        {
                            isLoading ?
                                <Row style={{ width: '100%' }} align="middle" >
                                    <Spin />
                                </Row> : <Row style={{ width: "100%", display: "block" }} justify={"space-around"} >

                                    <VehicleData VehicleData={vehicleData} />


                                </Row>
                        }

                    </Col>

                </Row>

            }

        </div>

    )
}

export default Vehicle;