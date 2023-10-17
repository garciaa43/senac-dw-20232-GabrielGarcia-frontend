import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Produto } from 'src/app/shared/model/produto';
import { ProdutoSeletor } from 'src/app/shared/model/seletor/produto.seletor';
import { ProdutoService } from 'src/app/shared/service/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-listagem',
  templateUrl: './produto-listagem.component.html',
  styleUrls: ['./produto-listagem.component.scss']
})
export class ProdutoListagemComponent implements OnInit{

  public produtos: Array<Produto> = new Array();
  public seletor: ProdutoSeletor = new ProdutoSeletor();

  constructor(private produtoService: ProdutoService,
    private router: Router) {
  }

  ngOnInit(): void {
      this.buscarProdutos();
  }

  buscarProdutos(){
    // this.produtoService.listarTodos().subscribe(
    //   resultado => {
    //     this.produtos = resultado;
    //   },
    //   erro => {
    //     console.log('Erro ao buscar produtos', erro)
    //   }
    // );
  }

  editar(id: number) {
    this.router.navigate(['/produtos/detalhe', id]);
  }

  excluir(id: number){
    //https://sweetalert2.github.io/

    Swal.fire({
      title: 'Você está certo disso?',
      text: "Deseja excluir o produto #" + id + "?",
      icon: 'warning',
      showCancelButton: true,
    }).then(r => {
      this.produtoService.excluir(id).subscribe(
        sucesso => {
          Swal.fire("Sucesso", "Produto excluído com sucesso!", 'success');
          this.buscarProdutos(); //Atualiza a listagem
        },
        erro => {
          Swal.fire("Erro", "Erro ao excluir o produto: " + erro, 'error');
        }
      )
     }
    )
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
