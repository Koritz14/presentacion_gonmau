# 7. Políticas de Prevención y Controles de Mitigación

## 7.1 Introducción

La identificación de vulnerabilidades durante la auditoría evidencia la necesidad de implementar controles de seguridad que permitan reducir tanto la probabilidad de explotación como el impacto que un incidente podría generar sobre los activos de información de PagaFácil.

En esta sección se proponen políticas de prevención orientadas a eliminar las causas raíz de las vulnerabilidades detectadas y controles de mitigación destinados a limitar sus consecuencias en caso de que un ataque llegue a materializarse.

Las recomendaciones presentadas se fundamentan en buenas prácticas reconocidas internacionalmente, incluyendo **OWASP**, **CIS Controls** y el **NIST Cybersecurity Framework (CSF)**.

---

# 7.2 Políticas de Prevención

Las políticas de prevención buscan evitar que las vulnerabilidades existan desde el proceso de desarrollo y despliegue de la aplicación.

## 7.2.1 Consultas Parametrizadas

Toda interacción entre la aplicación y la base de datos deberá realizarse mediante consultas parametrizadas (Prepared Statements), evitando la construcción dinámica de consultas SQL mediante concatenación de cadenas.

Esta política elimina la posibilidad de que los datos ingresados por un usuario sean interpretados como instrucciones SQL.

**Vulnerabilidad mitigada:** SQL Injection.

**Marco relacionado:** OWASP ASVS y OWASP Top 10.

---

## 7.2.2 Validación de Entradas

Todos los datos recibidos desde formularios, parámetros HTTP, API y cualquier otra fuente externa deberán ser validados antes de ser procesados.

La validación deberá considerar:

* Tipo de dato esperado.
* Longitud máxima.
* Formato permitido.
* Caracteres autorizados.
* Valores aceptables mediante listas blancas.

Esta política reduce significativamente el riesgo de SQL Injection, Command Injection y otras vulnerabilidades derivadas de entradas maliciosas.

**Vulnerabilidades mitigadas:** SQL Injection, XSS y Command Injection.

**Marco relacionado:** OWASP Input Validation Cheat Sheet.

---

## 7.2.3 Escape y Codificación de Salidas

Toda información mostrada en páginas web deberá ser correctamente codificada antes de enviarse al navegador.

El contenido generado por usuarios nunca deberá incorporarse directamente al código HTML.

La codificación de salida impide que etiquetas HTML o scripts sean interpretados como código ejecutable.

**Vulnerabilidad mitigada:** Cross-Site Scripting (XSS).

**Marco relacionado:** OWASP XSS Prevention Cheat Sheet.

---

## 7.2.4 Uso de Listas Blancas

Cuando una aplicación requiera aceptar únicamente determinados valores (como direcciones IP o identificadores numéricos), deberán implementarse listas blancas que permitan exclusivamente formatos previamente definidos.

Este enfoque resulta considerablemente más seguro que intentar bloquear caracteres peligrosos mediante listas negras.

**Vulnerabilidad mitigada:** Command Injection.

**Marco relacionado:** OWASP Secure Coding Practices.

---

## 7.2.5 Principio de Mínimo Privilegio

Las cuentas utilizadas por la aplicación deberán disponer únicamente de los permisos estrictamente necesarios para realizar sus funciones.

Esto aplica a:

* Usuarios de bases de datos.
* Cuentas del sistema operativo.
* Servicios.
* Aplicaciones.
* Personal administrativo.

Reducir privilegios disminuye considerablemente el impacto de una explotación exitosa.

**Vulnerabilidades mitigadas:** SQL Injection y Command Injection.

**Marco relacionado:** NIST CSF – Protect (PR.AC) y CIS Controls.

---

## 7.2.6 Desarrollo Seguro (Secure SDLC)

La organización deberá incorporar prácticas de seguridad durante todas las etapas del ciclo de vida del desarrollo de software.

Estas actividades incluyen:

* Revisión de código.
* Pruebas estáticas (SAST).
* Pruebas dinámicas (DAST).
* Análisis de dependencias.
* Pruebas de penetración antes de producción.

La incorporación temprana de controles reduce costos y disminuye la aparición de vulnerabilidades.

**Vulnerabilidades mitigadas:** Todas.

**Marco relacionado:** OWASP SAMM y NIST Secure Software Development Framework (SSDF).

---

# 7.3 Controles de Mitigación

Aun implementando políticas preventivas, siempre existe la posibilidad de que una vulnerabilidad sea explotada. Por ello, es necesario disponer de controles que reduzcan el impacto de un incidente de seguridad.

## 7.3.1 Web Application Firewall (WAF)

La implementación de un WAF permite inspeccionar el tráfico HTTP y bloquear patrones asociados a ataques conocidos antes de que lleguen a la aplicación.

