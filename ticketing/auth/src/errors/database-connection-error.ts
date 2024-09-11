export class DatabaseConnectionError extends Error {
    reason = 'Error connecting Database'
    constructor() {
        super()

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}