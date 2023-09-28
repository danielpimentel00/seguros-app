import { useState } from "react";
import "./consultar-seguro.scss";
import { getPolizaByIdCustomer } from "../../services/main.service";
import { PolizaClienteModel } from "../../models/poliza-cliente.model";

const ConsultarSeguroComponent = () => {
  const [cedula, setCedula] = useState("");
  const [polizasCliente, setPolizasCliente] = useState<PolizaClienteModel[]>(
    []
  );

  const handleBuscarClick = async () => {
    try {
      const polizas = await getPolizaByIdCustomer(cedula);
      setPolizasCliente(polizas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="consultar-seguro-component">
      <div className="form">
        <input
          type="text"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
        />
        <button onClick={handleBuscarClick}>Buscar</button>
      </div>

      <table>
        <tr>
          <th>Tipo de seguro</th>
          <th>Número de seguro</th>
          <th>Plan</th>
          <th>Tipo de Cuenta Financiera</th>
          <th>Número de Cuenta Financiera</th>
          <th>Fecha de Venta</th>
          <th>Valor de la Cuota</th>
        </tr>
        {polizasCliente.map((poliza, index) => (
          <tr key={index}>
            <td>{poliza.codigoSeguro}</td>
            <td>{poliza.codigoPoliza}</td>
            <td>{poliza.nombrePlan}</td>
            <td>{poliza.nombreTipoCuenta}</td>
            <td>{poliza.numeroCuenta}</td>
            <td>{poliza.fechaVenta}</td>
            <td>{poliza.cuota}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default ConsultarSeguroComponent;
