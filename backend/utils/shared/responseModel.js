export class response {
    constructor() {
        console.log(123)
        this.success = false;
        this.message = "Failed to generate response/ response not specified.";
        this.data = null
        
        return this
    }

    setSuccess(argSuccess) {
        this.success = argSuccess;
        return this
    }

    setMessage(argMessage) {
        this.message = argMessage;
        return this
    }

    setData(argData) {
        this.data = argData;
        return this
    }

    getResponse() {
        return this;
    }

    resetResponse() {
        this.success = false;
        this.message = "Failed to generate response/ response not specified.";
        this.data = null

        return this
    }

    setAll( success, message, data ) {
        if (success !== undefined) {
            this.setSuccess(success);
        }
        if (message !== undefined) {
            this.setMessage(message);
        }
        if (data !== undefined) {
            this.setData(data);
        }
        return this
    }

    setObject({ success, message, data } = {}) {
        if (success !== undefined) {
            this.setSuccess(success);
        }
        if (message !== undefined) {
            this.setMessage(message);
        }
        if (data !== undefined) {
            this.setData(data);
        }
        return this
    }
}


