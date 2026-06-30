import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, Database, Server, Code, AlertTriangle, 
  CheckCircle, Activity, ChevronRight, ChevronLeft, 
  Terminal, ShieldCheck, Lock, Cpu, Globe, Crosshair
} from 'lucide-react';

// --- COMPONENTES DE UI REUTILIZABLES ---
const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-lg ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    red: "bg-red-500/20 text-red-400 border-red-500/50",
    orange: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
    blue: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    cyan: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
    green: "bg-emerald-500/20 text-emerald-400 border-emerald-500/50",
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded border ${colors[color]}`}>
      {children}
    </span>
  );
};

// --- DIAPOSITIVAS ---

const Slide0_Portada = () => (
  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
    <div className="p-6 bg-cyan-900/30 rounded-full border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
      <ShieldAlert size={80} className="text-cyan-400" />
    </div>
    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
      Auditoría de Seguridad Web
    </h1>
    <h2 className="text-2xl text-slate-300 font-light">
      Evaluación de Riesgos y Continuidad - <span className="font-semibold text-white">PagaFácil (Fintech)</span>
    </h2>
    <div className="pt-8">
      <p className="text-slate-400">Unidad 3: Fundamentos de Seguridad de la Información</p>
      <p className="text-slate-500 text-sm mt-2">INACAP Valparaíso</p>
    </div>
  </div>
);

const Slide1_Resumen = () => (
  <div className="flex flex-col h-full justify-center space-y-6">
    <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
      <Globe className="text-cyan-500" /> Contexto y Alcance
    </h2>
    <div className="grid grid-cols-2 gap-6 mt-4">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <Database size={20} className="text-blue-400"/> Organización Objetivo
        </h3>
        <ul className="space-y-3 text-slate-300 list-disc list-inside">
          <li><strong className="text-white">Empresa:</strong> PagaFácil</li>
          <li><strong className="text-white">Rubro:</strong> Fintech (Billeteras Digitales)</li>
          <li><strong className="text-white">Activos Críticos:</strong> Datos financieros, personales y transaccionales.</li>
          <li><strong className="text-white">Requisito:</strong> Altas garantías de Confidencialidad, Integridad y Disponibilidad (CIA).</li>
        </ul>
      </Card>
      <Card>
        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <Terminal size={20} className="text-red-400"/> Entorno de Auditoría
        </h3>
        <ul className="space-y-3 text-slate-300 list-disc list-inside">
          <li><strong className="text-white">Plataforma:</strong> DVWA (Damn Vulnerable Web Application).</li>
          <li><strong className="text-white">Nivel de Seguridad:</strong> Low (Simula ausencia total de controles).</li>
          <li><strong className="text-white">Hallazgos:</strong> 3 vulnerabilidades críticas explotadas con éxito.</li>
        </ul>
      </Card>
    </div>
  </div>
);

const Slide2_Activos = () => (
  <div className="flex flex-col h-full justify-center">
    <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
      <Database className="text-cyan-500" /> Activos Fintech y Riesgos
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { name: "BD de Clientes", type: "Lógico", cia: "C: Alto | I: Alto | D: Medio", impact: "Fuga causa multas. Alteración destruye control.", threat: "Inyección SQL", icon: <Database className="text-blue-400"/> },
        { name: "Historial Transacciones", type: "Lógico", cia: "C: Alto | I: Alto | D: Alto", impact: "Su alteración destruye la contabilidad financiera.", threat: "Inyección SQL", icon: <Activity className="text-green-400"/> },
        { name: "Credenciales (Auth)", type: "Lógico", cia: "C: Alto | I: Alto | D: Medio", impact: "Suplantación de identidad y retiro de fondos.", threat: "XSS / SQLi", icon: <Lock className="text-yellow-400"/> },
        { name: "Servidor Web (DVWA)", type: "Infra", cia: "C: Medio | I: Alto | D: Alto", impact: "Corte del servicio y caída de operaciones.", threat: "Inyección Comandos", icon: <Server className="text-red-400"/> },
        { name: "Código Fuente", type: "Software", cia: "C: Alto | I: Alto | D: Bajo", impact: "Expone vulnerabilidades zero-day.", threat: "Inyección Comandos", icon: <Code className="text-purple-400"/> },
      ].map((activo, i) => (
        <Card key={i} className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            {activo.icon}
            <h3 className="font-bold text-lg text-slate-100">{activo.name}</h3>
          </div>
          <div className="text-sm text-slate-400 mb-2">{activo.impact}</div>
          <div className="mt-auto pt-3 border-t border-slate-700 flex justify-between items-center">
            <span className="text-xs font-mono text-cyan-500">{activo.cia}</span>
            <Badge color="red">{activo.threat}</Badge>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Slide3_Vulnerabilidades = () => (
  <div className="flex flex-col h-full justify-start space-y-4 pt-4">
    <h2 className="text-3xl font-bold text-cyan-400 flex items-center gap-3">
      <Crosshair className="text-cyan-500" /> Análisis Técnico (CVSS v3.1)
    </h2>
    <div className="grid grid-cols-3 gap-4 flex-grow">
      {/* Comandos */}
      <Card className="flex flex-col border-red-500/50 bg-red-950/20">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-red-400">Command Injection</h3>
          <Badge color="red">CVSS 9.8 (Crítico)</Badge>
        </div>
        <p className="text-sm text-slate-300 mb-3 flex-grow">
          Permite ejecutar comandos OS. <br/>Causa: El input <code>127.0.0.1; cat /etc/passwd</code> es procesado directamente por el sistema sin validación.
        </p>
        <div className="bg-black/50 rounded p-2 text-center text-slate-500 border border-slate-700 border-dashed text-xs flex items-center justify-center h-24">
          [ Insertar Captura DVWA /etc/passwd ]
        </div>
      </Card>
      {/* SQLi */}
      <Card className="flex flex-col border-orange-500/50 bg-orange-950/20">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-orange-400">SQL Injection</h3>
          <Badge color="orange">CVSS 8.8 (Alto)</Badge>
        </div>
        <p className="text-sm text-slate-300 mb-3 flex-grow">
          Altera la lógica de BD. <br/>Causa: Uso de concatenación directa de strings. Payload <code>' or '1'='1</code> fuerza condición verdadera global.
        </p>
        <div className="bg-black/50 rounded p-2 text-center text-slate-500 border border-slate-700 border-dashed text-xs flex items-center justify-center h-24">
          [ Insertar Captura DVWA Multi-Users ]
        </div>
      </Card>
      {/* XSS */}
      <Card className="flex flex-col border-yellow-500/50 bg-yellow-950/20">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-yellow-400">XSS Reflejado</h3>
          <Badge color="yellow">CVSS 6.1 (Medio)</Badge>
        </div>
        <p className="text-sm text-slate-300 mb-3 flex-grow">
          Ejecuta JS en navegador víctima. <br/>Causa: Ausencia de escape de salida. Permite manipulación del DOM y robo de sesión.
        </p>
        <div className="bg-black/50 rounded p-2 text-center text-slate-500 border border-slate-700 border-dashed text-xs flex items-center justify-center h-24">
          [ Insertar Captura DVWA Alert popup ]
        </div>
      </Card>
    </div>
  </div>
);

const Slide4_Matriz = () => (
  <div className="flex flex-col h-full justify-center">
    <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
      <Activity className="text-cyan-500" /> Matriz de Riesgo y Priorización
    </h2>
    <div className="flex gap-8 items-center h-full">
      {/* Heatmap Simplificado */}
      <div className="w-1/2">
        <div className="grid grid-cols-6 gap-1 text-center text-xs font-semibold">
          <div className="flex items-center justify-center -rotate-90 text-slate-400 w-8">Impacto</div>
          <div className="flex flex-col w-full col-span-5 gap-1">
            {/* Fila 5 */}
            <div className="grid grid-cols-6 gap-1 items-center">
              <span className="text-slate-400">5 (Cat)</span>
              <div className="bg-yellow-600/40 p-3 rounded"></div>
              <div className="bg-orange-600/40 p-3 rounded"></div>
              <div className="bg-red-600/40 p-3 rounded"></div>
              <div className="bg-red-600/40 p-3 rounded"></div>
              <div className="bg-red-600 p-3 rounded flex items-center justify-center text-white border-2 border-white shadow-[0_0_15px_red] font-bold">R1</div>
            </div>
            {/* Fila 4 */}
            <div className="grid grid-cols-6 gap-1 items-center">
              <span className="text-slate-400">4 (May)</span>
              <div className="bg-yellow-600/40 p-3 rounded"></div>
              <div className="bg-orange-600/40 p-3 rounded"></div>
              <div className="bg-orange-600/40 p-3 rounded"></div>
              <div className="bg-red-600/40 p-3 rounded"></div>
              <div className="bg-red-600 p-3 rounded flex items-center justify-center text-white border-2 border-white shadow-[0_0_15px_red] font-bold">R2</div>
            </div>
            {/* Fila 3 */}
            <div className="grid grid-cols-6 gap-1 items-center">
              <span className="text-slate-400">3 (Mod)</span>
              <div className="bg-green-600/40 p-3 rounded"></div>
              <div className="bg-yellow-600/40 p-3 rounded"></div>
              <div className="bg-yellow-600/40 p-3 rounded"></div>
              <div className="bg-orange-600 p-3 rounded flex items-center justify-center text-white border-2 border-white shadow-[0_0_10px_orange] font-bold">R3</div>
              <div className="bg-orange-600/40 p-3 rounded"></div>
            </div>
            {/* Fila 2 & 1 (Ocultas para simplificar visualmente o mostradas gris) */}
            <div className="grid grid-cols-6 gap-1 items-center opacity-50">
               <span className="text-slate-400 text-[10px]">1-2 (Min)</span>
               <div className="bg-green-600/40 p-2 rounded col-span-5"></div>
            </div>
            {/* Eje X */}
            <div className="grid grid-cols-6 gap-1 items-center mt-2">
              <span></span>
              <span className="text-slate-400">1</span>
              <span className="text-slate-400">2</span>
              <span className="text-slate-400">3</span>
              <span className="text-slate-400">4</span>
              <span className="text-slate-400 text-cyan-400">5 (Prob)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Priorización */}
      <div className="w-1/2 space-y-4">
        <Card className="border-l-4 border-l-red-500">
          <h4 className="font-bold text-red-400 text-lg">Prio 1: [R1] Cmd Injection (Crítico)</h4>
          <p className="text-sm text-slate-300">P:5 | I:5. Control total OS. Afecta disponibilidad e integridad del servidor core.</p>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <h4 className="font-bold text-orange-400 text-lg">Prio 2: [R2] SQL Injection (Alto)</h4>
          <p className="text-sm text-slate-300">P:5 | I:4. Fuga masiva de BD financiera de PagaFácil. Falla de Confidencialidad.</p>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <h4 className="font-bold text-yellow-400 text-lg">Prio 3: [R3] XSS Reflejado (Medio)</h4>
          <p className="text-sm text-slate-300">P:4 | I:3. Afecta credenciales de usuarios. Requiere interacción (phishing).</p>
        </Card>
      </div>
    </div>
  </div>
);

const Slide5_Prevencion = () => (
  <div className="flex flex-col h-full justify-center">
    <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
      <ShieldCheck className="text-cyan-500" /> Políticas de Prevención (Causa Raíz)
    </h2>
    <div className="space-y-4">
      <Card className="flex gap-4 items-center border-l-4 border-l-cyan-500">
        <div className="p-3 bg-slate-700 rounded-full text-cyan-400"><Code size={24} /></div>
        <div>
          <h3 className="text-lg font-bold text-white">Consultas Parametrizadas (Prepared Statements)</h3>
          <p className="text-slate-400 text-sm">Separa datos de instrucciones SQL. Invalida completamente el vector de <strong>SQL Injection</strong>. <span className="text-cyan-500 text-xs">(OWASP ASVS)</span></p>
        </div>
      </Card>
      <Card className="flex gap-4 items-center border-l-4 border-l-cyan-500">
        <div className="p-3 bg-slate-700 rounded-full text-cyan-400"><Cpu size={24} /></div>
        <div>
          <h3 className="text-lg font-bold text-white">Validación Estricta y Listas Blancas (Whitelisting)</h3>
          <p className="text-slate-400 text-sm">Validar formato exacto de inputs (ej. solo IPs válidas). Evita escape al OS en <strong>Command Injection</strong>.</p>
        </div>
      </Card>
      <Card className="flex gap-4 items-center border-l-4 border-l-cyan-500">
        <div className="p-3 bg-slate-700 rounded-full text-cyan-400"><Globe size={24} /></div>
        <div>
          <h3 className="text-lg font-bold text-white">Escape y Codificación de Salidas (Output Encoding)</h3>
          <p className="text-slate-400 text-sm">Convierte caracteres especiales a entidades HTML antes de renderizar el DOM. Neutraliza el <strong>XSS</strong>. <span className="text-cyan-500 text-xs">(OWASP)</span></p>
        </div>
      </Card>
    </div>
  </div>
);

const Slide6_Mitigacion = () => (
  <div className="flex flex-col h-full justify-center">
    <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
      <AlertTriangle className="text-cyan-500" /> Controles de Mitigación (Defensa)
    </h2>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        <Card className="bg-slate-800/80">
          <h4 className="text-cyan-400 font-bold mb-1">Web Application Firewall (WAF)</h4>
          <p className="text-sm text-slate-300">Inspecciona tráfico HTTP perimetral. Bloquea firmas de SQLi y ataques comunes antes de tocar la app.</p>
          <div className="mt-2"><Badge color="blue">Ref: OWASP / NIST CSF</Badge></div>
        </Card>
        <Card className="bg-slate-800/80">
          <h4 className="text-cyan-400 font-bold mb-1">Segmentación de Red y Privilegios</h4>
          <p className="text-sm text-slate-300">Aísla el Web Server de la BD. Restringe permisos del usuario <code>www-data</code> (Mínimo Privilegio).</p>
          <div className="mt-2"><Badge color="blue">Ref: CIS Controls</Badge></div>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="bg-slate-800/80">
          <h4 className="text-cyan-400 font-bold mb-1">Content Security Policy (CSP) & Cookies</h4>
          <p className="text-sm text-slate-300">Restringe origen de scripts. Configurar cookies de sesión como <code>HttpOnly</code> y <code>Secure</code>.</p>
          <div className="mt-2"><Badge color="blue">Ref: OWASP ASVS</Badge></div>
        </Card>
        <Card className="bg-slate-800/80">
          <h4 className="text-cyan-400 font-bold mb-1">SIEM y Logs Centralizados</h4>
          <p className="text-sm text-slate-300">Correlación de eventos para detección temprana de ejecuciones anómalas (Comandos OS).</p>
          <div className="mt-2"><Badge color="blue">Ref: NIST CSF (Detect)</Badge></div>
        </Card>
      </div>
    </div>
  </div>
);

const Slide7_Recuperacion = () => (
  <div className="flex flex-col h-full justify-center">
    <h2 className="text-3xl font-bold text-cyan-400 mb-6 flex items-center gap-3">
      <Activity className="text-cyan-500" /> Continuidad y Recuperación (DRP)
    </h2>
    <div className="flex gap-6">
      <div className="w-1/3 space-y-4">
        <Card className="text-center py-6 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
          <h3 className="text-5xl font-black text-cyan-400 mb-2">2H</h3>
          <p className="font-bold text-slate-200">RTO</p>
          <p className="text-xs text-slate-400 px-4">Tiempo max. para levantar contingencia</p>
        </Card>
        <Card className="text-center py-6 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <h3 className="text-5xl font-black text-blue-400 mb-2">15M</h3>
          <p className="font-bold text-slate-200">RPO</p>
          <p className="text-xs text-slate-400 px-4">Pérdida max. de datos transaccionales</p>
        </Card>
      </div>
      <div className="w-2/3">
        <Card className="h-full">
          <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Plan de Acción Tecnológico</h3>
          <ul className="space-y-4 text-slate-300">
            <li className="flex gap-3">
              <CheckCircle className="text-green-400 shrink-0" size={20}/>
              <span><strong>Respaldos Inmutables (WORM):</strong> Backups transaccionales cada 15 min, protegidos contra manipulación (Ransomware/Cmd Injection).</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-400 shrink-0" size={20}/>
              <span><strong>Infraestructura como Código (IaC):</strong> Ante compromiso total de servidor, se destruye y redespliega un entorno limpio automátizado (AWS/Terraform).</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-400 shrink-0" size={20}/>
              <span><strong>Aislamiento Forense:</strong> Suspensión de red inmediata (VLAN cuarentena) para investigar el RCA y parchar fallas de validación.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="text-green-400 shrink-0" size={20}/>
              <span><strong>Notificación Normativa:</strong> Comunicación a entes reguladores en 24h por ser empresa Fintech.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  </div>
);

// --- APP PRINCIPAL ---
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    <Slide0_Portada />,
    <Slide1_Resumen />,
    <Slide3_Vulnerabilidades />,
    <Slide2_Activos />,
    <Slide4_Matriz />,
    <Slide5_Prevencion />,
    <Slide6_Mitigacion />,
    <Slide7_Recuperacion />
  ];

  const totalSlides = slides.length;

  const nextSlide = () => setCurrentSlide(p => Math.min(p + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide(p => Math.max(p - 1, 0));

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans selection:bg-cyan-900 selection:text-cyan-50">
      
      {/* Contenedor de la presentación (Relación de aspecto 16:9 aprox) */}
      <div className="w-full max-w-6xl aspect-[16/9] bg-slate-900 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800 flex flex-col overflow-hidden relative">
        
        {/* Barra de progreso */}
        <div className="h-1 bg-slate-800 w-full">
          <div 
            className="h-full bg-cyan-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>

        {/* Área de contenido del Slide */}
        <div className="flex-grow p-10 overflow-hidden relative">
           {/* Animación suave de fade */}
          <div className="h-full w-full animate-in fade-in duration-500">
            {slides[currentSlide]}
          </div>
        </div>

        {/* Footer / Controles */}
        <div className="h-16 border-t border-slate-800 flex justify-between items-center px-6 bg-slate-900/50">
          <span className="text-slate-500 text-sm font-semibold">
            INACAP | Fundamentos de Seguridad
          </span>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-slate-400 font-mono text-sm">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="p-2 rounded-full hover:bg-cyan-900/50 text-cyan-400 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}