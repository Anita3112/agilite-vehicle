import fetch from '../interceptor/FetchInterceptio'

const vehicleService = {}

vehicleService.getVehicleMakes = (vehicleType) => {
    return fetch({
        url: `/vehicles/GetMakesForVehicleType/${vehicleType}/?format=json`,
        method: 'get'
    })

}

vehicleService.getVehicalType = () => {
    return fetch({
        url: '/vehicles/getvehiclevariablevalueslist/vehicle type?format=json',
        method: 'get'
    })
}

vehicleService.getVehicleModels = (modelsUrl) => {
    return fetch({
        url: `/vehicles/getmodelsformakeyear/${modelsUrl}`,
        method: 'get'
    })
}
export default vehicleService
