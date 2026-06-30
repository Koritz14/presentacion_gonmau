import { useState } from 'react'
import './App.css'

// ── Slide data ────────────────────────────────────────────────────────────────

const SLIDES = [
  // 0 — Portada
  {
    id: 'portada',
    component: 'Portada',
  },
  // 1 — Resumen ejecutivo
  {
    id: 'resumen',
    component: 'Resumen',
  },
  // 2 — Hallazgo 1: Command Injection
  {
    id: 'cmd',
    component: 'HallazgoCMD',
  },
  // 3 — Hallazgo 2: SQL Injection
  {
    id: 'sqli',
    component: 'HallazgoSQLi',
  },
  // 4 — Hallazgo 3: XSS
  {
    id: 'xss',
    component: 'HallazgoXSS',
  },
  // 5 — Activos e Impacto
  {
    id: 'activos',
    component: 'Activos',
  },
  // 6 — Matriz de Riesgo
  {
    id: 'matriz',
    component: 'Matriz',
  },
  // 7 — Controles
  {
    id: 'controles',
    component: 'Controles',
  },
  // 8 — Recuperación
  {
    id: 'recuperacion',
    component: 'Recuperacion',
  },
  // 9 — Conclusiones
  {
    id: 'conclusiones',
    component: 'Conclusiones',
  },
]

// ── Icons (inline SVG) ────────────────────────────────────────────────────────

const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" strokeLinejoin="round" />
  </svg>
)
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const IconDatabase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
)
const IconCode = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
)
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
)
const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
)
const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
)

// ── Badge component ───────────────────────────────────────────────────────────

function Badge({ level }) {
  const map = {
    Crítico: 'badge-critico',
    Alto: 'badge-alto',
    Medio: 'badge-medio',
    Bajo: 'badge-bajo',
  }
  return <span className={`badge ${map[level] || 'badge-bajo'}`}>{level}</span>
}

// ── Slide components ──────────────────────────────────────────────────────────

function Portada() {
  return (
    <div className="slide slide-portada">
      <div className="portada-bg-grid" aria-hidden="true" />
      <div className="portada-content">
        <div className="portada-tag">Fundamentos de la Seguridad de la Información</div>
        <h1 className="portada-title">
          Auditoría de Seguridad
          <br />
          <span className="portada-accent">Web — PagaFácil</span>
        </h1>
        <p className="portada-sub">
          Análisis de vulnerabilidades sobre plataforma DVWA · Sector Fintech
        </p>
        <div className="portada-stats">
          <div className="pstat">
            <span className="pstat-num critico-text">3</span>
            <span className="pstat-label">Vulnerabilidades</span>
          </div>
          <div className="pstat-divider" />
          <div className="pstat">
            <span className="pstat-num critico-text">9.8</span>
            <span className="pstat-label">CVSS máximo</span>
          </div>
          <div className="pstat-divider" />
          <div className="pstat">
            <span className="pstat-num">OWASP</span>
            <span className="pstat-label">Top 10 — 2021</span>
          </div>
        </div>
      </div>
      <div className="portada-shield" aria-hidden="true">
        <IconShield />
      </div>
    </div>
  )
}

