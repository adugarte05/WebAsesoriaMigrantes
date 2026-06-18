import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent implements OnInit {

  // ─── Estado del formulario ───────────────────────────────────────────────
  form!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  fileName = '';
  dragOver = false;

  // ─── Datos del formulario ────────────────────────────────────────────────
  readonly servicios = [
    'Arraigos',
    'Visados',
    'Nacionalidad',
    'Reagrupación Familiar',
    'Renovaciones de NIE',
    'Residencia Familiar de Español',
    'Modificación de Estancia',
    'Nómadas Digitales',
    'Profesional Altamente Cualificado',
    'Estancia por Estudios',
    'Residencia No Lucrativa',
    'Recurso de Reposición / Contencioso',
  ];

  readonly estatusOptions = [
    { value: '', label: 'Selecciona tu situación actual' },
    { value: 'sin_documentacion', label: 'Sin documentación regular' },
    { value: 'nie_vigente',       label: 'NIE / TIE vigente' },
    { value: 'nie_caducado',      label: 'NIE / TIE caducado' },
    { value: 'visado_estudios',   label: 'Visado de estudios' },
    { value: 'solicitante_asilo', label: 'Solicitante de asilo / refugio' },
    { value: 'turista',           label: 'Estancia como turista (hasta 90 días)' },
    { value: 'otro',              label: 'Otro' },
  ];

  readonly tiempoOptions = [
    { value: 'menos_1', label: 'Menos de 1 año' },
    { value: '1_3',     label: 'Entre 1 y 3 años' },
    { value: 'mas_3',   label: 'Más de 3 años' },
  ];

  readonly expedienteOptions = [
    { value: 'no',   label: 'No' },
    { value: 'si',   label: 'Sí' },
    { value: 'nose', label: 'No sé' },
  ];

  readonly nacionalidades = [
    'Afgana','Albania','Alemana','Angoleña','Argentina','Argelina',
    'Boliviana','Brasileña','Camerunesa','Chilena','China','Colombiana',
    'Cubana','Dominicana','Ecuatoriana','Egipcia','Eritrea','Española',
    'Etíope','Filipina','Francesa','Gambiana','Ghanesa','Guatemalteca',
    'Guineana','Haitiana','Hondureña','India','Inglesa (Británica)',
    'Iraní','Iraquí','Italiana','Jamaicana','Kazaja','Keniana',
    'Libanesa','Liberiana','Libia','Malí','Marroquí','Mauritana',
    'Mexicana','Moldava','Nigeriana','Nicaragüense','Pakistaní',
    'Paraguaya','Peruana','Portuguesa','Rumana','Rusa','Salvadoreña',
    'Senegalesa','Siria','Somalí','Sudanesa','Tunecina','Ucraniana',
    'Uruguaya','Venezolana','Otra',
  ];

  // ─── Formspree endpoint ──────────────────────────────────────────────────
  // 👉 Regístrate gratis en https://formspree.io/ y reemplaza YOUR_FORM_ID
  private readonly FORMSPREE_URL = 'https://formspree.io/f/mdavvgnv';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Sección 1: Contacto
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      telefono:       ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]],
      email:          ['', [Validators.required, Validators.email]],

      // Sección 2: Situación
      nacionalidad:   ['', Validators.required],
      tiempoEspana:   ['', Validators.required],
      estatusLegal:   ['', Validators.required],
      expediente:     ['', Validators.required],

      // Sección 3: Consulta
      serviciosInteres: this.fb.array(
        this.servicios.map(() => this.fb.control(false))
      ),
      descripcion:    [''],
      documento:      [null],
    });
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────
  get serviciosArray(): FormArray {
    return this.form.get('serviciosInteres') as FormArray;
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  isServiceSelected(i: number): boolean {
    return !!this.serviciosArray.at(i).value;
  }

  atLeastOneService(): boolean {
    return this.serviciosArray.controls.some(c => c.value === true);
  }

  // ─── File Upload ──────────────────────────────────────────────────────────
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.handleFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(): void {
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.handleFile(file);
  }

  private handleFile(file: File): void {
    const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes(file.type)) {
      alert('Solo se permiten archivos PDF, JPG o PNG.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo no puede superar los 10 MB.');
      return;
    }
    this.fileName = file.name;
    this.form.patchValue({ documento: file });
  }

  removeFile(): void {
    this.fileName = '';
    this.form.patchValue({ documento: null });
  }

  // ─── Submit ───────────────────────────────────────────────────────────────
  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || !this.atLeastOneService()) {
      const el = document.querySelector('.ng-invalid');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    this.isSubmitting = true;
    this.submitError  = false;

    const selectedServices = this.servicios
      .filter((_, i) => this.serviciosArray.at(i).value)
      .join(', ');

    const payload = {
      nombreCompleto:   this.form.value.nombreCompleto,
      telefono:         this.form.value.telefono,
      email:            this.form.value.email,
      nacionalidad:     this.form.value.nacionalidad,
      tiempoEspana:     this.tiempoOptions.find(o => o.value === this.form.value.tiempoEspana)?.label,
      estatusLegal:     this.estatusOptions.find(o => o.value === this.form.value.estatusLegal)?.label,
      expediente:       this.expedienteOptions.find(o => o.value === this.form.value.expediente)?.label,
      serviciosInteres: selectedServices,
      descripcion:      this.form.value.descripcion || '(No especificado)',
      archivo:          this.fileName || '(Sin archivo)',
    };

    const headers = new HttpHeaders({ Accept: 'application/json' });

    this.http.post(this.FORMSPREE_URL, payload, { headers }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.form.reset();
        this.fileName = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => {
        this.isSubmitting = false;
        this.submitError = true;
      }
    });
  }
}
