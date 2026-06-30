# 8. Estrategia de Recuperación y Continuidad del Negocio

## 8.1 Objetivos de Recuperación (RTO y RPO)

Para garantizar la resiliencia operativa de **PagaFácil** ante incidentes de ciberseguridad de alto impacto (como la ejecución remota de comandos o el compromiso de la base de datos central), se definen formalmente los siguientes objetivos métricos de recuperación. Estos parámetros guían el diseño de la arquitectura de respaldos y los acuerdos de nivel de servicio (SLA) de la infraestructura:

* **Recovery Time Objective (RTO - Objetivo de Tiempo de Recuperación):** 2 horas.
  * *Descripción:* Es el tiempo máximo tolerable desde la declaración del incidente hasta la restauración total del servicio de la plataforma web y las API de procesamiento transaccional en el entorno alterno de producción.
* **Recovery Point Objective (RPO - Objetivo de Punto de Recuperación):** 15 minutos.
  * *Descripción:* Es la cantidad máxima de datos transaccionales o registros financieros que la Fintech está dispuesta a perder ante un desastre, lo que exige mecanismos de replicación y respaldos altamente frecuentes para las bases de datos críticas.

---

## 8.2 Plan de Continuidad del Negocio (BCP)

El Plan de Continuidad del Negocio establece las directrices organizacionales y operativas para mantener las funciones críticas de PagaFácil activas, o restablecerlas de forma degradada pero segura, durante la mitigación de un incidente de alto impacto.

### 8.2.1 Fases del BCP frente a Incidentes de Ciberseguridad

1. **Activación y Declaración del Desastre:**
   Si el equipo de seguridad determina que un atacante ha explotado la Inyección de Comandos (`R-01`) tomando control del sistema operativo, o ha ejecutado una exfiltración masiva vía SQLi (`R-02`), se notificará inmediatamente al Comité de Crisis para declarar el estado de desastre técnico si el RTO corre riesgo de superarse.
2. **Operación en Contingencia y Suspensión Transaccional:**
   * Se aislará el entorno de producción principal comprometido de forma inmediata de la red de procesamiento de pagos.
   * Se activará el desvío de tráfico de red hacia una página de contingencia estática que informe de una "mantención programada", deshabilitando temporalmente el ingreso de nuevas transacciones para proteger el saldo y los fondos de los usuarios de billeteras digitales.
3. **Comunicación Institucional:**
   Activación de los canales de comunicación preestablecidos para informar de manera transparente pero controlada a las entidades reguladoras pertinentes, socios bancarios y clientes afectados, mitigando el impacto reputacional.

---

## 8.3 Plan de Recuperación ante Desastres (DRP)

El Plan de Recuperación ante Desastres detalla las acciones técnicas e ingenieriles necesarias para reconstruir, sanear y restablecer los sistemas informáticos a su estado operativo seguro utilizando la infraestructura tecnológica alterna.

### 8.3.1 Estrategia de Respaldos (Backup)

Para soportar un RPO de 15 minutos en un entorno crítico Fintech, la política de respaldos se estructura de la siguiente manera:

* **Bases de Datos Transaccionales:** Replicación síncrona en una zona de disponibilidad secundaria, complementada con capturas de transacciones (*Transaction Log Backups*) cada 15 minutos guardadas en repositorios de almacenamiento inmutables (WORM - *Write Once, Read Many*) para evitar que un atacante con acceso a la base de datos pueda borrarlas o alterarlas de manera maliciosa.
* **Servidores de Aplicación e Imágenes (Inmutabilidad):** El código fuente y la configuración de los servidores web no se respaldan de forma tradicional; se manejan mediante **Infraestructura como Código (IaC)** y contenedores Docker. Ante un compromiso, la infraestructura se destruye por completo y se despliega una version limpia desde el repositorio de control de versiones seguro.
* **Código Fuente y Parches:** Almacenados en repositorios distribuidos fuera de la red local de producción con autenticación multifactor (MFA) obligatoria y firmas criptográficas por commit.

### 8.3.2 Procedimiento Técnico de Restauración de Servicios

Ante una pérdida total o necesidad de saneamiento completo del entorno de producción debido a exploits de vulnerabilidades analizadas en este informe, el equipo de operaciones de TI ejecutará un procedimiento estructurado en las siguientes fases secuenciales:

* **Fase 1:** Aislamiento Forense del Entorno Afectado.
* **Fase 2:** Despliegue de Infraestructura Limpia mediante IaC (Infraestructura como Código).
* **Fase 3:** Saneamiento Aplicativo y Carga de Base de Datos.
* **Fase 4:** Validación de Seguridad (Sanity Checks) y Redirección de Tráfico.

A continuación se detalla el paso a paso de la ejecución técnica:

