import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";

import { Frase } from "../shared/frase.model";
import { FRASES } from "./frases-mock";

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES;

  public instrucao: string = 'Traduza a frase:';
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo:EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizarodada();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  verificarResposta(): void {
    if (this.resposta == this.rodadaFrase.frasePtBr) {
      this.rodada++;
      this.progresso = this.progresso + (100/this.frases.length);

      if(this.rodada == 4) {
        this.encerrarJogo.emit('vitoria');
      } else {
        this.atualizarodada();
      }
    } else {
      this.tentativas--;
      if (this.tentativas === -1)
        this.encerrarJogo.emit('derrota');
    }
  }

  public atualizarodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
  }
}
