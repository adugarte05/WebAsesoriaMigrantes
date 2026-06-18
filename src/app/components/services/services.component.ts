import { Component } from '@angular/core';

interface Service {
  icon: string;
  title: string;
  desc: string;
  tag?: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  services: Service[] = [
    {
      icon: 'home',
      title: 'Arraigos',
      desc: 'Social, laboral y familiar. Te ayudamos a regularizar tu situación si llevas tiempo en España.',
      tag: 'Más solicitado'
    },
    {
      icon: 'globe',
      title: 'Visados',
      desc: 'Gestión integral de visados de trabajo, turismo, reagrupación y otros tipos.'
    },
    {
      icon: 'flag',
      title: 'Nacionalidad',
      desc: 'Tramitamos tu solicitud de nacionalidad española por residencia, origen o carta de naturaleza.'
    },
    {
      icon: 'users',
      title: 'Reagrupación Familiar',
      desc: 'Reúnete con tu familia en España. Gestionamos el permiso de residencia para tus seres queridos.'
    },
    {
      icon: 'refresh',
      title: 'Renovaciones de NIE',
      desc: 'Renovamos tu NIE o TIE antes de que caduque, evitando sanciones y problemas legales.'
    },
    {
      icon: 'family',
      title: 'Residencia Familiar de Español',
      desc: 'Si tienes un familiar español, puedes solicitar residencia. Te guiamos en cada paso.'
    },
    {
      icon: 'briefcase',
      title: 'Modificación de Estancia',
      desc: 'Cambia tu tipo de permiso o autorización de trabajo por cuenta ajena o propia.'
    },
    {
      icon: 'laptop',
      title: 'Nómadas Digitales',
      desc: 'Visado especial para trabajadores remotos que deseen vivir y trabajar desde España.'
    },
    {
      icon: 'star',
      title: 'Profesional Altamente Cualificado',
      desc: 'Autorización para profesionales con alta cualificación. Tramitación rápida y segura.'
    },
    {
      icon: 'book',
      title: 'Estancia por Estudios',
      desc: 'Visados y autorizaciones para estudiar en España: universidades, idiomas, formación profesional.'
    },
    {
      icon: 'shield',
      title: 'Residencia No Lucrativa',
      desc: 'Para quienes deseen vivir en España sin necesidad de trabajar. Analizamos tu viabilidad.'
    },
    {
      icon: 'gavel',
      title: 'Recurso de Reposición',
      desc: 'Si tu solicitud fue denegada, podemos recurrir la resolución por vía administrativa o contenciosa.'
    }
  ];
}
