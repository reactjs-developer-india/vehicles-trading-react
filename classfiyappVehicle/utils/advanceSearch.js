import {API_V1} from '../config'
import {apiCaller} from '../utils/authServices'

export const advanceState = (data, exclude)=>state=> {
    let {maker, model, body_type, transmission, exterior_colour, fuel_type} = data
    return {
        makers: exclude == 'makers' ? state.makers : convertToOptions(maker.field_data),
        models: exclude == 'models' ? state.models : convertToOptions(model.field_data),
        bodyTypes: exclude == 'models' ? state.bodyTypes : convertToOptions(body_type.field_data),
        transmissons: convertToOptions(transmission.field_data),
        colors: convertToOptions(exterior_colour.field_data),
        fuels: convertToOptions(fuel_type.field_data),
    }
}


export const convertToOptions = (arr)=> {
    return arr.map((obj)=> {
        return {'value': obj.value, 'label': obj.displayname}
    })
}

export const fetchFormData              = async(body)=> {
    let searchForm = await apiCaller(`${API_V1}/post/getadvancesearchdata`, 'post', body)
    return searchForm
}
export const updateQueryStringParameter = (uri, key, value) => {
    var re        = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}