import { Button, Checkbox, Col, Dropdown, InputNumber, Space } from "antd";
import { Spin, Select } from "antd";
import React, { useEffect, useState } from 'react';
import { Row, Card } from "antd";
import { currentYear } from "../../helper/common";
import vehicleService from "../../service/VehicalService";
export const VehicleSearchForm = (props) => {
    const { onSearch } = props;
    const [selectedVehicleType, setSelectedVehicleType] = useState(null);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleMakes, setVehicleMakes] = useState([]);
    const [selectedMakes, setSelectedMakes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isSelectedDisabled, setIsSelectedDisabled] = useState(false);
    const [useYear, setUseYear] = useState(2021);
    //vehicle type api call
    useEffect(() => {
        vehicleService.getVehicalType().then((response) => {
            setVehicleTypes(response.Results);
        }
        )
    }, [])

    //make api call when vehicle type is selected
    useEffect(() => {
        if (selectedVehicleType) {
            setIsLoading(true);
            vehicleService.getVehicleMakes(selectedVehicleType).then((response) => {
                setVehicleMakes(response.Results);
                setIsLoading(false);
            }
            ).finally(() => {
                setIsLoading(false);
            })
            setSelectedMakes([]);
            setIsSelectedDisabled(false);

        }
    }, [selectedVehicleType])



    const handleVehicleTypeChange = (value) => {
        setSelectedVehicleType(value.trim());

    }

    const handleMakeChange = (value) => {
        setSelectedMakes(value);
        //enable search button when make is selected or changes
        setIsSelectedDisabled(false);
    }

    const handleYearChange = (value) => {
        setIsChecked(value.target.checked);
        setIsSelectedDisabled(false);
    }

    const handleOnSearch = () => {
        const searchParam = {
            vehicleType: selectedVehicleType,
            makes: selectedMakes,
            year: useYear,
            isChecked: isChecked
        }
        onSearch(searchParam);
        setIsSelectedDisabled(true);
    }

    const handleYearValueChange = (value) => {
        setUseYear(value);
        setIsSelectedDisabled(false);

    }

    return (<>
        <Row justify={"space-around"}>
            <Col span={18}>
                <Row justify={"space-around"} >
                    <h1>Vehicle Search</h1>
                </Row>
            </Col>

        </Row>
        <Spin spinning={vehicleTypes.length === 0 || isLoading} >
            <Row justify={"space-around"}>
                <Col span={18}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <h2>Vehicle Type</h2>
                        <Select style={{ display: 'block' }} value={selectedVehicleType} onChange={handleVehicleTypeChange}
                            placeholder="Select a vehicle type">
                            {
                                vehicleTypes.map((vehicleType) => {
                                    return (
                                        <Select.Option key={vehicleType.Name} value={vehicleType.Name}>{vehicleType.Name}</Select.Option>
                                    )
                                }
                                )
                            }
                        </Select>

                        <h2>Vehicle Type</h2>
                        <Select
                            style={{ display: 'block' }}
                            mode="multiple"
                            value={selectedMakes}
                            disabled={!selectedVehicleType}
                            onChange={handleMakeChange}
                            placeholder="Select Makes">
                            {
                                vehicleMakes.map((vehicleMake) => {
                                    return (
                                        <Select.Option key={vehicleMake.MakeName} value={vehicleMake.MakeName}>{vehicleMake.MakeName}</Select.Option>
                                    )
                                }
                                )
                            }
                        </Select>

                        <Checkbox
                            disabled={!selectedVehicleType}
                            onChange={handleYearChange}
                            defaultChecked={isChecked}

                        >Use Year?</Checkbox>
                        {
                            isChecked && <InputNumber min={1900} max={currentYear} defaultValue={useYear}

                                onChange={handleYearValueChange} />
                        }

                        <Button type="primary" onClick={handleOnSearch}
                            disabled={!selectedVehicleType || selectedMakes.length === 0 || isSelectedDisabled || (isChecked && !useYear)}

                        >Search</Button>

                    </Space>
                </Col>

            </Row>
        </Spin>


    </>
    )
}