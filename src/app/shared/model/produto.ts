import { Fabricante } from './fabricante';


export class Produto {
  id: number;
  nome: string;
  fabricanteVO: Fabricante;
  peso: number;
  valor?: number;
  dataCadastro: Date;
}

