# refleccion
El uso de IA como chatbot es util para recopilar y analisar informacion, aunque debe ser supervisada. En algunas ocasiones la IA invento o genero datos incoherentes con lo que se habia desarrollado previamente, especialmente cuando se abre un chat nuevo. La IA como agente por otro lado es mas como un asistente al cual se le puede delegar el desarrollo del proyecto, aun que almenos en el caso de copilot este tiene una falta de criterio, algunos de los errores que cometio por falta de este son indices duplicados  la barra de navegacion no sigue la pantalla, esto pasa por que la IA no usa la apliacion solo revisa que el contenido este, aun con instrucciones detalladas es necesaria la supervicion.

2. 
# prompts (ChatGPT)
## 1. handoff con el contexto de la evaluacion
Genera un archivo markdown tipo handoff para entregar a la IA con el contexto completo de esta evaluacion. Antes de responder, hazme tres preguntas técnicas o estratégicas para asegurarte de que tu respuesta sea exactamente lo que necesito.
Repite este proceso hasta estar 99 % seguro de que puedes ofrecer una solución precisa y ajustada al contexto del problema informático.

## 2. Analisis del caso y generacion del informe
Actúa como un Auditor de Seguridad de la Información y elabora un informe académico sobre una auditoría realizada a la empresa ficticia PagaFácil (Fintech), utilizando DVWA como entorno de pruebas. Desarrolla un resumen ejecutivo y analiza las vulnerabilidades de Inyección SQL, Cross-Site Scripting (XSS) e Inyección de Comandos, incluyendo descripción técnica, evidencias, impacto sobre el negocio, evaluación CVSS, medidas de prevención y controles de mitigación. Además, identifica los activos críticos de información, evalúa los riesgos mediante una matriz y mapa de calor, prioriza las vulnerabilidades y propone mejoras tecnológicas junto con un Plan de Recuperación ante Desastres (DR), manteniendo un enfoque técnico, académico y profesional.

## 3. Evaluacion/correccion del informe
Con el informe ya completo, ahora asumiendo el rol de un profesor de ingenieria en informatica y ciberseguridad exigente evalua segun la rubrica este informe.

## 4. Pre generacion de instrucciones a copilot para crear aplicacion web en react
el informe esta completo, ahora paso a la fase de generar la aplicacion web en react del informe, antes de empesar quiero saber que cosas deberia tener en cuenta para generar las instrucciones a darle a copilot para que cree la aplicacion web.

Antes de responder, hazme tres preguntas técnicas o estratégicas para asegurarte de que tu respuesta sea exactamente lo que necesito.

Repite este proceso hasta estar 99 % seguro de que puedes ofrecer una solución precisa y ajustada al contexto del problema informático.

# prompts (Copilot)
# 1. Inicio de creacion aplicacion web en react
Antes de comenzar el desarrollo, lee completamente el archivo `COPILOT_INSTRUCCIONES.md`. Analízalo como la especificación técnica del proyecto. No implementes nada todavía. Resume tu comprensión de la arquitectura, restricciones, objetivos y fases de desarrollo. Si detectas alguna ambigüedad o decisión técnica que deba resolverse antes de comenzar, indícalo. 

## 2. Desarrollo apliacion
Lee primero `COPILOT_INSTRUCCIONES.md`.

Analiza el estado actual del proyecto.

Verifica qué fases ya están implementadas.

Comienza únicamente con la Fase 1.

No modifiques funcionalidades de fases anteriores salvo que exista un error que impida continuar.

*Esto se repitio por cada una de las 8 fases*

## 3. Arreglar problemas de visualizacion
Existen algunos problemas con la navegación actual. El informe completo se muestra en una sola página, lo que hace que la aplicación sea demasiado extensa y obligue a realizar mucho desplazamiento. En su lugar, modifica la navegación para que al seleccionar una sección desde el índice se muestre únicamente ese contenido, funcionando de manera similar a una presentación con diapositivas (slides), donde cada sección del informe ocupa una vista independiente.

## 4. Arreglar problemas de indices duplicados
Existe una redundancia en la navegación, ya que actualmente se muestran dos índices. Conserva únicamente el índice ubicado en el lado izquierdo de la pantalla y elimina el otro. Además, haz que este índice permanezca fijo (sticky) mientras el usuario navega, de modo que siempre esté accesible y no sea necesario volver al inicio de la página para cambiar de sección.

## 5. Arreglar problemas de contenido en pagina
Revisa toda la interfaz de la aplicación y elimina cualquier texto o elemento que dé la impresión de que está "en desarrollo" o que funcione como nota informativa sobre la propia aplicación. Ahora que el proyecto está funcional, la interfaz debe verse como un producto terminado. Conserva únicamente la información relevante para el usuario y el contenido del informe, reemplazando o eliminando textos como "Diseño visual mejorado", "Presentación interactiva", "Diapositiva activa" u otros similares que parezcan temporales o de demostración.

## 6. Arreglar falta de componentes para cada documento del informe
Revisa la estructura del proyecto y verifica que cumpla con la organización solicitada por la evaluación. En particular, comprueba que cada archivo Markdown del informe tenga su correspondiente componente React dentro de `src/components/`, siguiendo la correspondencia indicada por el docente (por ejemplo: `01_resumen` → `Resumen.jsx`, `02_sqli` → `InyeccionSQL.jsx`, etc.) y que dichos componentes sean importados y utilizados desde `App.jsx` o desde la estructura de navegación que los integre.

Si detectas que la implementación actual no sigue este esquema, refactoriza únicamente la arquitectura interna para cumplir con el requisito. **No modifiques la apariencia, el diseño, la navegación ni el comportamiento de la aplicación.** El resultado visual debe permanecer exactamente igual; únicamente debe cambiar la organización del código para ajustarse a la estructura esperada por la evaluación.

Antes de realizar cambios, indica si la estructura actual cumple o no con este requisito y explica brevemente qué modificaciones son necesarias para adaptarla.