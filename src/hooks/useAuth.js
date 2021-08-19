import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

//Hook que exporta y usa el contexto (useContext) con la clase AuthContext (en esta clase es creado: CreateContext)
// eslint-disable-next-line
export default () => useContext(AuthContext);
