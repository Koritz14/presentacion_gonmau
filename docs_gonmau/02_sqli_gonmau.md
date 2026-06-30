# 2. Inyección SQL (SQL Injection)

## 2.1 Descripción de la Vulnerabilidad

La **Inyección SQL (SQL Injection)** es una vulnerabilidad de seguridad que ocurre cuando una aplicación incorpora datos proporcionados por el usuario directamente dentro de una consulta SQL sin realizar una validación o sanitización adecuada.

Esta debilidad permite que un atacante modifique la estructura lógica de las consultas ejecutadas por la base de datos, pudiendo acceder, modificar o eliminar información sin autorización.

La vulnerabilidad se encuentra catalogada dentro de los principales riesgos de aplicaciones web identificados por OWASP debido a su alta frecuencia de explotación y al elevado impacto que puede generar sobre la confidencialidad, integridad y disponibilidad de la información.

En una organización Fintech como PagaFácil, una vulnerabilidad de este tipo podría comprometer información altamente sensible, incluyendo datos personales de clientes, credenciales de acceso, historiales de transacciones y registros financieros.

---

## 2.2 Evidencia de la Vulnerabilidad

Durante la auditoría se evaluó el módulo vulnerable de SQL Injection presente en DVWA.

Se utilizó como entrada el siguiente payload:

```sql
' or '1'='1
```

El valor fue ingresado en el campo **User ID** del formulario vulnerable.

### Evidencia 1 – Explotación de SQL Injection

![docs\_gonmau/img\_gonmau/sql\_injection.png](img_gonmau/sql_injection.png)

**Figura 1.** Explotación exitosa de una vulnerabilidad SQL Injection en DVWA. El payload `' or '1'='1` altera la lógica de la consulta SQL y provoca que el sistema retorne múltiples registros de usuarios almacenados en la base de datos.

### Resultados Obtenidos

La aplicación devolvió múltiples registros pertenecientes a distintos usuarios:

| ID ingresado | Nombre | Apellido |
| ------------ | ------ | -------- |
| ' or '1'='1  | admin  | admin    |
| ' or '1'='1  | Gordon | Brown    |
| ' or '1'='1  | Hack   | Me       |
| ' or '1'='1  | Pablo  | Picasso  |
| ' or '1'='1  | Bob    | Smith    |

La respuesta demuestra que el sistema no validó adecuadamente la entrada proporcionada por el usuario y ejecutó una consulta modificada por el atacante.

---

## 2.3 Explicación Técnica del Ataque

Normalmente, una aplicación vulnerable podría construir una consulta similar a la siguiente:

```sql
SELECT first_name, last_name
FROM users
WHERE user_id = '$id';
```

Si el usuario introduce el valor:

```sql
1
```

La consulta resultante sería:

```sql
SELECT first_name, last_name
FROM users
WHERE user_id = '1';
```

Sin embargo, al introducir:

```sql
' or '1'='1
```

La consulta se transforma en:

```sql
SELECT first_name, last_name
FROM users
WHERE user_id = '' OR '1'='1';
```

La expresión:

```sql
'1'='1'
```

siempre es verdadera.

Como consecuencia, la condición completa del `WHERE` también resulta verdadera para todos los registros existentes en la tabla, provocando que la base de datos devuelva la totalidad de los usuarios almacenados.

Este comportamiento demuestra que la entrada del usuario está siendo concatenada directamente dentro de la consulta SQL sin utilizar mecanismos de protección adecuados.

---

## 2.4 Análisis de Explotabilidad

La vulnerabilidad resulta explotable debido a diversas deficiencias de seguridad presentes en la aplicación:

### Ausencia de consultas parametrizadas

La aplicación construye consultas SQL mediante concatenación de cadenas, permitiendo que los datos proporcionados por el usuario sean interpretados como instrucciones SQL válidas.

### Falta de validación de entradas

No existen controles que restrinjan el formato o contenido esperado para el parámetro recibido.

### Ausencia de sanitización

Los caracteres especiales utilizados en SQL (`'`, `"`, `;`, `--`) son procesados directamente por el motor de base de datos.

### Exposición directa de resultados

