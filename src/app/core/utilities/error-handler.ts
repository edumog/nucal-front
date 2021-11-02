
export class ErrorHandler {
    public static getErrorMessage(error: { status: number }): string {
        let errorMessage = '';
        const statusCode = error.status; 
        switch(statusCode){
            case 404: {
                errorMessage = errorMessages.notFound;
                break;
            }
            default: {
                errorMessage = this.setDefaultMessage(statusCode);
                break;
            }
        }
        return errorMessage;
    }

    private static setDefaultMessage(statusCode: number): string {
        let errorMessage = errorMessages.defaultMessage;
        if((statusCode >= 400) && (statusCode < 500) ) {
            errorMessage = errorMessages.badRequest;           
        }else if((statusCode >= 500) && (statusCode < 600)) {
            errorMessage = errorMessages.errorServer;
        }
        return errorMessage;
    }
}

export enum errorMessages {
    defaultMessage = 'Ha ocurrido un error.',
    badRequest = 'Solicitud incorrecta',
    notFound = 'Elemento no encontrado.',
    errorServer = 'Ha ocurrido un error en el servidor'
}