import { JwtGuard } from "./jwt.guard";

/* (регистрируем в auth-модуле) */
export const GUARDS = [JwtGuard]