La aplicación devuelve información obtenida de la base de datos sin aplicar mecanismos adecuados de control de acceso o filtrado.

Estas condiciones facilitan significativamente la explotación de la vulnerabilidad incluso por atacantes con conocimientos técnicos básicos.

---

## 2.5 Impacto sobre los Activos de Información

Para una empresa Fintech como PagaFácil, la explotación de SQL Injection podría afectar activos críticos del negocio.

### Base de datos de clientes

Un atacante podría obtener nombres, correos electrónicos, números de identificación y otra información personal.

### Credenciales de autenticación

Dependiendo de la estructura de la base de datos, podrían exponerse usuarios y contraseñas almacenadas.

### Historial de transacciones

La información financiera de los clientes podría ser consultada, modificada o eliminada.

### Información financiera

Los saldos de billeteras digitales y registros contables podrían verse comprometidos.

### Registros de auditoría

Un atacante con privilegios suficientes podría alterar evidencias utilizadas para investigaciones forenses posteriores.

---

## 2.6 Evaluación del Riesgo (CVSS v3.1)

Para determinar la severidad técnica de la vulnerabilidad SQL Injection de forma客观 y estandarizada, se aplicó el estándar internacional **CVSS v3.1** (Common Vulnerability Scoring System).

**Vector de Ataque Oficial:** `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L`
**Puntaje Base Global:** 8.8 (Alto)

### Desglose de Métricas del Vector Base

| Métrica CVSS v3.1 | Componente Técnico | Valor Asignado | Impacto / Significado |
| :--- | :--- | :--- | :--- |
| **AV** (Attack Vector) | Vector de Ataque | **N** (Network) | Explotable de forma remota a través del protocolo HTTP/HTTPS. |
| **AC** (Attack Complexity) | Complejidad del Ataque | **L** (Low) | Baja; la aplicación no posee mecanismos defensivos intermedios. |
| **PR** (Privileges Required) | Privilegios Requeridos | **N** (None) | No se requieren credenciales ni roles para explotar el formulario. |
| **UI** (User Interaction) | Interacción del Usuario | **N** (None) | El ataque es directo; no requiere engañar a ningún usuario legítimo. |
| **S** (Scope) | Alcance | **U** (Unchanged) | El impacto se limita exclusivamente al motor de la base de datos. |
| **C** (Confidentiality) | Confidencialidad | **H** (High) | Máximo; permite la exfiltración masiva de datos y registros financieros. |
| **I** (Integrity) | Integridad | **H** (High) | Máximo; permite modificar, insertar o destruir datos y saldos de cuentas. |
| **A** (Availability) | Disponibilidad | **L** (Low) | Bajo; posible denegación de servicio por bloqueos o retardos temporales. |

### Justificación Detallada de las Métricas del Vector

Para garantizar la rigurosidad del análisis, se justifica la selección de cada componente y valor del vector con base en el escenario técnico auditado:

* **Vector de Ataque (AV:N - Network):** El exploit se ejecuta de forma completamente remota a través del protocolo HTTP/HTTPS, utilizando el navegador web para enviar el payload malicioso al portal de clientes de PagaFácil. No se requiere acceso físico ni local a la infraestructura.
* **Complejidad del Ataque (AC:L - Low):** La complejidad es baja debido a que la aplicación web (DVWA en nivel Low) no implementa ningún mecanismo de defensa perimetral, firmas de WAF, ni lógica de sanitización intermedia. El atacante solo necesita ingresar caracteres especiales estándar (`' or '1'='1`) para alterar la consulta SQL.
* **Privilegios Requeridos (PR:N - None):** El formulario de consulta web analizado es accesible de manera pública o no requiere que el atacante posea privilegios administrativos previos dentro de la base de datos para corromper la consulta; cualquier usuario con acceso a la URL del módulo puede iniciar el vector.
* **Interacción del Usuario (UI:N - None):** El ataque es directo contra el servidor web. No se requiere engañar a un tercero ni se necesita que un usuario legítimo haga clic en un enlace o realice alguna acción complementaria para que la inyección SQL se ejecute con éxito.
* **Alcance (S:U - Unchanged):** La explotación exitosa permite leer o modificar datos exclusivamente dentro del mismo motor de base de datos que aloja la aplicación web. El atacante no logra saltar el contexto hacia el sistema operativo subyacente del servidor web a través de este hallazgo específico

