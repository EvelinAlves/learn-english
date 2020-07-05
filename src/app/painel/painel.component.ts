import { Component, OnInit } from "@angular/core";

import { Frase } from "../shared/frase.model";
import { FRASES } from "./frases-mock";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;

  public instrucao: string = 'Traduza a frase:';
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0 ;

  constructor() {
    this.atualizarodada();
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  verificarResposta(): void {
    if (this.resposta === this.rodadaFrase.frasePtBr) {
      alert('Correto');
      this.rodada++;
      this.progresso=this.progresso+(100/this.frases.length);
      this.atualizarodada();
    } else {
      alert('Errado');
    }
  }

  public atualizarodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
}
