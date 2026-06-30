# 1. Resumen Ejecutivo

## 1.1 Contexto y Alcance

El presente informe documenta los resultados de una auditoría de seguridad de aplicaciones web realizada al portal de clientes de la empresa **PagaFácil**, organización perteneciente al sector **Fintech**, dedicada a la administración de billeteras digitales y servicios financieros electrónicos.

PagaFácil gestiona información crítica para la continuidad de su negocio, incluyendo datos personales de clientes, credenciales de autenticación, registros de transacciones financieras, saldos de billeteras digitales y otra información sensible relacionada con operaciones monetarias. Debido a la naturaleza de estos activos, la organización requiere controles de seguridad que garanticen la confidencialidad, integridad y disponibilidad de la información.

La auditoría fue desarrollada en un entorno controlado utilizando la plataforma **DVWA (Damn Vulnerable Web Application)**, configurada en nivel de seguridad **Low**, lo que representa el escenario más vulnerable y permite identificar los vectores de ataque sin la interferencia de mecanismos de mitigación perimetrales. Los resultados son representativos de aplicaciones web con controles de seguridad insuficientes o ausentes. El objetivo principal fue evaluar los riesgos asociados a debilidades de seguridad que podrían afectar a una organización con características similares a las de PagaFácil.

Como resultado global de este proceso, se identificaron, analizaron y categorizaron un total de **tres (3) vulnerabilidades de seguridad**, distribuidas según su nivel de severidad técnica bajo el estándar CVWA/CVSS v3.1 en: **una (1) vulnerabilidad de severidad Crítica (Inyección de Comandos), una (1) de severidad Alta (Inyección SQL) y una (1) de severidad Media (Cross-Site Scripting)**. Este conjunto de hallazgos expone una superficie de ataque que compromete de forma directa los pilares de la seguridad de la información de la plataforma.

## 1.2 Objetivos de la Auditoría

La auditoría tuvo como propósito identificar vulnerabilidades presentes en la aplicación, evaluar su impacto potencial sobre los activos de información y determinar el nivel de riesgo que representarían para la organización en un escenario real.

Para ello se analizaron tres categorías de vulnerabilidades ampliamente reconocidas dentro de los principales riesgos de aplicaciones web:

* Inyección SQL (SQL Injection).
* Cross-Site Scripting (XSS).
* Inyección de Comandos del Sistema Operativo (Command Injection).

Adicionalmente, se evaluó la relación entre dichas vulnerabilidades y los activos críticos del negocio, se realizó una valoración de riesgos mediante criterios de probabilidad e impacto, y se propusieron medidas de prevención, mitigación y recuperación alineadas con buenas prácticas internacionales de ciberseguridad.

## 1.3 Principales Hallazgos

Durante la ejecución de la auditoría se identificaron vulnerabilidades que permiten comprometer distintos niveles de la infraestructura tecnológica y de la información administrada por la organización. A continuación se presentan los hallazgos en orden de criticidad descendente.

La vulnerabilidad de **Inyección de Comandos** permitió ejecutar comandos directamente sobre el sistema operativo del servidor a través de parámetros manipulados por un atacante. Este escenario representa el riesgo más crítico identificado, ya que podría facilitar el acceso al servidor, la obtención de información sensible, la alteración de configuraciones o incluso el compromiso total de la infraestructura.

La vulnerabilidad de **Inyección SQL** evidenció la posibilidad de manipular consultas realizadas a la base de datos mediante entradas de usuario insuficientemente validadas. Este tipo de ataque podría permitir el acceso no autorizado a información sensible, incluyendo datos de clientes, registros financieros y credenciales de autenticación.

La vulnerabilidad de **Cross-Site Scripting (XSS)** demostró la capacidad de ejecutar código JavaScript malicioso dentro del navegador de los usuarios. Un atacante podría utilizar esta técnica para robar sesiones activas, capturar información confidencial o realizar acciones fraudulentas en nombre de usuarios legítimos.

## 1.4 Impacto Potencial para el Negocio

En una organización Fintech como PagaFácil, la explotación exitosa de estas vulnerabilidades podría generar consecuencias significativas tanto a nivel operativo como estratégico.

Entre los principales impactos identificados se encuentran:

* Exposición de datos personales y financieros de clientes.
* Acceso no autorizado a cuentas y billeteras digitales.
* Alteración o eliminación de registros de transacciones.
* Interrupción de servicios críticos para los usuarios.
* Pérdida de confianza por parte de clientes y socios comerciales.
* Daño reputacional y disminución de la credibilidad corporativa.
* Posibles incumplimientos normativos relacionados con la protección de datos y la seguridad de la información.
* Pérdidas económicas derivadas de fraude, sanciones regulatorias o interrupciones operativas.

La Inyección de Comandos representa la amenaza más grave al comprometer directamente el servidor y todos los activos alojados en él. La Inyección SQL afecta principalmente la confidencialidad e integridad de los datos almacenados en la base de datos, mientras que el Cross-Site Scripting expone a los usuarios a robo de sesiones activas y acciones fraudulentas ejecutadas en su nombre.

Considerando que las organizaciones Fintech basan gran parte de su modelo de negocio en la confianza digital y la protección de activos financieros, la materialización de cualquiera de estos riesgos podría afectar significativamente la continuidad operacional de la empresa.

## 1.5 Evaluación General del Riesgo

El análisis realizado permitió concluir que las vulnerabilidades identificadas presentan un nivel de riesgo alto para la organización, con una vulnerabilidad clasificada en el nivel más crítico.

La Inyección de Comandos fue clasificada como riesgo **crítico** (CVSS 9.8), dado su potencial para comprometer completamente la infraestructura tecnológica. La Inyección SQL fue clasificada como riesgo **alto** (CVSS 8.8) por su capacidad para exponer y modificar información sensible almacenada en la base de datos. El Cross-Site Scripting presenta un nivel de riesgo medio (CVSS 6.8), con impacto concentrado en las sesiones de los usuarios y la integridad de la información mostrada en el navegador.

La combinación de estas vulnerabilidades evidencia deficiencias relacionadas con la validación de entradas, la sanitización de datos, el control de privilegios y la implementación de mecanismos de seguridad defensivos en la aplicación.

## 1.6 Conclusiones

Los resultados obtenidos demuestran que la aplicación evaluada presenta vulnerabilidades que podrían ser explotadas por atacantes para comprometer la confidencialidad, integridad y disponibilidad de la información.

Las debilidades identificadas reflejan problemas comunes de desarrollo seguro y resaltan la importancia de implementar controles preventivos desde las etapas iniciales del ciclo de vida del software. Asimismo, se evidencia la necesidad de complementar estas medidas mediante mecanismos de monitoreo, detección, respuesta ante incidentes y recuperación operativa.

Finalmente, se concluye que la adopción de prácticas alineadas con marcos reconocidos como **OWASP Top 10** (que categoriza las vulnerabilidades identificadas entre los principales riesgos de aplicaciones web), **CIS Controls** (orientado a la implementación de controles técnicos y operativos) y el **NIST Cybersecurity Framework** (como guía estructural para las funciones de protección, detección y recuperación), permitiría reducir significativamente la superficie de ataque y fortalecer la postura de seguridad de PagaFácil frente a amenazas actuales y futuras.
