import { useEffect, useState } from "react";
import "./solicitar-seguro.scss";
import {
  createSolicitud,
  getPlanes,
  getSeguros,
  getTipoCuentas,
} from "../../services/main.service";
import { SeguroModel } from "../../models/seguro.model";
import { PlanesModel } from "../../models/plan.model";
import { TipoCuentaModel } from "../../models/tipo-cuenta.model";
import { SolicitudModel } from "../../models/solicitud.model";
import { EstadoSolicitudEnum } from "../../utils/enums";

const SolicitarSeguroComponent = () => {
  const [nombre, setNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [cedula, setCedula] = useState<string>("");
  const [fechaNac, setFechaNac] = useState<string>("");
  const [seguros, setSeguros] = useState<SeguroModel[]>([]);
  const [planes, setPlanes] = useState<PlanesModel[]>([]);
  const [tipoCuentas, setTipoCuentas] = useState<TipoCuentaModel[]>([]);
  const [selectedSeguro, setSelectedSeguro] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedCuenta, setSelectedCuenta] = useState<number>();
  const [numeroCuenta, setNumeroCuenta] = useState<string>();

  useEffect(() => {
    Promise.all([getSeguros(), getPlanes(), getTipoCuentas()]).then(
      ([seguros, planes, cuentas]) => {
        setSeguros(seguros);
        setSelectedSeguro(seguros[0].codigo);

        setPlanes(planes);

        setTipoCuentas(cuentas);
        setSelectedCuenta(cuentas[0].id);
      }
    );
  }, []);

  useEffect(() => {
    if (selectedPlan !== "") return;

    setSelectedPlan(
      planes.find((x) => x.codigoSeguro === selectedSeguro)?.codigo ?? ""
    );
  }, [selectedSeguro]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!selectedCuenta || !numeroCuenta) return alert("Form inválido");

      const model = new SolicitudModel();
      model.cedulaCliente = cedula;
      model.codigoPlan = selectedPlan;
      model.codigoSeguro = selectedSeguro;
      model.fechaNacCliente = fechaNac;
      model.idTipoCuenta = selectedCuenta;
      model.nombreCliente = nombre;
      model.numeroCuenta = numeroCuenta;
      model.primerApellidoCliente = primerApellido;
      model.segundoApellidoCliente = segundoApellido;

      const solicitud = await createSolicitud(model);

      if (solicitud.codigoEstado === EstadoSolicitudEnum.Aprobada) {
        return alert(
          `La solicitud ha sido aprobada!\nNúmero de Póliza: ${solicitud.numeroPoliza}\nCuota: ${solicitud.cuota}`
        );
      }

      return alert(
        `La solicitud ha sido rechazada.\nRazón: ${solicitud.rejectionReason}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="solicitar-seguro-component">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="primer-apellido">Primer Apellido *</label>
          <input
            id="primer-apellido"
            type="text"
            required
            value={primerApellido}
            onChange={(e) => setPrimerApellido(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="segundo-apellido">Segundo Apellido</label>
          <input
            id="segundo-apellido"
            type="text"
            value={segundoApellido}
            onChange={(e) => setSegundoApellido(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="cedula">Cédula *</label>
          <input
            id="cedula"
            type="number"
            required
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="fecha-nac">Fecha de Nacimiento *</label>
          <input
            id="fecha-nac"
            type="date"
            required
            value={fechaNac}
            onChange={(e) => setFechaNac(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="tipo-seguro">Tipo de seguro *</label>
          <select
            id="tipo-seguro"
            required
            value={selectedSeguro}
            onChange={(e) => setSelectedSeguro(e.target.value)}
          >
            {seguros?.map((seguro, index) => (
              <option key={index} value={seguro.codigo}>
                {seguro.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label htmlFor="plan">Plan *</label>
          <select
            id="plan"
            required
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            {planes
              ?.filter((x) => x.codigoSeguro === selectedSeguro)
              .map((plan, index) => (
                <option key={index} value={plan.codigo}>
                  {plan.nombre}
                </option>
              ))}
          </select>
        </div>

        <div className="input-field">
          <label id="tipo-cuenta">Tipo de Cuenta Financiera *</label>
          <select
            id="tipo-cuenta"
            required
            value={selectedCuenta}
            onChange={(e) => setSelectedCuenta(Number(e.target.value))}
          >
            {tipoCuentas?.map((cuenta, index) => (
              <option key={index} value={cuenta.id}>
                {cuenta.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="input-field">
          <label htmlFor="numero-producto">No. producto financiero *</label>
          <input
            id="numero-producto"
            type="text"
            required
            value={numeroCuenta}
            onChange={(e) => setNumeroCuenta(e.target.value)}
          />
        </div>

        <button type="submit">Solicitar</button>
      </form>
    </div>
  );
};

export default SolicitarSeguroComponent;
