export class helloWorldResponse {
    constructor() {
        this.responseDef = {
            success: false,
            message: "Failed to generate response/ response not specified.",
            data: null
        };
    }

    setSuccess(success) {
        this.responseDef.success = success;
    }

    setMessage(message) {
        this.responseDef.message = message;
    }

    setData(data) {
        this.responseDef.data = data;
    }

    getResponse() {
        return this.responseDef;
    }

    resetResponse() {
        this.responseDef = {
            success: false,
            message: "Failed to generate response/ response not specified.",
            data: null
        };
    }

    responseJSON( success, message, data ) {
        if (success !== undefined) {
            this.setSuccess(success);
        }
        if (message !== undefined) {
            this.setMessage(message);
        }
        if (data !== undefined) {
            this.setData(data);
        }
    }

    responseJSONobject({ success, message, data } = {}) {
        if (success !== undefined) {
            this.setSuccess(success);
        }
        if (message !== undefined) {
            this.setMessage(message);
        }
        if (data !== undefined) {
            this.setData(data);
        }
    }
}
