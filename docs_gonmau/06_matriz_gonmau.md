# 6. Matriz de Riesgo y Mapa de Calor

## 6.1 Metodología de Evaluación de Riesgos

La evaluación de los riesgos identificados en el portal web de **PagaFácil** se realiza mediante un análisis cuantitativo y cualitativo bidimensional, combinando la **Probabilidad** de ocurrencia del escenario de amenaza con el **Impacto** directo sobre los activos de información y la continuidad del negocio. 

Para cumplir con los estándares corporativos de gestión de riesgos, se adopta una **Matriz de Priorización de $5 \times 5$**.

### Criterios de Clasificación de Probabilidad
La probabilidad determina la frecuencia estimada o la viabilidad técnica de que un vector de ataque explote con éxito la vulnerabilidad:

| Nivel | Probabilidad | Descripción Técnica |
| :---: | :--- | :--- |
| **1** | Muy Baja | La explotación es teórica, requiere condiciones extremadamente raras, nula exposición o un nivel de sofisticación propio de un actor de estado (APT). |
| **2** | Baja | La explotación es posible pero compleja; requiere eludir controles concurrentes y conocimientos muy especializados. |
| **3** | Media | La explotación es viable; existen herramientas de prueba públicas, pero requiere ciertas condiciones operacionales o autenticación previa. |
| **4** | Alta | La vulnerabilidad es conocida, expuesta públicamente y puede explotarse con relativa facilidad mediante herramientas automatizadas estándar. |
| **5** | Muy Alta | Explotación remota trivial, sin restricciones de red ni requerimientos de autenticación, con alto potencial de replicación y automatización (scripts públicos activos). |

### Criterios de Clasificación de Impacto
El impacto evalúa la degradación de las dimensiones de **Confidencialidad, Integridad y Disponibilidad (C-I-A)** sobre el activo afectado y sus consecuencias financieras, legales y reputacionales para la Fintech:

| Nivel | Impacto | Descripción de Afectación en el Negocio |
| :---: | :--- | :--- |
| **1** | Insignificante | Sin impacto financiero ni operativo discernible. Afectación nula de datos sensibles. |
| **2** | Menor | Interrupción mínima del servicio sin pérdida de datos. Impacto reputacional contenido internamente. |
| **3** | Moderado | Afectación parcial de sistemas no críticos. Alteración de registros internos recuperables sin exposición masiva. |
| **4** | Mayor | Compromiso grave de activos críticos, acceso no autorizado a datos personales o transaccionales controlados. Sanciones regulatorias moderadas. |
| **5** | Catastrófico | Compromiso total de la infraestructura core, fuga masiva de datos financieros/personales de clientes, interrupción prolongada del servicio financiero y pérdidas económicas críticas. |

---

## 6.2 Matriz de Riesgos Correlacionada

A continuación, se presenta la matriz donde el nivel de riesgo final se calcula intersecando la Probabilidad y el Impacto, heredando directamente la severidad técnica del análisis **CVSS v3.1** y la criticidad del negocio.

| ID | Vulnerabilidad | Probabilidad (1-5) | Impacto (1-5) | Nivel de Riesgo | Score CVSS v3.1 |
| :---: | :--- | :---: | :---: | :---: | :---: |
| **R-01** | Inyección de Comandos | 5 (Muy Alta) | 5 (Catastrófico) | **Crítico** | 9.8 |
| **R-02** | Inyección SQL | 5 (Muy Alta) | 4 (Mayor) | **Alto** | 8.8 |
| **R-03** | Cross-Site Scripting (XSS) | 4 (Alta) | 3 (Moderado) | **Medio** | 6.8 |

### Justificación Paramétrica y Alineación de Negocio

* **R-01: Inyección de Comandos (Riesgo: Crítico)**
  * **Justificación:** Al permitir la ejecución arbitraria de comandos en el sistema operativo del servidor web con privilegios elevados, el atacante obtiene control total de la infraestructura subyacente. Dado el ecosistema Fintech de PagaFácil, esto implica la capacidad de alterar la disponibilidad del servicio, destruir logs de auditoría e pivotar hacia la red interna de procesamiento de pagos. Su impacto hereda el nivel **Catastrófico** debido a la destrucción potencial de la continuidad operacional.
