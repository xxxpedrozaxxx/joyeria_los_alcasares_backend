/**
 * Clase base para todas las excepciones HTTP personalizadas.
 * Almacena un código de estado y un mensaje que pueden ser
 * fácilmente interpretados por el manejador de errores de Express.
 */
export class HttpException extends Error {
    public statusCode: number;

    constructor(statusCode: number, message: string) {
        // Llama al constructor de la clase base (Error)
        super(message);
        
        // Asigna el código de estado
        this.statusCode = statusCode;
        
        // Asegura que el nombre de la clase se mantenga después de la transpilación
        this.name = this.constructor.name;
    }
}


/**
 * Excepción para errores de tipo "No Encontrado" (404).
 * Úsala cuando un recurso específico solicitado no existe.
 * 
 * @example
 * const usuario = await findUserById(id);
 * if (!usuario) {
 *   throw new NotFoundException('El usuario con ese ID no fue encontrado.');
 * }
 */
export class NotFoundException extends HttpException {
    constructor(message: string = 'Recurso no encontrado') {
        // Llama al constructor de HttpException con el código de estado 404
        super(404, message);
    }
}


/**
 * Excepción para errores de tipo "Mala Petición" (400).
 * Úsala cuando los datos enviados por el cliente son inválidos,
 * incompletos o mal formados (fallo de validación DTO).
 */
export class BadRequestException extends HttpException {
    constructor(message: string = 'Petición inválida') {
        super(400, message);
    }
}


/**
 * Excepción para errores de tipo "Conflicto" (409).
 * Úsala cuando la petición no puede ser completada debido a un conflicto
 * con el estado actual del recurso (ej. crear un usuario con un email que ya existe).
 */
export class ConflictException extends HttpException {
    constructor(message: string = 'Conflicto con el estado actual del recurso') {
        super(409, message);
    }
}


/**
 * Excepción para errores de tipo "No Autorizado" (401).
 * Úsala cuando se requiere autenticación para acceder a un recurso y no se proveyó
 * o es inválida (ej. token JWT inválido o ausente).
 */
export class UnauthorizedException extends HttpException {
    constructor(message: string = 'Autenticación requerida') {
        super(401, message);
    }
}