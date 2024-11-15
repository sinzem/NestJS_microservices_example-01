import { validateSync } from "class-validator";
import { IPost } from "../post.interface";

export interface ISetPublished {
    plainToInstance(): void; 
}

export const PLAIN_TO_INSTANCE = async function (this: IPost) { 
    validateSync(this, {whitelist: true});
}