function Resumen() {
  const hallazgos = [
    { vuln: 'Inyección de Comandos', cvss: '9.8', nivel: 'Crítico', icon: <IconCode /> },
    { vuln: 'Inyección SQL',         cvss: '8.8', nivel: 'Alto',    icon: <IconDatabase /> },
    { vuln: 'Cross-Site Scripting',  cvss: '6.8', nivel: 'Medio',   icon: <IconGlobe /> },
  ]
  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">01 — Resumen Ejecutivo</span>
        <h2>Contexto y Principales Hallazgos</h2>
      </div>
      <div className="resumen-body">
        <div className="resumen-contexto card">
          <p>
            Auditoría de seguridad al portal de clientes de <strong>PagaFácil</strong> (Fintech —
            billeteras digitales), realizada sobre <strong>DVWA en nivel Low</strong>, representando
            el escenario de mayor exposición sin controles perimetrales.
          </p>
          <p>
            Objetivo: identificar vectores de ataque, evaluar impacto y proponer controles alineados
            con <strong>OWASP Top 10</strong>, <strong>CIS Controls</strong> y{' '}
            <strong>NIST CSF</strong>.
          </p>
        </div>
        <div className="resumen-hallazgos">
          {hallazgos.map((h) => (
            <div key={h.vuln} className="hallazgo-card card">
              <div className={`hallazgo-icon icon-${h.nivel.toLowerCase()}`}>{h.icon}</div>
              <div className="hallazgo-info">
                <strong>{h.vuln}</strong>
                <div className="hallazgo-meta">
                  <Badge level={h.nivel} />
                  <span className="cvss-score">CVSS {h.cvss}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HallazgoCMD() {
  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">02 — Vulnerabilidad Crítica</span>
        <h2>
          Inyección de Comandos{' '}
          <Badge level="Crítico" />
        </h2>
        <span className="cvss-big">CVSS 9.8</span>
      </div>
      <div className="vuln-body">
        <div className="vuln-left">
          <div className="card section-desc">
            <h3>¿Qué es?</h3>
            <p>
              Ocurre cuando la aplicación concatena entradas del usuario sin validación dentro de
              llamadas al shell del sistema operativo (<code>exec</code>, <code>system</code>,{' '}
              <code>passthru</code>).
            </p>
          </div>
          <div className="card section-desc">
            <h3>Payload utilizado</h3>
            <div className="code-block">
              <code>127.0.0.1; whoami</code>
              <br />
              <code>127.0.0.1 &amp;&amp; cat /etc/passwd</code>
            </div>
            <p className="evidence-caption">
              El parámetro de ping inyectó comandos encadenados con <code>;</code> y <code>&amp;&amp;</code>.
            </p>
          </div>
        </div>
        <div className="vuln-right">
          <div className="card section-impact">
            <h3>Impacto para PagaFácil</h3>
            <ul className="impact-list">
              <li>Control total del servidor y red interna</li>
              <li>Exfiltración de configuraciones y claves</li>
              <li>Destrucción de logs de auditoría financiera</li>
              <li>Pivoting hacia sistemas de procesamiento de pagos</li>
              <li>Despliegue de ransomware en infraestructura core</li>
            </ul>
          </div>
          <div className="card fix-card">
            <h3>Remediación</h3>
            <p>
              Eliminar invocaciones al shell. Usar APIs nativas del lenguaje. Implementar listas
              blancas estrictas de argumentos aceptados.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HallazgoSQLi() {
  const registros = [
    { id: "' or '1'='1", nombre: 'admin',  apellido: 'admin' },
    { id: "' or '1'='1", nombre: 'Gordon', apellido: 'Brown' },
    { id: "' or '1'='1", nombre: 'Hack',   apellido: 'Me' },
    { id: "' or '1'='1", nombre: 'Pablo',  apellido: 'Picasso' },
    { id: "' or '1'='1", nombre: 'Bob',    apellido: 'Smith' },
  ]
  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">03 — Vulnerabilidad Alta</span>
        <h2>
          Inyección SQL <Badge level="Alto" />
        </h2>
        <span className="cvss-big cvss-alto">CVSS 8.8</span>
      </div>
      <div className="vuln-body">
        <div className="vuln-left">
          <div className="card">
            <h3>Payload</h3>
            <div className="code-block"><code>{`' or '1'='1`}</code></div>
            <p className="evidence-caption">
              Ingresado en el campo <strong>User ID</strong> del formulario DVWA.
            </p>
          </div>
          <div className="card">
            <h3>Lógica alterada</h3>
            <div className="code-block sql">
              <span className="kw">SELECT</span> first_name, last_name<br />
              <span className="kw">FROM</span> users<br />
              <span className="kw">WHERE</span> user_id = <span className="str">''</span>{' '}
              <span className="kw">OR</span> <span className="str">'1'</span>=<span className="str">'1'</span>;
            </div>
            <p className="evidence-caption">La condición siempre es verdadera → todos los registros expuestos.</p>
          </div>
        </div>
        <div className="vuln-right">
          <div className="card">
            <h3>Registros filtrados</h3>
            <table className="evidence-table">
              <thead>
                <tr><th>ID</th><th>Nombre</th><th>Apellido</th></tr>
              </thead>
              <tbody>
                {registros.map((r, i) => (
                  <tr key={i}>
                    <td className="mono">{r.id}</td>
                    <td>{r.nombre}</td>
                    <td>{r.apellido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card fix-card">
            <h3>Remediación</h3>
            <p>
              Implementar <strong>Prepared Statements</strong> con tipado estático en todas las API
              transaccionales. Principio de mínimo privilegio en cuentas de base de datos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function HallazgoXSS() {
  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">04 — Vulnerabilidad Media</span>
        <h2>
          Cross-Site Scripting (XSS) <Badge level="Medio" />
        </h2>
        <span className="cvss-big cvss-medio">CVSS 6.8</span>
      </div>
      <div className="vuln-body">
        <div className="vuln-left">
          <div className="card">
            <h3>Payload</h3>
            <div className="code-block">
              <code>{`<script>alert('XSS')</script>`}</code>
            </div>
            <p className="evidence-caption">
              Inyectado en el campo de nombre en el módulo XSS Reflected de DVWA.
            </p>
          </div>
          <div className="card">
            <h3>Tipo</h3>
            <p>
              <strong>XSS Reflejado</strong> — el payload es devuelto inmediatamente en la respuesta
              HTML sin sanitización, ejecutándose en el navegador de la víctima.
            </p>
          </div>
        </div>
        <div className="vuln-right">
          <div className="card section-impact">
            <h3>Impacto para PagaFácil</h3>
            <ul className="impact-list">
              <li>Robo de tokens de sesión (<code>document.cookie</code>)</li>
              <li>Suplantación de usuarios autenticados</li>
              <li>Transferencias fraudulentas en nombre del cliente</li>
              <li>Captura de credenciales mediante formularios falsos</li>
            </ul>
          </div>
          <div className="card fix-card">
            <h3>Remediación</h3>
            <p>
              Codificación contextual de salidas (<strong>HTML encoding</strong>) antes del render en
              el DOM. Implementar política <strong>CSP</strong> restrictiva y atributo{' '}
              <code>HttpOnly</code> en cookies de sesión.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Activos() {
  const activos = [
    { nombre: 'Base de Datos de Clientes',     c: 'Alto', i: 'Alto', d: 'Medio' },
    { nombre: 'Historial de Transacciones',    c: 'Alto', i: 'Muy Alto', d: 'Alto' },
    { nombre: 'Credenciales de Autenticación', c: 'Muy Alto', i: 'Alto', d: 'Medio' },
    { nombre: 'Servidor Web / Aplicación',     c: 'Medio', i: 'Alto', d: 'Muy Alto' },
    { nombre: 'Código Fuente',                 c: 'Alto', i: 'Alto', d: 'Bajo' },
  ]
  const levelClass = (v) => {
    if (v === 'Muy Alto') return 'cia-muy-alto'
    if (v === 'Alto') return 'cia-alto'
    if (v === 'Medio') return 'cia-medio'
    return 'cia-bajo'
  }
  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">05 — Activos e Impacto</span>
        <h2>Valorización de Activos — Triada CIA</h2>
      </div>
      <div className="activos-body">
        <table className="cia-table">
          <thead>
            <tr>
              <th>Activo de Información</th>
              <th>Confidencialidad</th>
              <th>Integridad</th>
              <th>Disponibilidad</th>
            </tr>
          </thead>
          <tbody>
            {activos.map((a) => (
              <tr key={a.nombre}>
                <td className="activo-nombre">{a.nombre}</td>
                <td><span className={`cia-pill ${levelClass(a.c)}`}>{a.c}</span></td>
                <td><span className={`cia-pill ${levelClass(a.i)}`}>{a.i}</span></td>
                <td><span className={`cia-pill ${levelClass(a.d)}`}>{a.d}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cia-legend">
          <span className="cia-pill cia-muy-alto">Muy Alto</span>
          <span className="cia-pill cia-alto">Alto</span>
          <span className="cia-pill cia-medio">Medio</span>
          <span className="cia-pill cia-bajo">Bajo</span>
        </div>
      </div>
    </div>
  )
}

function Matriz() {
  // 5×5 heat map data: [impact(5→1)][prob(1→5)]
  // R-01 = prob5, imp5 | R-02 = prob5, imp4 | R-03 = prob4, imp3
  const CELL = {
    '5-5': 'R-01', '5-4': 'crit', '5-3': 'crit', '5-2': 'crit', '5-1': 'high',
    '4-5': 'crit', '4-4': 'R-02', '4-3': 'high', '4-2': 'high', '4-1': 'med',
    '3-5': 'high', '3-4': 'high', '3-3': 'med',  '3-2': 'R-03', '3-1': 'med',
    '2-5': 'med',  '2-4': 'med',  '2-3': 'low',  '2-2': 'low',  '2-1': 'low',
    '1-5': 'low',  '1-4': 'low',  '1-3': 'low',  '1-2': 'low',  '1-1': 'low',
  }
  const impactos = [5, 4, 3, 2, 1]
  const probs = [1, 2, 3, 4, 5]
  const impLabels = ['Catastrófico', 'Mayor', 'Moderado', 'Menor', 'Insignificante']
  const probLabels = ['Muy Baja', 'Baja', 'Media', 'Alta', 'Muy Alta']

  const riesgos = [
    { id: 'R-01', vuln: 'Inyección de Comandos', prob: '5 — Muy Alta', imp: '5 — Catastrófico', nivel: 'Crítico', cvss: '9.8' },
    { id: 'R-02', vuln: 'Inyección SQL',         prob: '5 — Muy Alta', imp: '4 — Mayor',        nivel: 'Alto',    cvss: '8.8' },
    { id: 'R-03', vuln: 'Cross-Site Scripting',  prob: '4 — Alta',     imp: '3 — Moderado',     nivel: 'Medio',   cvss: '6.8' },
  ]

  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">06 — Evaluación de Riesgos</span>
        <h2>Matriz de Riesgo 5×5 y Mapa de Calor</h2>
      </div>
      <div className="matriz-body">
        <div className="heatmap-wrap">
          <div className="heatmap-prob-label">Probabilidad →</div>
          <div className="heatmap">
            <div className="hm-corner" />
            {probLabels.map((p, i) => (
              <div key={p} className="hm-prob-head">{i + 1}</div>
            ))}
            {impactos.map((imp, ri) => (
              <>
                <div key={`imp-${imp}`} className="hm-imp-head">{imp}</div>
                {probs.map((prob) => {
                  const key = `${imp}-${prob}`
                  const val = CELL[key]
                  const isMarked = val === 'R-01' || val === 'R-02' || val === 'R-03'
                  const colorClass = isMarked
                    ? val === 'R-01' ? 'hm-crit' : val === 'R-02' ? 'hm-high' : 'hm-med'
                    : val === 'crit' ? 'hm-crit'
                    : val === 'high' ? 'hm-high'
                    : val === 'med'  ? 'hm-med'
                    : 'hm-low'
                  return (
                    <div key={key} className={`hm-cell ${colorClass}`}>
                      {isMarked && <span className="hm-label">{val}</span>}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
          <div className="hm-imp-axis">Impacto ↑</div>
        </div>
        <div className="matriz-table-wrap">
          <table className="matriz-table">
            <thead>
              <tr><th>ID</th><th>Vulnerabilidad</th><th>Probabilidad</th><th>Impacto</th><th>Nivel</th><th>CVSS</th></tr>
            </thead>
            <tbody>
              {riesgos.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.id}</td>
                  <td>{r.vuln}</td>
                  <td>{r.prob}</td>
                  <td>{r.imp}</td>
                  <td><Badge level={r.nivel} /></td>
                  <td className="mono">{r.cvss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Controles() {
  const controles = [
    {
      titulo: 'Consultas Parametrizadas',
      desc: 'Prepared Statements con tipado estático en todas las API transaccionales.',
      mitiga: 'SQL Injection',
      marco: 'OWASP ASVS',
    },
    {
      titulo: 'Validación de Entradas',
      desc: 'Listas blancas de formato, tipo, longitud y caracteres en toda entrada externa.',
      mitiga: 'SQLi · XSS · CMDi',
      marco: 'OWASP Input Validation',
    },
    {
      titulo: 'Codificación de Salidas',
      desc: 'HTML encoding contextual antes del render en el DOM. Sin interpolación directa.',
      mitiga: 'XSS',
      marco: 'OWASP XSS Prevention',
    },
    {
      titulo: 'Erradicación del Shell',
      desc: 'Eliminar exec/system/passthru. Usar APIs nativas. Listas blancas de argumentos.',
      mitiga: 'Command Injection',
      marco: 'OWASP Secure Coding',
    },
    {
      titulo: 'Mínimo Privilegio',
      desc: 'Cuentas DB y OS con permisos estrictamente necesarios. Sin acceso root.',
      mitiga: 'SQLi · CMDi',
      marco: 'CIS Controls',
    },
    {
      titulo: 'WAF + CSP',
      desc: 'Web Application Firewall perimetral y política Content-Security-Policy restrictiva.',
      mitiga: 'XSS · SQLi',
      marco: 'NIST CSF — Protect',
    },
  ]
  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">07 — Políticas de Prevención</span>
        <h2>Controles de Mitigación</h2>
      </div>
      <div className="controles-grid">
        {controles.map((c) => (
          <div key={c.titulo} className="control-card card">
            <div className="control-icon"><IconLock /></div>
            <div className="control-info">
              <strong>{c.titulo}</strong>
              <p>{c.desc}</p>
              <div className="control-meta">
                <span className="mitiga-tag">{c.mitiga}</span>
                <span className="marco-tag">{c.marco}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Recuperacion() {
  const fases = [
    { num: '01', titulo: 'Aislamiento Forense', desc: 'Desconexión inmediata del entorno comprometido de la red de procesamiento de pagos.' },
    { num: '02', titulo: 'Infraestructura Limpia (IaC)', desc: 'Destrucción del entorno afectado y despliegue de imagen limpia desde repositorio seguro con MFA.' },
    { num: '03', titulo: 'Saneamiento y Carga de Datos', desc: 'Restauración desde último backup WORM + transaction logs. Validación de integridad de registros.' },
    { num: '04', titulo: 'Validación y Redirección', desc: 'Sanity checks de seguridad, pruebas funcionales y redirección de tráfico al entorno restaurado.' },
  ]
  return (
    <div className="slide">
      <div className="slide-header">
        <span className="slide-eyebrow">08 — Continuidad del Negocio</span>
        <h2>Estrategia de Recuperación</h2>
      </div>
      <div className="rec-body">
        <div className="rec-metrics">
          <div className="metric-card card">
            <div className="metric-icon"><IconRefresh /></div>
            <div>
              <div className="metric-val">2 h</div>
              <div className="metric-label">RTO — Recovery Time Objective</div>
              <p className="metric-desc">Tiempo máximo hasta restauración total del servicio en entorno alterno.</p>
            </div>
          </div>
          <div className="metric-card card">
            <div className="metric-icon"><IconDatabase /></div>
            <div>
              <div className="metric-val">15 min</div>
              <div className="metric-label">RPO — Recovery Point Objective</div>
              <p className="metric-desc">Pérdida máxima tolerable de datos transaccionales.</p>
            </div>
          </div>
        </div>
        <div className="phases-list">
          {fases.map((f) => (
            <div key={f.num} className="phase-item">
              <div className="phase-num">{f.num}</div>
              <div className="phase-content">
                <strong>{f.titulo}</strong>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Conclusiones() {
  const marcos = [
    { name: 'OWASP Top 10', desc: 'Las 3 vulnerabilidades pertenecen a las categorías A03:2021 (Injection) y A07:2021 (XSS).' },
    { name: 'CIS Controls', desc: 'Controles técnicos y operativos orientados a reducir la superficie de ataque.' },
    { name: 'NIST CSF', desc: 'Guía estructural para las funciones Identificar, Proteger, Detectar y Recuperar.' },
  ]
  return (
    <div className="slide slide-conclusiones">
      <div className="slide-header">
        <span className="slide-eyebrow">09 — Conclusiones</span>
        <h2>Cierre y Recomendaciones</h2>
      </div>
      <div className="conclusiones-body">
        <div className="conclusiones-main card">
          <p>
            La auditoría evidenció que el portal de <strong>PagaFácil</strong> presenta tres
            vulnerabilidades de alta criticidad que comprometen la{' '}
            <strong>confidencialidad, integridad y disponibilidad</strong> de sus activos
            financieros. Las debilidades reflejan ausencia de controles básicos de desarrollo
            seguro: validación de entradas, sanitización de salidas y principio de mínimo
            privilegio.
          </p>
          <p>
            La adopción de las recomendaciones propuestas — alineadas con los marcos
            internacionales — permitirá reducir significativamente la superficie de ataque y
            devolver la plataforma a un umbral operativo seguro para sus clientes.
          </p>
        </div>
        <div className="marcos-grid">
          {marcos.map((m) => (
            <div key={m.name} className="marco-card card">
              <strong>{m.name}</strong>
              <p>{m.desc}</p>
            </div>
          ))}
        </div>
        <div className="prioridad-banner card">
          <h3>Prioridad de Remediación</h3>
          <div className="prioridad-list">
            <div className="prior-item">
              <Badge level="Crítico" />
              <span>Command Injection — Mitigación <strong>inmediata</strong></span>
            </div>
            <div className="prior-item">
              <Badge level="Alto" />
              <span>SQL Injection — Reestructuración capa de datos</span>
            </div>
            <div className="prior-item">
              <Badge level="Medio" />
              <span>XSS — Sanitización y CSP a corto plazo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Slide map ─────────────────────────────────────────────────────────────────

const SLIDE_MAP = {
  Portada, Resumen, HallazgoCMD, HallazgoSQLi, HallazgoXSS,
  Activos, Matriz, Controles, Recuperacion, Conclusiones,
}

// ── Nav labels ────────────────────────────────────────────────────────────────

const NAV_LABELS = [
  'Portada', 'Resumen', 'CMDi', 'SQLi', 'XSS',
  'Activos', 'Matriz', 'Controles', 'Recuperación', 'Conclusiones',
]

// ── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [current, setCurrent] = useState(0)
  const total = SLIDES.length
  const SlideComp = SLIDE_MAP[SLIDES[current].component]

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1))

  const handleKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev()
  }

  return (
    <div className="presentation" onKeyDown={handleKey} tabIndex={0}>
      {/* Sidebar nav */}
      <nav className="sidebar" aria-label="Diapositivas">
        {NAV_LABELS.map((label, i) => (
          <button
            key={i}
            className={`nav-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            title={label}
            aria-label={label}
            aria-current={i === current ? 'true' : undefined}
          >
            <span className="nav-dot-inner" />
            <span className="nav-tooltip">{label}</span>
          </button>
        ))}
      </nav>

      {/* Slide area */}
      <main className="stage">
        <SlideComp key={current} />
      </main>

      {/* Bottom controls */}
      <footer className="controls">
        <button className="ctrl-btn" onClick={prev} disabled={current === 0} aria-label="Anterior">
          ‹
        </button>
        <span className="ctrl-counter">
          {current + 1} / {total}
        </span>
        <button className="ctrl-btn" onClick={next} disabled={current === total - 1} aria-label="Siguiente">
          ›
        </button>
      </footer>
    </div>
  )
}