import axios from "axios";
import { SolicitudModel } from "../models/solicitud.model";
import { PolizaClienteModel } from "../models/poliza-cliente.model";

const baseUrl = "http://localhost:5296";

export const getSeguros = async () => {
  return (await axios.get(`${baseUrl}/common/seguros`)).data;
};

export const getPlanes = async () => {
  return (await axios.get(`${baseUrl}/common/planes`)).data;
};

export const getEstadosSolicitud = async () => {
  return (await axios.get(`${baseUrl}/common/estados`)).data;
};

export const getTipoCuentas = async () => {
  return (await axios.get(`${baseUrl}/common/cuentas`)).data;
};

export const createSolicitud = async (
  model: SolicitudModel
): Promise<SolicitudModel> => {
  return (await axios.post(`${baseUrl}/solicitud`, model)).data;
};

export const getPolizaByIdCustomer = async (
  customerCode: string
): Promise<PolizaClienteModel[]> => {
  return (await axios.get(`${baseUrl}/poliza/${customerCode}`)).data;
};