---

## 2.7 Medidas de Prevención

Las siguientes medidas permiten eliminar o reducir significativamente la probabilidad de explotación.

### Consultas Parametrizadas (Prepared Statements)

Separar los datos de las instrucciones SQL evita que la entrada del usuario sea interpretada como código ejecutable.

Ejemplo:

```php
$stmt = $pdo->prepare(
    "SELECT first_name, last_name
     FROM users
     WHERE user_id = ?"
);

$stmt->execute([$id]);
```

### Validación de Entradas (Defensa en Profundidad)

Consiste en verificar de forma estricta que los datos recibidos en el lado del servidor correspondan al tipo, longitud y formato esperado antes de ser procesados por cualquier lógica de negocio.

Por ejemplo, si el identificador `User ID` debe ser estrictamente numérico, se debe validar programáticamente antes de interactuar con la persistencia:

```php
if (!is_numeric($id)) {
    exit("Entrada inválida");
}
```
Nota técnica de control: Si bien la validación de tipos (como is_numeric) actúa como una excelente capa de defensa secundaria, esta medida debe considerarse complementaria. La separación definitiva entre el código y los datos aportada por las consultas parametrizadas sigue siendo la salvaguarda primaria mandatoria para entradas de cualquier naturaleza (alfanuméricas o de texto libre).

### Principio de Mínimo Privilegio

La cuenta de conexión utilizada por la aplicación web hacia el motor de base de datos debe poseer exclusivamente los permisos estrictamente necesarios para la operación del negocio (operaciones DML como `SELECT`, `INSERT` y `UPDATE` sobre tablas específicas de la aplicación). 

Se deben restringir de manera mandatoria los privilegios administrativos o de definición de datos (operaciones DDL como `DROP`, `ALTER` o `CREATE`), y revocar cualquier acceso a esquemas del sistema (como la tabla `mysql.user` o funciones de ejecución de comandos). Esto garantiza que, en caso de una falla en los controles preventivos, el atacante no pueda comprometer la integridad global del motor de datos.

### Desarrollo Seguro

Incorporar revisiones de código y pruebas de seguridad durante el ciclo de vida del desarrollo.

---

## 2.8 Controles de Mitigación

Incluso implementando medidas preventivas, es recomendable establecer controles adicionales que reduzcan el impacto de una eventual explotación.

### Web Application Firewall (WAF)

Un WAF puede detectar y bloquear patrones comunes de SQL Injection antes de que lleguen a la aplicación.

**Marco relacionado:** OWASP, NIST CSF.

### Monitoreo y Correlación de Eventos

Implementar registros centralizados y sistemas SIEM que permitan detectar comportamientos anómalos.

**Marco relacionado:** CIS Controls 8 y NIST CSF.

### Segmentación de Red

Separar servidores web y bases de datos reduce la superficie de ataque y limita el movimiento lateral.

**Marco relacionado:** CIS Controls.

### Gestión de Privilegios

Restringir los permisos de las cuentas de base de datos utilizadas por la aplicación.

**Marco relacionado:** NIST CSF y CIS Controls.

### Auditorías Periódicas

Realizar pruebas de penetración y análisis de vulnerabilidades de forma regular para detectar debilidades antes de que sean explotadas.

**Marco relacionado:** OWASP Testing Guide.

---

## 2.9 Conclusión

La vulnerabilidad SQL Injection identificada durante la auditoría representa un riesgo significativo para una organización como PagaFácil debido a su capacidad para comprometer información sensible y afectar procesos críticos del negocio.

La evidencia obtenida demuestra que la aplicación permite alterar la lógica de las consultas SQL mediante entradas manipuladas por el usuario, lo que podría derivar en accesos no autorizados, fuga de información financiera y afectación de la confianza de los clientes.

La implementación de consultas parametrizadas, validación estricta de entradas y controles defensivos complementarios constituye una medida esencial para reducir este riesgo y fortalecer la postura de seguridad de la organización.