Puede detectar intentos de:

* SQL Injection.
* Cross-Site Scripting.
* Command Injection.
* Escaneo automatizado.

**Vulnerabilidades mitigadas:** Todas.

**Marco relacionado:** OWASP y NIST CSF (Protect).

---

## 7.3.2 Monitoreo y Gestión Centralizada de Logs

Todos los eventos relevantes de seguridad deberán registrarse en un sistema centralizado de gestión de registros.

Se recomienda registrar:

* Intentos de autenticación.
* Consultas anómalas.
* Errores del sistema.
* Cambios administrativos.
* Actividades sospechosas.

La correlación de eventos facilita la detección temprana de incidentes y las investigaciones forenses.

**Marco relacionado:** CIS Controls 8 y NIST CSF (Detect).

---

## 7.3.3 Segmentación de Red

Los componentes críticos de la infraestructura deberán ubicarse en segmentos de red separados.

Por ejemplo:

* Servidores web.
* Servidores de aplicaciones.
* Bases de datos.
* Servicios internos.

La segmentación reduce el movimiento lateral de un atacante y limita el alcance de un compromiso.

**Vulnerabilidades mitigadas:** Principalmente Command Injection.

**Marco relacionado:** CIS Controls y NIST CSF.

---

## 7.3.4 Hardening de Servidores

Los servidores deberán configurarse siguiendo prácticas de endurecimiento de seguridad.

Entre las medidas recomendadas se incluyen:

* Eliminación de servicios innecesarios.
* Deshabilitación de cuentas no utilizadas.
* Actualización periódica del sistema operativo.
* Restricción de permisos.
* Configuración segura del servidor web.

Estas acciones reducen significativamente la superficie de ataque.

**Marco relacionado:** CIS Benchmarks.

---

## 7.3.5 Gestión de Privilegios

La organización deberá implementar controles para administrar privilegios elevados.

Se recomienda:

* Uso de cuentas administrativas independientes.
* Autenticación multifactor (MFA).
* Revisión periódica de permisos.
* Eliminación de privilegios innecesarios.

Este control limita el impacto de un posible acceso no autorizado.

**Marco relacionado:** NIST CSF y CIS Controls.

---

## 7.3.6 Content Security Policy (CSP)

La implementación de una política CSP permite restringir la ejecución de scripts únicamente a fuentes autorizadas.

Este mecanismo dificulta considerablemente la explotación de vulnerabilidades XSS incluso cuando existe un error de programación.

**Vulnerabilidad mitigada:** Cross-Site Scripting.

**Marco relacionado:** OWASP.

---

## 7.3.7 Sistemas de Detección y Respuesta (IDS/IPS y EDR)

Se recomienda implementar soluciones capaces de detectar comportamientos anómalos tanto en la red como en los servidores.

Estos sistemas permiten identificar:

* Ejecución de comandos sospechosos.
* Escalamientos de privilegios.
* Accesos no autorizados.
* Actividad maliciosa persistente.

Su utilización mejora significativamente la capacidad de respuesta ante incidentes.

**Marco relacionado:** NIST CSF (Detect y Respond).

---

# 7.4 Relación entre Vulnerabilidades y Controles

| Vulnerabilidad             | Políticas de Prevención                                                                                    | Controles de Mitigación                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| SQL Injection              | Consultas parametrizadas, validación de entradas, desarrollo seguro y mínimo privilegio.                   | WAF, monitoreo de logs, gestión de privilegios y segmentación de red.                     |
| Cross-Site Scripting (XSS) | Escape de salida, validación de entradas, desarrollo seguro y sanitización de datos.                       | CSP, WAF, monitoreo de eventos y cookies seguras (HttpOnly, Secure y SameSite).           |
| Command Injection          | Validación estricta de entradas, listas blancas, evitar ejecución directa de comandos y mínimo privilegio. | Hardening de servidores, IDS/IPS, EDR, WAF, segmentación de red y gestión de privilegios. |

---

# 7.5 Conclusión

La implementación conjunta de políticas de prevención y controles de mitigación constituye una estrategia de defensa en profundidad que fortalece significativamente la postura de seguridad de PagaFácil.

Las políticas propuestas buscan eliminar las causas raíz de las vulnerabilidades detectadas durante la auditoría, mientras que los controles de mitigación reducen la probabilidad de propagación y el impacto de un incidente sobre la infraestructura tecnológica y los activos críticos del negocio.

La adopción de estas medidas, alineadas con los marcos **OWASP**, **CIS Controls** y **NIST Cybersecurity Framework**, permitirá a PagaFácil mejorar su capacidad de prevención, detección, respuesta y recuperación frente a amenazas de ciberseguridad, contribuyendo a la continuidad operacional y a la protección de la información financiera de sus clientes.
