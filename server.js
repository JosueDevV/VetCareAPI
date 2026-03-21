import express from "express";
import cors from "cors";

import { ClientesController } from "./controller/clientes.controller.js";
import { MascotasController } from "./controller/mascotas.controller.js";
import { UsuariosController } from "./controller/usuarios.controller.js";
import { ServiciosController } from "./controller/servicios.controller.js";
import { MedicamentosController } from "./controller/medicamentos.controller.js";
import { EmpleadosController } from "./controller/empleados.controller.js";
import { EspeciesController } from "./controller/especies.controller.js";
import { RolesController } from "./controller/roles.controller.js";
import { AuthController } from "./controller/auth.controller.js";
import { CitasController } from "./controller/citas.controller.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/clientes", ClientesController);
app.use("/mascotas", MascotasController);
app.use("/usuarios", UsuariosController);
app.use("/servicios", ServiciosController);
app.use("/medicamentos", MedicamentosController);
app.use("/empleados", EmpleadosController);
app.use("/roles", RolesController);
app.use("/especies", EspeciesController);
app.use("/auth", AuthController);
app.use("/cites", CitasController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

