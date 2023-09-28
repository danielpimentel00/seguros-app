export class SolicitudModel {
  cedulaCliente: string = "";
  nombreCliente: string = "";
  primerApellidoCliente: string = "";
  segundoApellidoCliente: string | null = null;
  fechaNacCliente: string = "";
  idTipoCuenta: number = 0;
  numeroCuenta: string = "";
  codigoSeguro: string = "";
  codigoPlan: string = "";
  codigoEstado: number = 0;
  rejectionReason: string | null = null;
  numeroPoliza: string = "";
  cuota: number = 0;
}