* **R-02: Inyección SQL (Riesgo: Alto)**
  * **Justificación:** Clasificada con probabilidad **Muy Alta** debido a la ausencia de sanitización en los parámetros HTTP que interactúan directamente con el motor de base de datos. El impacto se determina como **Mayor** (Nivel 4), ya que compromete directamente la *Confidencialidad* e *Integridad* del repositorio de datos corporativo, permitiendo la extracción de credenciales, hashes de acceso e información de saldos de las billeteras digitales.
* **R-03: Cross-Site Scripting (XSS) (Riesgo: Medio)**
  * **Justificación:** Presenta una probabilidad **Alta** al no contar con filtros de codificación de salida en los formularios web expuestos. Sin embargo, su impacto se contiene en **Moderado** (Nivel 3) debido a que requiere obligatoriamente de la interacción de la víctima (ingeniería social) para ejecutar el payload y secuestrar tokens de sesión en el navegador, limitando el compromiso directo de la infraestructura central.

---

## 6.3 Mapa de Calor ($5 \times 5$)

Representación gráfica de la distribución de las amenazas en función de sus coordenadas de riesgo. 

| Impacto / Probabilidad | 1. Muy Baja | 2. Baja | 3. Media | 4. Alta | 5. Muy Alta |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **5. Catastrófico** | 🟠 | 🔴 | 🔴 | 🔴 | 🔴 **[R-01]** |
| **4. Mayor** | 🟡 | 🟠 | 🟠 | 🔴 | 🔴 **[R-02]** |
| **3. Moderado** | 🟢 | 🟡 | 🟡 | 🟠 **[R-03]** | 🟠 |
| **2. Menor** | 🟢 | 🟢 | 🟡 | 🟡 | 🟡 |
| **1. Insignificante** | 🟢 | 🟢 | 🟢 | 🟡 | 🟡 |

**Leyenda de Criticidad de Riesgo:**
* 🟢 **Bajo** (Aceptable temporalmente bajo monitoreo).
* 🟡 **Medio** (Requiere mitigación programada a mediano plazo).
* 🟠 **Alto** (Requiere atención e implementación de controles a corto plazo).
* 🔴 **Crítico** (Requiere mitigación inmediata; detención o reestructuración del despliegue).

---

## 6.4 Priorización de Vulnerabilidades para el Plan de Acción

Derivado del cruce matemático y técnico anterior, se establece el orden estricto de remediación:

1. **Prioridad 1 — Inyección de Comandos [R-01]:** Mitigación inmediata mediante la erradicación de funciones que invoquen el shell del sistema operativo (`exec`, `system`, `passthru`) y la implementación de listas blancas rigurosas de argumentos.
2. **Prioridad 2 — Inyección SQL [R-02]:** Reestructuración de la capa de acceso a datos a través de la implementación mandatoria de consultas preparadas (Prepared Statements) con mapeo de tipos de datos estáticos en todas las API transaccionales.
3. **Prioridad 3 — Cross-Site Scripting (XSS) [R-03]:** Sanitización contextual y codificación (*encoding*) de todas las entradas del usuario antes de ser renderizadas en el DOM, complementado con el despliegue de una política de seguridad de contenido (CSP) restrictiva.

---

## 6.5 Relación entre Riesgo Técnico y Riesgo de Negocio

La distribución en el mapa de calor evidencia que las debilidades de la aplicación web de PagaFácil no son meras fallas de desarrollo aisladas, sino brechas críticas con repercusión financiera directa. Un exploit exitoso sobre **R-01** o **R-02** rompe el principio de confianza digital exigido a las Fintech, gatillando de forma automática:
* Infracciones regulatorias graves ante los entes fiscalizadores financieros por desprotección de datos sensibles (datos personales y financieros de los clientes).
* Pérdidas económicas directas derivadas del fraude transaccional o el secuestro de infraestructura (Ransomware).
* Efecto de fuga de clientes debido al daño reputacional colateral irreversible.

---

## 6.6 Conclusión

La adopción de la matriz corporativa de $5 \times 5$ otorga a la gerencia de PagaFácil una visibilidad cuantitativa y objetiva de su postura de seguridad actual. El mapa es concluyente: el core del negocio está expuesto a un nivel de riesgo inadmisible enfocado en la ejecución remota de código y la manipulación de base de datos. Los esfuerzos y recursos técnicos del equipo de ingeniería deben volcarse de forma prioritaria al tratamiento inmediato de las prioridades 1 y 2 para devolver la plataforma a un umbral operativo seguro.