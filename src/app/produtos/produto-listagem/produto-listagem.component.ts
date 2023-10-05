import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/shared/model/produto';
import { ProdutoSeletor } from 'src/app/shared/model/seletor/produto.seletor';
import { ProdutoService } from 'src/app/shared/service/produto.service';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrls: ['./produto-listagem.component.scss']
})
export class ProdutoListagemComponent implements OnInit{
[x: string]: any;

  public produtos: Array<Produto> = new Array();
  public seletor: ProdutoSeletor = new ProdutoSeletor();

  constructor(private produtoService: ProdutoService) {
  }

  ngOnInit(): void {
      this.buscarProdutos();
  }

  buscarProdutos(){
    this.produtoService.listarTodos().subscribe(
      resultado => {
        this.produtos = resultado;
      },
      erro => {
        console.log('Erro ao buscar produtos', erro)
      }
    );
  }

  editar(id: number) {
    //TODO
  }

  pesquisar(){
    this.produtoService.listarComSeletor(this.seletor).subscribe(
      resultado => {
        this.produtos = resultado;
      }
    );

   }

   limpar() {
    this.seletor = new ProdutoSeletor();
   }

}
