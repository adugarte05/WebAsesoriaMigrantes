import { Component } from '@angular/core';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent {
  features = [
    {
      icon: 'shield-check',
      title: 'Asesoría legal garantizada',
      desc: 'Trabajamos únicamente con abogados colegiados especializados en extranjería. Tu caso está en manos expertas.'
    },
    {
      icon: 'translate',
      title: 'Atención en tu idioma',
      desc: 'Hablamos español, inglés y otros idiomas para que puedas explicarnos tu situación sin barreras.'
    },
    {
      icon: 'clock',
      title: 'Rapidez y seguimiento',
      desc: 'Te informamos de cada avance en tu expediente. Sin esperas innecesarias ni respuestas genéricas.'
    },
    {
      icon: 'lock',
      title: 'Total confidencialidad',
      desc: 'Tus datos y documentos están protegidos bajo la normativa RGPD. Tu privacidad es nuestra prioridad.'
    }
  ];
}
