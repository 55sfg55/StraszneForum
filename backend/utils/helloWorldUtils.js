export const responseDef = {
    success: false,
    message: "Failed to generate response/ response not specified.",
    data: null
}

export function responseJSON(arg_success = null, arg_message = null, arg_data = null) {
    if (arg_success) {
        responseDef.success = arg_success
    }
    if (arg_data) {
        responseDef.data = arg_data
    }
    if (arg_message) {
        responseDef.message = arg_message
    }
    return responseDef
}

export function responseJSONObject(arg) {
    if (arg.success) {
        responseDef.success = arg_success
    }
    if (arg.data) {
        responseDef.data = arg_data
    }
    if (arg.message) {
        responseDef.message = arg_message
    }
    return responseDef
}