1. **Paso 1: Aislamiento Forense:** Apagar o aislar en una VLAN de cuarentena las instancias comprometidas de producción. Se preservarán los discos duros virtuales y logs externos para el posterior análisis forense digital.
2. **Paso 2: Aprovisionamiento de Infraestructura Limpia:** Utilizando scripts de Terraform o AWS CloudFormation, se levanta un entorno productivo completamente nuevo y paralelo. Este proceso automatizado garantiza que el sistema operativo y el servidor web nazcan libres de cualquier *backdoor* o persistencia (como *web shells*) instalada por el atacante mediante la inyección de comandos.
3. **Paso 3: Aplicación del Código Parchado:** Desplegar en la nueva infraestructura la versión del código que incorpora los controles preventivos obligatorios definidos en las **Políticas de Mitigación (Sección 7)** de este informe, erradicando las fallas de inyección de comandos y consultas SQL originarias.
4. **Paso 4: Restauración de Datos y Roll-Forward:** Importar el último respaldo inmutable de la base de datos transaccional y aplicar la consolidación de los *Transaction Log Backups* disponibles, asegurando que cualquier pérdida de registros se mantenga estrictamente dentro del margen tolerable de 15 minutos definido por el RPO corporativo.
5. **Paso 5: Pruebas de Humo y Seguridad (Sanity Checks):** Antes de exponer la nueva infraestructura al tráfico real, el equipo de Seguridad de la Información (SecOps) ejecutará scripts automatizados de análisis de vulnerabilidades dinámicas (DAST) y pruebas funcionales de regresión en la pasarela de pagos. Esto asegura la efectividad de los parches aplicados y la correcta activación de las configuraciones de endurecimiento (*hardening*) referenciadas previamente.
6. **Paso 6: Redirección de Tráfico y Apertura de Puertas:** Una vez validadas las pruebas, se modifican las reglas del balanceador de carga o los registros de la red de entrega de contenido (CDN/DNS) para dirigir de forma progresiva (despliegue canario) el tráfico de los clientes hacia el nuevo entorno sano, finalizando formalmente el estado de contingencia técnica.

---

## 8.4 Plan de Notificación ante Incidentes y Cumplimiento Regulatorio

Al operar en el sector Fintech bajo la identidad de **PagaFácil**, existe una obligación legal y regulatoria estricta de reportar brechas de seguridad que comprometan datos de carácter personal o transacciones financieras. El proceso de notificación se ejecutará en paralelo a la fase de contención técnica, estructurado según los siguientes plazos y destinatarios:

### 8.4.1 Matriz de Comunicación de Crisis

| Destinatario | Plazo Máximo | Canal Oficial | Contenido del Reporte |
| :--- | :---: | :--- | :--- |
| **Entidades Reguladoras Financieras** | 24 Horas | Portal de Reportes de Incidentes (Ciberseguridad) | Descripción preliminar del incidente, activos de información afectados e impacto inicial estimado en la continuidad operacional. |
| **Socios Bancarios y Proveedores de Pasarelas** | 12 Horas | Conexión de API Segura / Correo Encriptado | Indicadores de Compromiso (IoC) técnicos detectados para prevenir fraudes interbancarios o movimientos de capitales anómalos. |
| **Clientes y Usuarios Afectados** | 48 Horas | Correo Electrónico Institucional y Notificación Push | Declaración de la brecha en lenguaje claro, medidas inmediatas tomadas por la Fintech y recomendaciones de seguridad para el usuario (p. ej., revocación y cambio de contraseñas). |

---

## 8.5 Estrategia de Mejora Continua (Post-Incident Review)

Para cumplir con la función de **Evolución** establecida en los marcos internacionales de ciberseguridad, **PagaFácil** no considera un incidente cerrado hasta que se complete la auditoría de lecciones aprendidas dentro de las 72 horas posteriores al restablecimiento total del servicio.

### 8.5.1 Proceso de Análisis de Causa Raíz (RCA)
El equipo de SecOps liderará una mesa técnica para documentar la línea de tiempo exacta del ataque. Se utilizará la metodología de los *5 Whys* (Cinco Porqués) para identificar la falla del proceso de desarrollo que permitió que un código sin sanitizar de entrada o salida (como el que originó la Inyección de Comandos o la Inyección SQL) fuese promovido al entorno de producción sin pasar por un pipeline automatizado de análisis estático (SAST).

### 8.5.2 Actualización de la Postura Defensiva
Los resultados del análisis forense y las debilidades descubiertas durante el ejercicio de recuperación se traducirán inmediatamente en:
* Creación de nuevas firmas de bloqueo personalizadas en el Web Application Firewall (WAF).
* Inclusión de los payloads específicos explotados dentro del set de pruebas automatizadas del pipeline de CI/CD para evitar regresiones de código.
* Actualización de las matrices de riesgo operacional de la organización.

---

## 8.6 Conclusión del Plan de Continuidad y Recuperación

La implementación estricta de este marco de BCP y DRP asegura que **PagaFácil** pueda transformar una crisis tecnológica potencialmente catastrófica en un evento operativo manejable, predecible y resiliente. 

Al automatizar la reconstrucción de la infraestructura mediante Infraestructura como Código (IaC), asegurar la inmutabilidad de los respaldos financieros con un RPO de 15 minutos y estructurar canales de notificación transparentes, la Fintech no solo garantiza la preservación de los fondos de sus usuarios, sino que blinda el activo más difícil de recuperar tras un incidente de ciberseguridad: **la confianza digital de sus clientes y del mercado financiero.**