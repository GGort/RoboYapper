import TypeOrm from "$lib/database_src/db.server";
import {DC_Role} from "$lib/database_src/models/DC_Role"
import type { PageServerLoad } from './$types';

export  const load: PageServerLoad = async ()=>{
  const db = await TypeOrm.getDb();
  if(!db) return {};

  const roles = await db.manager.getRepository(DC_Role).find();

  return {
    roles: TypeOrm.clean(roles)};
};
