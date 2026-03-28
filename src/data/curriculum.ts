export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  exercise: Exercise;
  flashcards: Flashcard[];
}

export interface Exercise {
  prompt: string;
  starterCode: string;
  solution: string;
  tests: string[];
  hints: string[];
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface Module {
  id: string;
  title: string;
  emoji: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  lessons: Lesson[];
}

export const modules: Module[] = [
  // ─────────────────────────────────────────────
  // MODULE 1: FUNDAMENTOS
  // ─────────────────────────────────────────────
  {
    id: "basics",
    title: "Fundamentos",
    emoji: "🧱",
    level: "beginner",
    lessons: [
      {
        id: "types-101",
        title: "Tipos Básicos",
        description: "string, number, boolean y más",
        content: `# Tipos Básicos en TypeScript

TypeScript añade **tipos estáticos** a JavaScript. Los tipos básicos son:

\`\`\`typescript
let nombre: string = "Sebas";
let edad: number = 28;
let activo: boolean = true;
let nulo: null = null;
let indef: undefined = undefined;
\`\`\`

## ¿Por qué importa?
Si intentas asignar un valor del tipo incorrecto, TypeScript te avisa **antes** de ejecutar:

\`\`\`typescript
let edad: number = 28;
edad = "veintiocho"; // ❌ Error: Type 'string' is not assignable to type 'number'
\`\`\`

## Type Inference
TypeScript puede **inferir** el tipo sin que lo escribas:

\`\`\`typescript
let ciudad = "Buenos Aires"; // TypeScript sabe que es string
\`\`\`

## Any vs Unknown
\`\`\`typescript
let cualquiera: any = 5; // desactiva chequeo de tipos ⚠️
cualquiera.foo(); // no da error, pero explota en runtime

let desconocido: unknown = 5; // seguro: obliga a verificar
// desconocido.foo(); // ❌ Error
if (typeof desconocido === "number") {
  console.log(desconocido + 1); // ✅ OK luego de verificar
}
\`\`\``,
        exercise: {
          prompt: "Declara una variable `precio` de tipo number con valor 99.99, y una variable `producto` de tipo string con valor \"Laptop\".",
          starterCode: `// Declara tus variables aquí\n`,
          solution: `let precio: number = 99.99;\nlet producto: string = "Laptop";`,
          tests: [
            "typeof precio === 'number' && precio === 99.99",
            "typeof producto === 'string' && producto === 'Laptop'"
          ],
          hints: ["Usa la sintaxis: let variable: tipo = valor;", "number para números, string para texto"]
        },
        flashcards: [
          { front: "¿Cuáles son los tipos primitivos en TS?", back: "string, number, boolean, null, undefined, symbol, bigint" },
          { front: "¿Qué es Type Inference?", back: "La capacidad de TS de deducir el tipo automáticamente sin anotación explícita." },
          { front: "¿Qué pasa si asignas un string a una variable number?", back: "Error de compilación: Type 'string' is not assignable to type 'number'" },
          { front: "¿Cuál es la diferencia entre null y undefined?", back: "undefined = variable declarada sin valor. null = ausencia intencional de valor." },
          { front: "¿Diferencia entre any y unknown?", back: "any desactiva el chequeo de tipos. unknown obliga a verificar el tipo antes de usar el valor." }
        ]
      },
      {
        id: "arrays-tuples",
        title: "Arrays y Tuplas",
        description: "Colecciones tipadas y tuplas",
        content: `# Arrays y Tuplas

## Arrays
Dos formas de tipar arrays:

\`\`\`typescript
let nums: number[] = [1, 2, 3];
let strs: Array<string> = ["a", "b", "c"];
\`\`\`

## Tuplas
Arrays con **longitud fija** y **tipos por posición**:

\`\`\`typescript
let persona: [string, number] = ["Sebas", 28];
// persona[0] es string, persona[1] es number
\`\`\`

## Named Tuples (TS 4.0+)
\`\`\`typescript
type Coordenada = [x: number, y: number, z: number];
const punto: Coordenada = [10, 20, 30];
\`\`\`

## Readonly Arrays
\`\`\`typescript
let colores: readonly string[] = ["rojo", "azul"];
// colores.push("verde"); // ❌ Error: push no existe en readonly
\`\`\`

## Spread con tipos
\`\`\`typescript
const first: number[] = [1, 2];
const second: number[] = [3, 4];
const combined: number[] = [...first, ...second]; // [1,2,3,4]
\`\`\``,
        exercise: {
          prompt: "Crea un array `notas` de tipo number[] con valores [85, 92, 78] y una tupla `usuario` de tipo [string, number, boolean] con valores [\"Ana\", 25, true].",
          starterCode: `// Crea el array y la tupla aquí\n`,
          solution: `let notas: number[] = [85, 92, 78];\nlet usuario: [string, number, boolean] = ["Ana", 25, true];`,
          tests: [
            "Array.isArray(notas) && notas.length === 3 && notas[0] === 85",
            "Array.isArray(usuario) && usuario[0] === 'Ana' && usuario[1] === 25 && usuario[2] === true"
          ],
          hints: ["Para arrays: let nombre: tipo[] = [...]", "Para tuplas: let nombre: [tipo1, tipo2, ...] = [...]"]
        },
        flashcards: [
          { front: "¿Cuál es la diferencia entre un array y una tupla?", back: "Un array tiene longitud variable con un solo tipo. Una tupla tiene longitud fija con tipos por posición." },
          { front: "¿Cómo declaras un array readonly?", back: "readonly string[] o ReadonlyArray<string>" },
          { front: "Dos formas de tipar un array de numbers", back: "number[] o Array<number>" },
          { front: "¿Qué son Named Tuples?", back: "Tuplas donde cada posición tiene un nombre descriptivo: [x: number, y: number]" }
        ]
      },
      {
        id: "functions",
        title: "Funciones Tipadas",
        description: "Parámetros, retorno y opcionales",
        content: `# Funciones en TypeScript

## Parámetros y retorno tipados
\`\`\`typescript
function sumar(a: number, b: number): number {
  return a + b;
}
\`\`\`

## Parámetros opcionales y default
\`\`\`typescript
function saludo(nombre: string, titulo?: string): string {
  return titulo ? \`\${titulo} \${nombre}\` : nombre;
}

function potencia(base: number, exp: number = 2): number {
  return Math.pow(base, exp);
}
\`\`\`

## Arrow Functions
\`\`\`typescript
const multiplicar = (a: number, b: number): number => a * b;
\`\`\`

## Rest Parameters
\`\`\`typescript
function sumarTodos(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}
sumarTodos(1, 2, 3, 4); // 10
\`\`\`

## Function Types
\`\`\`typescript
type Operacion = (a: number, b: number) => number;
const dividir: Operacion = (a, b) => a / b;
\`\`\`

## Void y Never
\`\`\`typescript
function log(msg: string): void {
  console.log(msg); // no retorna nada
}

function error(msg: string): never {
  throw new Error(msg); // nunca termina
}
\`\`\``,
        exercise: {
          prompt: "Crea una función `calcularArea` que reciba `base: number` y `altura: number`, y retorne el área del triángulo (base * altura / 2).",
          starterCode: `// Escribe tu función aquí\n`,
          solution: `function calcularArea(base: number, altura: number): number {\n  return (base * altura) / 2;\n}`,
          tests: [
            "calcularArea(10, 5) === 25",
            "calcularArea(6, 4) === 12"
          ],
          hints: ["El área de un triángulo es (base * altura) / 2", "No olvides anotar el tipo de retorno: number"]
        },
        flashcards: [
          { front: "¿Qué retorna una función void?", back: "No retorna nada (undefined implícitamente)." },
          { front: "¿Cuándo se usa never?", back: "Cuando una función nunca termina: throw error o loop infinito." },
          { front: "¿Cómo se marca un parámetro como opcional?", back: "Con ? después del nombre: function f(x?: number)" },
          { front: "¿Qué es un Function Type?", back: "Un type que describe la firma de una función: type Fn = (a: number) => string" },
          { front: "¿Qué son rest parameters?", back: "Parámetros que capturan N argumentos en un array: (...args: number[])" }
        ]
      },
      {
        id: "objects-destructuring",
        title: "Objetos y Destructuring",
        description: "Tipado de objetos y desestructuración",
        content: `# Objetos Tipados

## Object Type Inline
\`\`\`typescript
let persona: { nombre: string; edad: number } = {
  nombre: "Sebas",
  edad: 28
};
\`\`\`

## Destructuring con tipos
\`\`\`typescript
function presentar({ nombre, edad }: { nombre: string; edad: number }): string {
  return \`Soy \${nombre}, tengo \${edad} años\`;
}
\`\`\`

## Optional Chaining (?.)
\`\`\`typescript
type Config = {
  db?: {
    host?: string;
    port?: number;
  };
};

const config: Config = {};
const host = config.db?.host; // string | undefined (no explota)
\`\`\`

## Nullish Coalescing (??)
\`\`\`typescript
const puerto = config.db?.port ?? 3000; // usa 3000 si es null/undefined
// Diferencia con ||: 0 ?? 3000 → 0  vs  0 || 3000 → 3000
\`\`\`

## Non-null Assertion (!)
\`\`\`typescript
const input = document.getElementById("email")!; // le dices a TS "confía, no es null"
// ⚠️ Usar con cuidado, puede causar runtime errors
\`\`\``,
        exercise: {
          prompt: "Crea una función `getFullName` que reciba un objeto `{ first: string, last: string, middle?: string }` usando destructuring, y retorne el nombre completo. Si middle existe, inclúyelo.",
          starterCode: `// Escribe tu función aquí\n`,
          solution: `function getFullName({ first, last, middle }: { first: string; last: string; middle?: string }): string {\n  return middle ? \`\${first} \${middle} \${last}\` : \`\${first} \${last}\`;\n}`,
          tests: [
            "getFullName({ first: 'Juan', last: 'Pérez' }) === 'Juan Pérez'",
            "getFullName({ first: 'Ana', last: 'López', middle: 'María' }) === 'Ana María López'"
          ],
          hints: ["Usa destructuring en el parámetro: { prop1, prop2 }: { ... }", "Verifica si middle existe con un ternario"]
        },
        flashcards: [
          { front: "¿Qué hace el operador ?.?", back: "Optional chaining: accede a propiedades de forma segura, retorna undefined si algo en la cadena es null/undefined." },
          { front: "¿Diferencia entre ?? y ||?", back: "?? solo usa el fallback si el valor es null/undefined. || también para 0, '' y false." },
          { front: "¿Qué hace el operador ! (non-null assertion)?", back: "Le dice a TS que el valor no es null/undefined. Usar con precaución." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 2: INTERFACES & TYPES
  // ─────────────────────────────────────────────
  {
    id: "interfaces-types",
    title: "Interfaces & Types",
    emoji: "📐",
    level: "beginner",
    lessons: [
      {
        id: "interfaces",
        title: "Interfaces",
        description: "Define la forma de tus objetos",
        content: `# Interfaces

Las interfaces definen la **estructura** que debe tener un objeto:

\`\`\`typescript
interface Usuario {
  nombre: string;
  edad: number;
  email?: string; // opcional
  readonly id: number; // no se puede modificar
}

const user: Usuario = {
  nombre: "Sebas",
  edad: 28,
  id: 1
};
\`\`\`

## Extender interfaces
\`\`\`typescript
interface Empleado extends Usuario {
  cargo: string;
  salario: number;
}
\`\`\`

## Múltiple herencia
\`\`\`typescript
interface Serializable {
  toJSON(): string;
}

interface EmpleadoSerializable extends Empleado, Serializable {
  departamento: string;
}
\`\`\`

## Index Signatures
\`\`\`typescript
interface Diccionario {
  [key: string]: string;
}

const colores: Diccionario = {
  rojo: "#FF0000",
  azul: "#0000FF"
};
\`\`\`

## Declaration Merging
\`\`\`typescript
interface Config {
  host: string;
}
interface Config {
  port: number;
}
// Config ahora tiene { host: string; port: number; }
\`\`\``,
        exercise: {
          prompt: "Crea una interface `Producto` con propiedades: nombre (string), precio (number), enStock (boolean) y descripcion (string, opcional). Luego crea un objeto `miProducto` que la implemente.",
          starterCode: `// Define la interface y el objeto aquí\n`,
          solution: `interface Producto {\n  nombre: string;\n  precio: number;\n  enStock: boolean;\n  descripcion?: string;\n}\n\nconst miProducto: Producto = {\n  nombre: "Mouse",\n  precio: 29.99,\n  enStock: true\n};`,
          tests: [
            "miProducto.nombre !== undefined && typeof miProducto.nombre === 'string'",
            "typeof miProducto.precio === 'number' && typeof miProducto.enStock === 'boolean'"
          ],
          hints: ["Usa ? para propiedades opcionales", "Declara el objeto con const obj: Interface = { ... }"]
        },
        flashcards: [
          { front: "¿Cuál es la diferencia principal entre interface y type?", back: "Las interfaces se pueden extender con extends y se mergean automáticamente. Los types usan & para intersección y son más flexibles." },
          { front: "¿Qué es una index signature?", back: "[key: string]: tipo — permite propiedades dinámicas con un tipo definido." },
          { front: "¿Qué hace readonly en una propiedad?", back: "Impide que se modifique después de la asignación inicial." },
          { front: "¿Qué es Declaration Merging?", back: "Cuando defines la misma interface dos veces, TS las combina automáticamente en una sola." }
        ]
      },
      {
        id: "type-aliases",
        title: "Type Aliases & Unions",
        description: "Types, unions e intersecciones",
        content: `# Type Aliases

\`\`\`typescript
type ID = string | number;
type Punto = { x: number; y: number };
\`\`\`

## Union Types
Un valor puede ser **uno de varios tipos**:

\`\`\`typescript
type Resultado = "exito" | "error" | "pendiente";

function mostrar(val: string | number) {
  if (typeof val === "string") {
    console.log(val.toUpperCase());
  } else {
    console.log(val.toFixed(2));
  }
}
\`\`\`

## Intersection Types
Combina múltiples tipos en uno:

\`\`\`typescript
type Nombre = { nombre: string };
type Edad = { edad: number };
type Persona = Nombre & Edad;

const p: Persona = { nombre: "Ana", edad: 30 };
\`\`\`

## Literal Types
\`\`\`typescript
type Direccion = "norte" | "sur" | "este" | "oeste";
let dir: Direccion = "norte"; // ✅
// dir = "arriba"; // ❌ Error
\`\`\`

## as const
\`\`\`typescript
const config = {
  url: "https://api.com",
  retry: 3
} as const;
// tipo: { readonly url: "https://api.com"; readonly retry: 3; }
// Sin as const sería: { url: string; retry: number }
\`\`\``,
        exercise: {
          prompt: "Crea un type alias `Respuesta` que sea una union de \"ok\" | \"error\" | \"loading\". Crea una función `getEstado` que reciba un `code: number` y retorne Respuesta: 200 → \"ok\", 500 → \"error\", cualquier otro → \"loading\".",
          starterCode: `// Define el type y la función aquí\n`,
          solution: `type Respuesta = "ok" | "error" | "loading";\n\nfunction getEstado(code: number): Respuesta {\n  if (code === 200) return "ok";\n  if (code === 500) return "error";\n  return "loading";\n}`,
          tests: [
            "getEstado(200) === 'ok'",
            "getEstado(500) === 'error'",
            "getEstado(301) === 'loading'"
          ],
          hints: ["Usa type Nombre = \"valor1\" | \"valor2\" para unions", "Retorna uno de los literales según la condición"]
        },
        flashcards: [
          { front: "¿Qué es un Union Type?", back: "Un tipo que puede ser uno de varios tipos: string | number" },
          { front: "¿Qué es un Intersection Type?", back: "Combina múltiples tipos en uno solo con &: TypeA & TypeB" },
          { front: "¿Qué son los Literal Types?", back: "Tipos que solo permiten valores exactos: 'norte' | 'sur'" },
          { front: "¿Qué hace 'as const'?", back: "Convierte un valor en su tipo literal más estrecho y lo hace readonly profundo." }
        ]
      },
      {
        id: "enums-special",
        title: "Enums y Tipos Especiales",
        description: "Enums, any, unknown, never, void",
        content: `# Enums

## Numeric Enums
\`\`\`typescript
enum Direccion {
  Arriba,    // 0
  Abajo,     // 1
  Izquierda, // 2
  Derecha    // 3
}

let dir: Direccion = Direccion.Arriba;
\`\`\`

## String Enums
\`\`\`typescript
enum Color {
  Rojo = "RED",
  Verde = "GREEN",
  Azul = "BLUE"
}

function pintar(color: Color): string {
  return \`Pintando de \${color}\`;
}
pintar(Color.Rojo); // "Pintando de RED"
\`\`\`

## const enum (optimizado)
\`\`\`typescript
const enum Status {
  Activo = "ACTIVE",
  Inactivo = "INACTIVE"
}
// Se reemplaza en tiempo de compilación (no genera objeto)
\`\`\`

## Alternativa moderna: Union de literals
\`\`\`typescript
// Muchos prefieren esto sobre enums:
type Status = "active" | "inactive" | "pending";
// Más liviano y mejor tree-shaking
\`\`\`

## Tipos especiales resumen
\`\`\`typescript
let a: any;       // Cualquier cosa, sin chequeo
let u: unknown;   // Cualquier cosa, PERO hay que verificar
let v: void;      // No retorna valor (funciones)
let n: never;     // Nunca ocurre (throw, infinite loop)
\`\`\``,
        exercise: {
          prompt: "Crea un string enum `HttpMethod` con valores GET = \"GET\", POST = \"POST\", PUT = \"PUT\", DELETE = \"DELETE\". Luego crea una función `esLectura` que reciba un HttpMethod y retorne true solo si es GET.",
          starterCode: `// Define el enum y la función aquí\n`,
          solution: `enum HttpMethod {\n  GET = "GET",\n  POST = "POST",\n  PUT = "PUT",\n  DELETE = "DELETE"\n}\n\nfunction esLectura(method: HttpMethod): boolean {\n  return method === HttpMethod.GET;\n}`,
          tests: [
            "esLectura(HttpMethod.GET) === true",
            "esLectura(HttpMethod.POST) === false"
          ],
          hints: ["enum Nombre { Clave = \"VALOR\" }", "Compara con === contra el enum member"]
        },
        flashcards: [
          { front: "¿Diferencia entre numeric y string enum?", back: "Numeric: auto-incrementa desde 0. String: cada valor se define explícitamente con un string." },
          { front: "¿Qué es un const enum?", back: "Un enum que se elimina en compilación y se reemplaza inline por sus valores. Más eficiente." },
          { front: "¿Por qué usar union literals en vez de enum?", back: "Mejor tree-shaking, más liviano, y no genera código JS adicional." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 3: CLASSES & OOP
  // ─────────────────────────────────────────────
  {
    id: "classes-oop",
    title: "Clases & OOP",
    emoji: "🏗️",
    level: "intermediate",
    lessons: [
      {
        id: "classes-basics",
        title: "Clases en TypeScript",
        description: "Propiedades, constructor, métodos",
        content: `# Clases en TypeScript

## Clase básica
\`\`\`typescript
class Animal {
  nombre: string;
  sonido: string;

  constructor(nombre: string, sonido: string) {
    this.nombre = nombre;
    this.sonido = sonido;
  }

  hablar(): string {
    return \`\${this.nombre} dice \${this.sonido}\`;
  }
}

const perro = new Animal("Rex", "Guau!");
\`\`\`

## Shorthand del constructor
\`\`\`typescript
class Punto {
  constructor(
    public x: number,
    public y: number,
    private label: string = "punto"
  ) {}
  // x, y, label se declaran Y asignan automáticamente
}
\`\`\`

## Access Modifiers
\`\`\`typescript
class Cuenta {
  public titular: string;    // accesible desde fuera
  private saldo: number;     // solo dentro de la clase
  protected tipo: string;    // clase + subclases

  constructor(titular: string, saldo: number) {
    this.titular = titular;
    this.saldo = saldo;
    this.tipo = "corriente";
  }

  public getSaldo(): number {
    return this.saldo;
  }
}
\`\`\`

## Readonly properties
\`\`\`typescript
class Config {
  readonly version: string = "1.0.0";
  // this.version = "2.0"; // ❌ Error
}
\`\`\``,
        exercise: {
          prompt: "Crea una clase `Rectangulo` con propiedades `ancho` y `alto` (ambas number, usando shorthand del constructor con public). Añade un método `area()` que retorne ancho * alto, y un método `perimetro()` que retorne 2 * (ancho + alto).",
          starterCode: `// Define la clase aquí\n`,
          solution: `class Rectangulo {\n  constructor(public ancho: number, public alto: number) {}\n\n  area(): number {\n    return this.ancho * this.alto;\n  }\n\n  perimetro(): number {\n    return 2 * (this.ancho + this.alto);\n  }\n}`,
          tests: [
            "new Rectangulo(5, 3).area() === 15",
            "new Rectangulo(5, 3).perimetro() === 16"
          ],
          hints: ["Usa constructor(public prop: tipo) como shorthand", "Accede con this.ancho, this.alto"]
        },
        flashcards: [
          { front: "¿Qué hace public en un parámetro del constructor?", back: "Declara la propiedad, la asigna al valor del parámetro y la hace pública, todo automáticamente." },
          { front: "¿Diferencia entre private y protected?", back: "private: solo accesible dentro de la clase. protected: accesible en la clase y sus subclases." },
          { front: "¿Qué hace readonly en una propiedad de clase?", back: "La propiedad solo se puede asignar en la declaración o en el constructor, nunca después." }
        ]
      },
      {
        id: "inheritance-abstract",
        title: "Herencia y Abstract",
        description: "extends, abstract, implements",
        content: `# Herencia

## extends
\`\`\`typescript
class Animal {
  constructor(public nombre: string) {}

  mover(distancia: number): string {
    return \`\${this.nombre} se movió \${distancia}m\`;
  }
}

class Perro extends Animal {
  ladrar(): string {
    return \`\${this.nombre}: Guau!\`;
  }

  // Override
  mover(distancia: number): string {
    return \`\${this.nombre} corrió \${distancia}m\`;
  }
}
\`\`\`

## Abstract Classes
No se pueden instanciar, solo extender:

\`\`\`typescript
abstract class Forma {
  abstract area(): number;  // debe ser implementado
  abstract perimetro(): number;

  describe(): string {
    return \`Área: \${this.area()}, Perímetro: \${this.perimetro()}\`;
  }
}

class Circulo extends Forma {
  constructor(private radio: number) { super(); }

  area(): number { return Math.PI * this.radio ** 2; }
  perimetro(): number { return 2 * Math.PI * this.radio; }
}
\`\`\`

## Implements (interface)
\`\`\`typescript
interface Printable {
  print(): string;
}

interface Loggable {
  log(): void;
}

class Documento implements Printable, Loggable {
  constructor(private contenido: string) {}
  print(): string { return this.contenido; }
  log(): void { console.log(this.contenido); }
}
\`\`\``,
        exercise: {
          prompt: "Crea una clase abstracta `Vehiculo` con propiedad `marca: string` y método abstracto `describir(): string`. Luego crea una clase `Auto` que extienda Vehiculo, añada `puertas: number` e implemente describir() retornando \"Auto [marca] con [puertas] puertas\".",
          starterCode: `// Define las clases aquí\n`,
          solution: `class Vehiculo {\n  constructor(public marca: string) {}\n  describir() { return ""; }\n}\n\nclass Auto extends Vehiculo {\n  constructor(marca: string, public puertas: number) {\n    super(marca);\n  }\n\n  describir(): string {\n    return \`Auto \${this.marca} con \${this.puertas} puertas\`;\n  }\n}`,
          tests: [
            "new Auto('Toyota', 4).describir() === 'Auto Toyota con 4 puertas'",
            "new Auto('Ford', 2).marca === 'Ford'"
          ],
          hints: ["Llama a super(marca) en el constructor del hijo", "Usa template literals para el string de retorno"]
        },
        flashcards: [
          { front: "¿Se puede instanciar una clase abstract?", back: "No. Solo se puede extender, las subclases deben implementar los métodos abstractos." },
          { front: "¿Diferencia entre extends e implements?", back: "extends hereda de una clase (propiedades + métodos). implements 'promete' que la clase cumple con una interface." },
          { front: "¿Una clase puede implementar múltiples interfaces?", back: "Sí: class Foo implements InterfaceA, InterfaceB { ... }" }
        ]
      },
      {
        id: "getters-setters-static",
        title: "Getters, Setters y Static",
        description: "Propiedades computadas y miembros estáticos",
        content: `# Getters y Setters

\`\`\`typescript
class Temperatura {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }

  set fahrenheit(f: number) {
    this._celsius = (f - 32) * 5 / 9;
  }

  get celsius(): number {
    return this._celsius;
  }
}

const temp = new Temperatura(100);
console.log(temp.fahrenheit); // 212 (se accede como propiedad)
temp.fahrenheit = 32;
console.log(temp.celsius); // 0
\`\`\`

## Static Members
Pertenecen a la clase, no a las instancias:

\`\`\`typescript
class Contador {
  static total: number = 0;

  constructor() {
    Contador.total++;
  }

  static getTotal(): number {
    return Contador.total;
  }
}

new Contador();
new Contador();
Contador.getTotal(); // 2
\`\`\`

## Static + Private (Singleton)
\`\`\`typescript
class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}
\`\`\``,
        exercise: {
          prompt: "Crea una clase `Circulo` con propiedad privada `_radio: number`. Añade un getter `area` que retorne Math.PI * radio^2, un getter `radio` que retorne _radio, y un setter `radio` que solo acepte valores > 0 (si es <= 0, no cambie el valor).",
          starterCode: `// Define la clase aquí\n`,
          solution: `class Circulo {\n  private _radio: number;\n\n  constructor(radio: number) {\n    this._radio = radio;\n  }\n\n  get radio(): number {\n    return this._radio;\n  }\n\n  set radio(value: number) {\n    if (value > 0) this._radio = value;\n  }\n\n  get area(): number {\n    return Math.PI * this._radio ** 2;\n  }\n}`,
          tests: [
            "Math.abs(new Circulo(5).area - 78.5398) < 0.01",
            "(() => { const c = new Circulo(5); c.radio = -1; return c.radio === 5; })()"
          ],
          hints: ["get propiedad(): tipo { return ... }", "set propiedad(val: tipo) { ... }"]
        },
        flashcards: [
          { front: "¿Cómo se accede a un getter?", back: "Como una propiedad normal: objeto.getter, sin paréntesis." },
          { front: "¿Qué es un miembro static?", back: "Pertenece a la clase misma, no a instancias. Se accede con NombreClase.miembro." },
          { front: "¿Qué es el patrón Singleton?", back: "Una clase que solo puede tener una instancia, usando constructor private y un método static getInstance()." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 4: GENERICS
  // ─────────────────────────────────────────────
  {
    id: "generics",
    title: "Generics",
    emoji: "🔮",
    level: "intermediate",
    lessons: [
      {
        id: "generics-intro",
        title: "Intro a Generics",
        description: "Funciones y tipos reutilizables",
        content: `# Generics

Los generics permiten crear componentes **reutilizables** que trabajan con cualquier tipo:

\`\`\`typescript
function identidad<T>(valor: T): T {
  return valor;
}

identidad<string>("hola"); // T es string
identidad(42); // T se infiere como number
\`\`\`

## ¿Por qué no usar \`any\`?
Con \`any\` pierdes la información del tipo. Con generics la **preservas**:

\`\`\`typescript
function primero<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n = primero([1, 2, 3]); // tipo: number | undefined
const s = primero(["a", "b"]); // tipo: string | undefined
\`\`\`

## Múltiples type parameters
\`\`\`typescript
function swap<A, B>(a: A, b: B): [B, A] {
  return [b, a];
}

const result = swap("hola", 42); // [number, string]
\`\`\`

## Generic Constraints
\`\`\`typescript
function largo<T extends { length: number }>(item: T): number {
  return item.length;
}

largo("hola"); // ✅ string tiene length
largo([1, 2]); // ✅ array tiene length
// largo(123); // ❌ number no tiene length
\`\`\`

## Default Type Parameters
\`\`\`typescript
interface ApiResponse<T = unknown> {
  data: T;
  error?: string;
}

const res: ApiResponse = { data: "algo" }; // T defaults to unknown
const typed: ApiResponse<string[]> = { data: ["a"] };
\`\`\``,
        exercise: {
          prompt: "Crea una función genérica `envolverEnArray<T>` que reciba un valor de tipo T y retorne T[]. Ejemplo: envolverEnArray(5) → [5].",
          starterCode: `// Escribe tu función genérica aquí\n`,
          solution: `function envolverEnArray<T>(valor: T): T[] {\n  return [valor];\n}`,
          tests: [
            "JSON.stringify(envolverEnArray(5)) === '[5]'",
            "JSON.stringify(envolverEnArray('hola')) === '[\"hola\"]'"
          ],
          hints: ["Usa <T> después del nombre de la función", "El retorno es T[] (array del mismo tipo)"]
        },
        flashcards: [
          { front: "¿Qué problema resuelven los Generics?", back: "Permiten escribir código reutilizable que mantiene la seguridad de tipos, sin usar any." },
          { front: "¿Qué hace T extends { length: number }?", back: "Restringe T a solo tipos que tengan la propiedad length de tipo number." },
          { front: "¿Se pueden tener default generics?", back: "Sí: interface Foo<T = string> { ... } — T es string si no se especifica." }
        ]
      },
      {
        id: "generic-interfaces",
        title: "Interfaces Genéricas",
        description: "Interfaces y clases con generics",
        content: `# Interfaces y Clases Genéricas

## Interface Genérica
\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const userRes: ApiResponse<{ name: string }> = {
  data: { name: "Sebas" },
  status: 200,
  message: "OK"
};
\`\`\`

## Clase Genérica
\`\`\`typescript
class Cola<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  size(): number {
    return this.items.length;
  }
}

const nums = new Cola<number>();
nums.enqueue(1);
nums.enqueue(2);
\`\`\`

## keyof con Generics
\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Ana", age: 25 };
getProperty(user, "name"); // string
getProperty(user, "age");  // number
// getProperty(user, "foo"); // ❌ Error
\`\`\`

## Generic con Mapped Types
\`\`\`typescript
type Opcional<T> = {
  [K in keyof T]?: T[K];
};

type SoloLectura<T> = {
  readonly [K in keyof T]: T[K];
};
\`\`\``,
        exercise: {
          prompt: "Crea una interface genérica `Caja<T>` con propiedades: contenido de tipo T y etiqueta de tipo string. Luego crea un objeto `cajaDeNumero` de tipo Caja<number>.",
          starterCode: `// Define la interface y el objeto aquí\n`,
          solution: `interface Caja<T> {\n  contenido: T;\n  etiqueta: string;\n}\n\nconst cajaDeNumero: Caja<number> = {\n  contenido: 42,\n  etiqueta: "Respuesta"\n};`,
          tests: [
            "cajaDeNumero.contenido === 42",
            "typeof cajaDeNumero.etiqueta === 'string'"
          ],
          hints: ["interface Nombre<T> { ... }", "Usa T como tipo de la propiedad contenido"]
        },
        flashcards: [
          { front: "¿Qué es keyof T?", back: "Un union type de todas las keys (propiedades) de T como strings." },
          { front: "¿Qué hace K extends keyof T?", back: "Restringe K a ser solo una de las propiedades válidas de T." },
          { front: "¿Para qué sirve una clase genérica?", back: "Para crear estructuras de datos reutilizables con tipo seguro (Cola<T>, Lista<T>, etc.)" }
        ]
      },
      {
        id: "generic-patterns",
        title: "Patrones con Generics",
        description: "Factory, Builder, Repository con generics",
        content: `# Patrones Avanzados con Generics

## Factory Pattern
\`\`\`typescript
interface Entidad {
  id: string;
  createdAt: Date;
}

function crearEntidad<T extends Entidad>(data: Omit<T, "id" | "createdAt"> & { id?: string }): T {
  return {
    ...data,
    id: data.id || Math.random().toString(36).slice(2),
    createdAt: new Date()
  } as T;
}
\`\`\`

## Generic Repository
\`\`\`typescript
class Repository<T extends { id: string }> {
  private items: Map<string, T> = new Map();

  save(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

interface User { id: string; name: string; }
const userRepo = new Repository<User>();
\`\`\`

## Builder Pattern
\`\`\`typescript
class QueryBuilder<T> {
  private filters: Partial<T> = {};
  private sortField?: keyof T;

  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters[key] = value;
    return this; // permite encadenamiento
  }

  orderBy(field: keyof T): this {
    this.sortField = field;
    return this;
  }

  build(): { filters: Partial<T>; sort?: keyof T } {
    return { filters: this.filters, sort: this.sortField };
  }
}
\`\`\``,
        exercise: {
          prompt: "Crea una función genérica `filtrar<T>` que reciba un array T[], una key K (extends keyof T) y un valor T[K]. Debe retornar todos los elementos donde arr[i][key] === valor.",
          starterCode: `// Define la función aquí\n`,
          solution: `function filtrar<T, K extends keyof T>(arr: T[], key: K, valor: T[K]): T[] {\n  return arr.filter(item => item[key] === valor);\n}`,
          tests: [
            "filtrar([{n:'a',x:1},{n:'b',x:2},{n:'c',x:1}], 'x', 1).length === 2",
            "filtrar([{a:true},{a:false},{a:true}], 'a', true).length === 2"
          ],
          hints: ["Usa dos type parameters: T y K extends keyof T", "El valor tiene tipo T[K] para que sea type-safe"]
        },
        flashcards: [
          { front: "¿Qué es T[K] cuando K extends keyof T?", back: "El tipo del valor de la propiedad K en T. Es un indexed access type." },
          { front: "¿Qué retorna 'this' en un método?", back: "La instancia actual, permitiendo method chaining: obj.metodo1().metodo2()" },
          { front: "¿Qué es Omit<T, K>?", back: "Un utility type que crea un tipo como T pero sin las propiedades en K." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 5: ASYNC TYPESCRIPT
  // ─────────────────────────────────────────────
  {
    id: "async",
    title: "Async TypeScript",
    emoji: "⏳",
    level: "intermediate",
    lessons: [
      {
        id: "promises",
        title: "Promises Tipadas",
        description: "Tipar promesas y async/await",
        content: `# Promises en TypeScript

## Promise<T>
\`\`\`typescript
function fetchUser(id: number): Promise<{ name: string; age: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: "Sebas", age: 28 });
    }, 1000);
  });
}
\`\`\`

## async / await
\`\`\`typescript
async function getUser(): Promise<string> {
  const user = await fetchUser(1);
  return user.name; // TypeScript sabe que es string
}
\`\`\`

## Promise.all con tipos
\`\`\`typescript
async function loadDashboard() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),    // Promise<User[]>
    fetchPosts(),    // Promise<Post[]>
    fetchComments()  // Promise<Comment[]>
  ]);
  // TypeScript infiere [User[], Post[], Comment[]]
}
\`\`\`

## Promise.allSettled
\`\`\`typescript
const results = await Promise.allSettled([
  fetchUser(1),
  fetchUser(999) // puede fallar
]);

results.forEach(result => {
  if (result.status === "fulfilled") {
    console.log(result.value); // el dato
  } else {
    console.log(result.reason); // el error
  }
});
\`\`\`

## Error handling tipado
\`\`\`typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function safeFetch<T>(url: string): Promise<Result<T>> {
  try {
    const data = await fetch(url).then(r => r.json());
    return { ok: true, value: data as T };
  } catch (e) {
    return { ok: false, error: e as Error };
  }
}
\`\`\``,
        exercise: {
          prompt: "Crea una función `delay<T>` que reciba `ms: number` y `value: T`, retorne una Promise<T> que resuelva con el valor después de ms milisegundos.",
          starterCode: `// Define la función aquí\n`,
          solution: `function delay<T>(ms: number, value: T): Promise<T> {\n  return new Promise(resolve => setTimeout(() => resolve(value), ms));\n}`,
          tests: [
            "delay(0, 42).then(v => v === 42).then(r => r === true ? 'pass' : 'fail') !== undefined",
            "delay(0, 'hola') instanceof Promise"
          ],
          hints: ["Retorna new Promise<T>(resolve => ...)", "Usa setTimeout para el delay"]
        },
        flashcards: [
          { front: "¿Cómo tipas una función async?", back: "El tipo de retorno es siempre Promise<T>: async function f(): Promise<string>" },
          { front: "¿Diferencia entre Promise.all y Promise.allSettled?", back: "all falla si cualquiera falla. allSettled espera a todas y reporta status de cada una." },
          { front: "¿Qué es el patrón Result<T, E>?", back: "Un discriminated union que representa éxito (ok: true, value: T) o fallo (ok: false, error: E)." }
        ]
      },
      {
        id: "generics-async",
        title: "Fetch Tipado y APIs",
        description: "Patrones para consumir APIs con tipos",
        content: `# Fetch Tipado

## Wrapper de fetch genérico
\`\`\`typescript
async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json() as Promise<T>;
}

// Uso
interface User { id: number; name: string; email: string; }
const users = await api<User[]>("/api/users");
\`\`\`

## API Client con Generics
\`\`\`typescript
class ApiClient {
  constructor(private baseUrl: string) {}

  async get<T>(path: string): Promise<T> {
    return api<T>(\`\${this.baseUrl}\${path}\`);
  }

  async post<T, B>(path: string, body: B): Promise<T> {
    return api<T>(\`\${this.baseUrl}\${path}\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  }
}
\`\`\`

## Typed Error Handling
\`\`\`typescript
class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: unknown
  ) {
    super(\`API Error: \${status} \${statusText}\`);
    this.name = "ApiError";
  }
}

async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new ApiError(res.status, res.statusText, await res.json().catch(() => null));
  }
  return res.json();
}
\`\`\``,
        exercise: {
          prompt: "Crea una función `parseJSON<T>(jsonString: string): T | null` que intente parsear un JSON string. Si falla, retorna null.",
          starterCode: `// Define la función aquí\n`,
          solution: `function parseJSON<T>(jsonString: string): T | null {\n  try {\n    return JSON.parse(jsonString) as T;\n  } catch {\n    return null;\n  }\n}`,
          tests: [
            "parseJSON('{\"a\":1}') !== null && parseJSON('{\"a\":1}').a === 1",
            "parseJSON('invalid json') === null"
          ],
          hints: ["Usa try/catch alrededor de JSON.parse", "Castea con 'as T' el resultado"]
        },
        flashcards: [
          { front: "¿Por qué castear con 'as T' en fetch?", back: "Porque response.json() retorna Promise<any>. El cast le da forma al tipo, pero no valida en runtime." },
          { front: "¿Qué es un API Client genérico?", back: "Una clase que encapsula fetch con métodos tipados get<T>, post<T,B>, etc." },
          { front: "¿Cómo crear errores tipados?", back: "Extendiendo Error: class ApiError extends Error { status: number; ... }" }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 6: ADVANCED TYPES
  // ─────────────────────────────────────────────
  {
    id: "advanced",
    title: "Tipos Avanzados",
    emoji: "⚡",
    level: "advanced",
    lessons: [
      {
        id: "utility-types",
        title: "Utility Types",
        description: "Partial, Required, Pick, Omit y más",
        content: `# Utility Types

TypeScript incluye tipos de utilidad incorporados:

## Partial<T> — todas las propiedades opcionales
\`\`\`typescript
interface User { name: string; age: number; }
type PartialUser = Partial<User>;
// { name?: string; age?: number; }
\`\`\`

## Required<T> — todas obligatorias
\`\`\`typescript
type RequiredUser = Required<PartialUser>;
\`\`\`

## Pick<T, K> — selecciona propiedades
\`\`\`typescript
type UserName = Pick<User, "name">;
// { name: string }
\`\`\`

## Omit<T, K> — excluye propiedades
\`\`\`typescript
type WithoutAge = Omit<User, "age">;
// { name: string }
\`\`\`

## Record<K, V>
\`\`\`typescript
type Roles = Record<string, string[]>;
const permisos: Roles = {
  admin: ["read", "write", "delete"],
  user: ["read"]
};
\`\`\`

## Extract & Exclude
\`\`\`typescript
type T = "a" | "b" | "c" | "d";
type OnlyAB = Extract<T, "a" | "b">; // "a" | "b"
type NoAB = Exclude<T, "a" | "b">;   // "c" | "d"
\`\`\`

## NonNullable<T>
\`\`\`typescript
type Maybe = string | null | undefined;
type Sure = NonNullable<Maybe>; // string
\`\`\`

## ReturnType<T> & Parameters<T>
\`\`\`typescript
function getUser(id: number, active: boolean) {
  return { name: "Ana", age: 25 };
}
type UserType = ReturnType<typeof getUser>; // { name: string; age: number }
type Params = Parameters<typeof getUser>;   // [number, boolean]
\`\`\``,
        exercise: {
          prompt: "Dado el type `Config { host: string; port: number; debug: boolean; }`, crea: 1) Un type `ConfigParcial` usando Partial, 2) Un type `ConfigServer` usando Pick con solo host y port.",
          starterCode: `type Config = {\n  host: string;\n  port: number;\n  debug: boolean;\n};\n\n// Define ConfigParcial y ConfigServer aquí\n`,
          solution: `type Config = {\n  host: string;\n  port: number;\n  debug: boolean;\n};\n\ntype ConfigParcial = Partial<Config>;\ntype ConfigServer = Pick<Config, "host" | "port">;`,
          tests: [
            "(() => { const c: ConfigParcial = {}; return true; })()",
            "(() => { const s: ConfigServer = { host: 'localhost', port: 3000 }; return s.host === 'localhost'; })()"
          ],
          hints: ["Partial<T> hace todas las props opcionales", "Pick<T, 'key1' | 'key2'> selecciona propiedades"]
        },
        flashcards: [
          { front: "¿Qué hace Partial<T>?", back: "Hace todas las propiedades de T opcionales." },
          { front: "¿Diferencia entre Pick y Omit?", back: "Pick selecciona propiedades a incluir. Omit selecciona propiedades a excluir." },
          { front: "¿Qué hace Record<K, V>?", back: "Crea un type objeto con keys de tipo K y values de tipo V." },
          { front: "¿Diferencia entre Extract y Exclude?", back: "Extract mantiene los miembros de la union que matchean. Exclude los elimina." },
          { front: "¿Qué retorna Parameters<typeof fn>?", back: "Una tupla con los tipos de los parámetros de la función." }
        ]
      },
      {
        id: "conditional-mapped",
        title: "Conditional & Mapped Types",
        description: "Tipos condicionales y mapeados",
        content: `# Conditional Types

Tipos que dependen de una condición:

\`\`\`typescript
type EsString<T> = T extends string ? "sí" : "no";

type A = EsString<string>;  // "sí"
type B = EsString<number>;  // "no"
\`\`\`

## Distributive Conditionals
Con unions, se aplica a **cada miembro**:

\`\`\`typescript
type ToArray<T> = T extends any ? T[] : never;
type Result = ToArray<string | number>;
// string[] | number[]  (NO (string | number)[])
\`\`\`

## infer
Extraer tipos dentro de condiciones:

\`\`\`typescript
type ElementoDeArray<T> = T extends (infer U)[] ? U : never;
type X = ElementoDeArray<string[]>; // string

type RetornoFn<T> = T extends (...args: any[]) => infer R ? R : never;
type Y = RetornoFn<() => number>; // number

// Extraer tipo de una Promise
type Awaited<T> = T extends Promise<infer U> ? U : T;
type Z = Awaited<Promise<string>>; // string
\`\`\`

## Mapped Types
Transformar cada propiedad de un tipo:

\`\`\`typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Con modificadores
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]; // quita readonly
};

type Requerido<T> = {
  [K in keyof T]-?: T[K]; // quita optional
};
\`\`\`

## Key Remapping (TS 4.1+)
\`\`\`typescript
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};

interface User { name: string; age: number; }
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }
\`\`\`

## Template Literal Types
\`\`\`typescript
type Evento = "click" | "focus" | "blur";
type Handler = \`on\${Capitalize<Evento>}\`;
// "onClick" | "onFocus" | "onBlur"
\`\`\``,
        exercise: {
          prompt: "Crea un conditional type `Aplanar<T>` que: si T es un array, retorne el tipo del elemento; si no, retorne T tal cual. Ejemplo: Aplanar<string[]> → string, Aplanar<number> → number.",
          starterCode: `// Define el type Aplanar aquí\n`,
          solution: `type Aplanar<T> = T extends (infer U)[] ? U : T;`,
          tests: [
            "(() => { const x = 'test'; return typeof x === 'string'; })()",
            "(() => { const x = 42; return typeof x === 'number'; })()"
          ],
          hints: ["Usa T extends (infer U)[] ? ... : ...", "infer U captura el tipo del elemento del array"]
        },
        flashcards: [
          { front: "¿Qué es un Conditional Type?", back: "T extends U ? X : Y — retorna X si T extiende U, sino Y." },
          { front: "¿Qué hace infer en un conditional type?", back: "Extrae/captura un tipo dentro del patrón de la condición." },
          { front: "¿Qué es un Mapped Type?", back: "{ [K in keyof T]: ... } — transforma cada propiedad de T." },
          { front: "¿Qué hace -readonly en un mapped type?", back: "Quita el modificador readonly de cada propiedad." },
          { front: "¿Qué es Key Remapping?", back: "Renombrar keys en mapped types con 'as': [K in keyof T as `get${K}`]" }
        ]
      },
      {
        id: "type-guards",
        title: "Type Guards & Narrowing",
        description: "Narrowing avanzado con type guards",
        content: `# Type Guards y Narrowing

## typeof
\`\`\`typescript
function procesar(val: string | number) {
  if (typeof val === "string") {
    return val.toUpperCase(); // TypeScript sabe: string
  }
  return val * 2; // TypeScript sabe: number
}
\`\`\`

## in operator
\`\`\`typescript
type Pez = { nadar: () => void };
type Pajaro = { volar: () => void };

function mover(animal: Pez | Pajaro) {
  if ("nadar" in animal) {
    animal.nadar(); // narrowed a Pez
  } else {
    animal.volar(); // narrowed a Pajaro
  }
}
\`\`\`

## instanceof
\`\`\`typescript
class ApiError extends Error { status: number = 500; }
class ValidationError extends Error { fields: string[] = []; }

function handleError(err: Error) {
  if (err instanceof ApiError) {
    console.log(err.status); // narrowed
  } else if (err instanceof ValidationError) {
    console.log(err.fields); // narrowed
  }
}
\`\`\`

## Custom Type Guards
\`\`\`typescript
function isString(val: unknown): val is string {
  return typeof val === "string";
}

function esPez(animal: Pez | Pajaro): animal is Pez {
  return "nadar" in animal;
}
\`\`\`

## Discriminated Unions
\`\`\`typescript
type Forma =
  | { tipo: "circulo"; radio: number }
  | { tipo: "rectangulo"; ancho: number; alto: number }
  | { tipo: "triangulo"; base: number; altura: number };

function area(forma: Forma): number {
  switch (forma.tipo) {
    case "circulo": return Math.PI * forma.radio ** 2;
    case "rectangulo": return forma.ancho * forma.alto;
    case "triangulo": return (forma.base * forma.altura) / 2;
  }
}
\`\`\`

## Exhaustiveness Checking
\`\`\`typescript
function assertNever(x: never): never {
  throw new Error("Caso no manejado: " + x);
}

function area2(forma: Forma): number {
  switch (forma.tipo) {
    case "circulo": return Math.PI * forma.radio ** 2;
    case "rectangulo": return forma.ancho * forma.alto;
    case "triangulo": return (forma.base * forma.altura) / 2;
    default: return assertNever(forma); // ❌ Error si falta un case
  }
}
\`\`\``,
        exercise: {
          prompt: "Crea un discriminated union type `Notificacion` con tres variantes: { tipo: \"email\", asunto: string }, { tipo: \"sms\", telefono: string }, { tipo: \"push\", titulo: string }. Crea una función `describir` que retorne un string describiendo cada tipo.",
          starterCode: `// Define el type y la función aquí\n`,
          solution: `type Notificacion =\n  | { tipo: "email"; asunto: string }\n  | { tipo: "sms"; telefono: string }\n  | { tipo: "push"; titulo: string };\n\nfunction describir(n: Notificacion): string {\n  switch (n.tipo) {\n    case "email": return "Email: " + n.asunto;\n    case "sms": return "SMS a: " + n.telefono;\n    case "push": return "Push: " + n.titulo;\n  }\n}`,
          tests: [
            "describir({ tipo: 'email', asunto: 'Hola' }).includes('Hola')",
            "describir({ tipo: 'sms', telefono: '123' }).includes('123')",
            "describir({ tipo: 'push', titulo: 'Alerta' }).includes('Alerta')"
          ],
          hints: ["Usa un campo común 'tipo' para discriminar", "switch(n.tipo) para manejar cada variante"]
        },
        flashcards: [
          { front: "¿Qué es Type Narrowing?", back: "El proceso por el cual TypeScript reduce un tipo amplio a uno más específico dentro de un bloque de código." },
          { front: "¿Qué es un custom type guard?", back: "Una función con retorno `param is Tipo` que le dice a TS cómo narrowear un tipo." },
          { front: "¿Qué es un Discriminated Union?", back: "Un union type donde cada variante tiene una propiedad literal común (discriminante)." },
          { front: "¿Qué es Exhaustiveness Checking?", back: "Usar never en el default de un switch para que TS te avise si olvidaste un caso." }
        ]
      },
      {
        id: "type-challenges",
        title: "Type-Level Programming",
        description: "Tipos recursivos y type challenges",
        content: `# Type-Level Programming

## Recursive Types
\`\`\`typescript
type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };
\`\`\`

## Deep Readonly
\`\`\`typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};
\`\`\`

## Deep Partial
\`\`\`typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};
\`\`\`

## Tuple Manipulation
\`\`\`typescript
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;
type Tail<T extends any[]> = T extends [any, ...infer R] ? R : never;

type A = First<[1, 2, 3]>; // 1
type B = Last<[1, 2, 3]>;  // 3
type C = Tail<[1, 2, 3]>;  // [2, 3]
\`\`\`

## String Manipulation Types
\`\`\`typescript
type CamelToSnake<S extends string> = S extends \`\${infer C}\${infer Rest}\`
  ? C extends Uppercase<C>
    ? \`_\${Lowercase<C>}\${CamelToSnake<Rest>}\`
    : \`\${C}\${CamelToSnake<Rest>}\`
  : S;

type Result = CamelToSnake<"helloWorld">; // "hello_world"
\`\`\`

## Conditional Chaining
\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;
type IsString<T> = T extends string ? true : false;
type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends any[] ? "array" :
  T extends (...args: any[]) => any ? "function" :
  "object";
\`\`\``,
        exercise: {
          prompt: "Crea un type `Last<T>` que extraiga el último elemento de una tupla. Last<[1, 2, 3]> debe ser 3. Last<['a', 'b']> debe ser 'b'. Luego crea una variable `test` de tipo Last<[boolean, string, number]> con valor 42.",
          starterCode: `// Define el type aquí\n`,
          solution: `type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;\n\nconst test: Last<[boolean, string, number]> = 42;`,
          tests: [
            "test === 42",
            "typeof test === 'number'"
          ],
          hints: ["Usa variadic tuple: T extends [...any[], infer L]", "infer L captura el último elemento"]
        },
        flashcards: [
          { front: "¿Qué son los Recursive Types?", back: "Tipos que se referencian a sí mismos, como Json que puede contener Json[]." },
          { front: "¿Cómo extraer el primer elemento de una tupla?", back: "type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never" },
          { front: "¿Qué son los variadic tuple types?", back: "Permiten usar ...spread en tipos de tupla: [infer F, ...infer Rest]" },
          { front: "¿Cómo crear DeepPartial?", back: "Mapped type recursivo: si T[K] extends object, aplica DeepPartial recursivamente." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 7: TS + REACT PATTERNS
  // ─────────────────────────────────────────────
  {
    id: "react-patterns",
    title: "TS + React",
    emoji: "⚛️",
    level: "advanced",
    lessons: [
      {
        id: "react-components",
        title: "Componentes Tipados",
        description: "Props, children y eventos en React",
        content: `# Componentes React con TypeScript

## Props básicas
\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
\`\`\`

## Children
\`\`\`typescript
interface CardProps {
  title: string;
  children: React.ReactNode; // cualquier JSX válido
}

// Para solo un hijo:
interface WrapperProps {
  children: React.ReactElement; // solo un elemento React
}

// PropsWithChildren helper:
type LayoutProps = React.PropsWithChildren<{
  sidebar: React.ReactNode;
}>;
\`\`\`

## Eventos
\`\`\`typescript
function Form() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.clientX, e.clientY);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
\`\`\`

## Refs tipados
\`\`\`typescript
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    videoRef.current?.play();
  };

  return <video ref={videoRef} />;
}
\`\`\``,
        exercise: {
          prompt: "Crea una interface `AlertProps` con: message (string), type ('success' | 'error' | 'warning'), onDismiss (función sin parámetros ni retorno), y closable (boolean, opcional, default true). Crea un objeto `testAlert` que cumpla con la interface.",
          starterCode: `// Define la interface y el objeto aquí\n`,
          solution: `interface AlertProps {\n  message: string;\n  type: "success" | "error" | "warning";\n  onDismiss: () => void;\n  closable?: boolean;\n}\n\nconst testAlert: AlertProps = {\n  message: "Operación exitosa",\n  type: "success",\n  onDismiss: () => {}\n};`,
          tests: [
            "testAlert.message === 'Operación exitosa'",
            "testAlert.type === 'success' && typeof testAlert.onDismiss === 'function'"
          ],
          hints: ["Usa literal union para type: 'success' | 'error' | 'warning'", "onDismiss es tipo () => void"]
        },
        flashcards: [
          { front: "¿Cuándo usar ReactNode vs ReactElement?", back: "ReactNode: cualquier cosa renderable (string, number, JSX, null). ReactElement: solo elementos JSX." },
          { front: "¿Tipo de un evento onChange de input?", back: "React.ChangeEvent<HTMLInputElement>" },
          { front: "¿Cómo tipar un useRef para un DOM element?", back: "useRef<HTMLDivElement>(null) — el genérico es el tipo del elemento HTML." }
        ]
      },
      {
        id: "react-hooks-typed",
        title: "Hooks Tipados",
        description: "useState, useReducer, useContext tipados",
        content: `# Hooks con TypeScript

## useState
\`\`\`typescript
// TypeScript lo infiere:
const [count, setCount] = useState(0); // number

// Cuando el tipo no se infiere:
const [user, setUser] = useState<User | null>(null);

// Array de items:
interface Todo { id: number; text: string; done: boolean; }
const [todos, setTodos] = useState<Todo[]>([]);
\`\`\`

## useReducer
\`\`\`typescript
type State = { count: number; loading: boolean };

type Action =
  | { type: "increment"; payload: number }
  | { type: "decrement"; payload: number }
  | { type: "setLoading"; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + action.payload };
    case "decrement":
      return { ...state, count: state.count - action.payload };
    case "setLoading":
      return { ...state, loading: action.payload };
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, loading: false });
dispatch({ type: "increment", payload: 5 });
\`\`\`

## useContext
\`\`\`typescript
interface ThemeContext {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeCtx = createContext<ThemeContext | null>(null);

function useTheme(): ThemeContext {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
\`\`\`

## Custom Hooks
\`\`\`typescript
function useToggle(initial: boolean = false): [boolean, () => void] {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// Hook genérico
function useArray<T>(initial: T[] = []) {
  const [items, setItems] = useState<T[]>(initial);

  return {
    items,
    push: (item: T) => setItems(prev => [...prev, item]),
    remove: (index: number) => setItems(prev => prev.filter((_, i) => i !== index)),
    clear: () => setItems([])
  };
}
\`\`\``,
        exercise: {
          prompt: "Crea un type `Action` como discriminated union con: { type: 'add', item: string }, { type: 'remove', index: number }, { type: 'clear' }. Crea una función `reducer` que reciba `state: string[]` y `action: Action` y retorne el nuevo string[].",
          starterCode: `// Define el type y la función aquí\n`,
          solution: `type Action =\n  | { type: "add"; item: string }\n  | { type: "remove"; index: number }\n  | { type: "clear" };\n\nfunction reducer(state: string[], action: Action): string[] {\n  switch (action.type) {\n    case "add": return [...state, action.item];\n    case "remove": return state.filter((_, i) => i !== action.index);\n    case "clear": return [];\n  }\n}`,
          tests: [
            "JSON.stringify(reducer(['a','b'], { type: 'add', item: 'c' })) === '[\"a\",\"b\",\"c\"]'",
            "JSON.stringify(reducer(['a','b','c'], { type: 'remove', index: 1 })) === '[\"a\",\"c\"]'",
            "reducer(['a','b'], { type: 'clear' }).length === 0"
          ],
          hints: ["Usa spread para add: [...state, action.item]", "Usa filter para remove: state.filter((_, i) => i !== action.index)"]
        },
        flashcards: [
          { front: "¿Cuándo se necesita el genérico en useState?", back: "Cuando el tipo no se puede inferir del valor inicial, ej: useState<User | null>(null)" },
          { front: "¿Cómo tipar useReducer?", back: "Tipando State y Action como discriminated union. El reducer recibe (state: State, action: Action): State" },
          { front: "¿Cómo hacer un custom hook genérico?", back: "function useArray<T>(initial: T[]) — el genérico se infiere del uso." }
        ]
      },
      {
        id: "react-advanced-patterns",
        title: "Patrones Avanzados React",
        description: "HOC, Render Props, Compound Components",
        content: `# Patrones Avanzados en React + TS

## Generic Components
\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  );
}

// Uso: TS infiere T de items
<List
  items={users}
  renderItem={(user) => <span>{user.name}</span>}
  keyExtractor={(user) => user.id}
/>
\`\`\`

## Polymorphic Components (as prop)
\`\`\`typescript
type BoxProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "children">;

function Box<C extends React.ElementType = "div">({
  as, children, ...props
}: BoxProps<C>) {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
}

<Box as="a" href="/home">Link</Box>
<Box as="button" onClick={() => {}}>Button</Box>
\`\`\`

## Discriminated Props
\`\`\`typescript
type ModalProps =
  | { variant: "alert"; message: string; onOk: () => void }
  | { variant: "confirm"; message: string; onYes: () => void; onNo: () => void }
  | { variant: "prompt"; message: string; onSubmit: (value: string) => void };

function Modal(props: ModalProps) {
  switch (props.variant) {
    case "alert": // props.onOk disponible
    case "confirm": // props.onYes, props.onNo disponibles
    case "prompt": // props.onSubmit disponible
  }
}
\`\`\`

## forwardRef tipado
\`\`\`typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      <label>{label}</label>
      <input ref={ref} {...props} />
      {error && <span>{error}</span>}
    </div>
  )
);
\`\`\``,
        exercise: {
          prompt: "Crea una interface genérica `SelectProps<T>` con: options (T[]), value (T), onChange ((value: T) => void), y getLabel ((item: T) => string). Luego crea un objeto testProps de tipo SelectProps<{id: number, name: string}>.",
          starterCode: `// Define la interface y el objeto aquí\n`,
          solution: `interface SelectProps<T> {\n  options: T[];\n  value: T;\n  onChange: (value: T) => void;\n  getLabel: (item: T) => string;\n}\n\nconst testProps: SelectProps<{id: number; name: string}> = {\n  options: [{id: 1, name: "A"}, {id: 2, name: "B"}],\n  value: {id: 1, name: "A"},\n  onChange: (v) => {},\n  getLabel: (item) => item.name\n};`,
          tests: [
            "testProps.options.length === 2",
            "testProps.getLabel({id: 1, name: 'Test'}) === 'Test'"
          ],
          hints: ["La interface es genérica: SelectProps<T>", "Todos los callbacks reciben/retornan T"]
        },
        flashcards: [
          { front: "¿Qué es un Generic Component?", back: "Un componente donde el tipo de los props es genérico: function List<T>(props: ListProps<T>)" },
          { front: "¿Qué es un Polymorphic Component?", back: "Un componente que acepta una prop 'as' para cambiar el elemento HTML/componente que renderiza." },
          { front: "¿Cómo se tipa forwardRef?", back: "forwardRef<HTMLElement, Props>((props, ref) => ...) — primer genérico es el ref, segundo los props." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 8: REAL WORLD PATTERNS
  // ─────────────────────────────────────────────
  {
    id: "patterns",
    title: "Patrones del Mundo Real",
    emoji: "🏆",
    level: "advanced",
    lessons: [
      {
        id: "error-handling",
        title: "Manejo de Errores Tipado",
        description: "Result pattern, custom errors, error boundaries",
        content: `# Manejo de Errores Tipado

## El problema con try/catch
\`\`\`typescript
try {
  const data = JSON.parse(input);
} catch (e) {
  // e es 'unknown' en TS 4.4+ — hay que narrowear
  if (e instanceof SyntaxError) {
    console.log(e.message);
  }
}
\`\`\`

## Result Type Pattern
\`\`\`typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) return { success: false, error: "División por cero" };
  return { success: true, data: a / b };
}

const result = divide(10, 2);
if (result.success) {
  console.log(result.data); // 5
} else {
  console.log(result.error); // solo accesible si success === false
}
\`\`\`

## Custom Error Classes
\`\`\`typescript
class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "AppError";
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(\`\${resource} no encontrado\`, "NOT_FOUND", 404);
  }
}

class ValidationError extends AppError {
  constructor(public fields: Record<string, string>) {
    super("Error de validación", "VALIDATION", 400);
  }
}
\`\`\`

## Type-safe Event Emitter
\`\`\`typescript
type EventMap = {
  login: { userId: string; timestamp: Date };
  logout: { userId: string };
  error: { message: string; code: number };
};

class TypedEmitter<T extends Record<string, any>> {
  private handlers: Partial<{ [K in keyof T]: ((data: T[K]) => void)[] }> = {};

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void): void {
    if (!this.handlers[event]) this.handlers[event] = [];
    this.handlers[event]!.push(handler);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    this.handlers[event]?.forEach(h => h(data));
  }
}

const emitter = new TypedEmitter<EventMap>();
emitter.on("login", (data) => console.log(data.userId)); // TS sabe el tipo
\`\`\``,
        exercise: {
          prompt: "Crea un type `Result<T>` que sea { ok: true, value: T } | { ok: false, error: string }. Crea una función `safeDivide(a: number, b: number): Result<number>` que retorne error si b === 0, o el resultado si no.",
          starterCode: `// Define el type y la función aquí\n`,
          solution: `type Result<T> = { ok: true; value: T } | { ok: false; error: string };\n\nfunction safeDivide(a: number, b: number): Result<number> {\n  if (b === 0) return { ok: false, error: "División por cero" };\n  return { ok: true, value: a / b };\n}`,
          tests: [
            "safeDivide(10, 2).ok === true && safeDivide(10, 2).value === 5",
            "safeDivide(10, 0).ok === false"
          ],
          hints: ["Result es un discriminated union con 'ok' como discriminante", "Retorna el objeto literal con la forma correcta según el caso"]
        },
        flashcards: [
          { front: "¿Por qué usar Result<T> en vez de throw?", back: "Fuerza al caller a manejar el error explícitamente. Es type-safe y no rompe el flujo." },
          { front: "¿Qué tipo tiene 'e' en un catch block?", back: "unknown (desde TS 4.4). Hay que narrowear con instanceof antes de usarlo." },
          { front: "¿Qué es un TypedEmitter?", back: "Un event emitter genérico donde los eventos y sus payloads están tipados con un Record." }
        ]
      },
      {
        id: "branded-types",
        title: "Branded Types & Validation",
        description: "Tipos nominales y validación en compile-time",
        content: `# Branded Types

TypeScript usa **tipado estructural**: si la forma coincide, es el mismo tipo. Esto a veces es un problema:

\`\`\`typescript
type UserId = string;
type OrderId = string;

function getUser(id: UserId) { /* ... */ }
const orderId: OrderId = "order-123";
getUser(orderId); // ✅ No da error, pero es un bug!
\`\`\`

## Branded Types al rescate
\`\`\`typescript
type Brand<T, B extends string> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function createUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId) { /* ... */ }

const userId = createUserId("user-123");
getUser(userId); // ✅ OK

const orderId = "order-123" as OrderId;
// getUser(orderId); // ❌ Error: OrderId no es UserId
\`\`\`

## Validated Types
\`\`\`typescript
type Email = Brand<string, "Email">;
type PositiveNumber = Brand<number, "PositiveNumber">;

function validateEmail(input: string): Email | null {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(input) ? (input as Email) : null;
}

function validatePositive(n: number): PositiveNumber | null {
  return n > 0 ? (n as PositiveNumber) : null;
}

function sendEmail(to: Email, subject: string) {
  // 'to' está garantizado como email válido
}
\`\`\`

## Opaque Types Pattern
\`\`\`typescript
declare const __brand: unique symbol;

type Opaque<T, B> = T & { readonly [__brand]: B };

type USD = Opaque<number, "USD">;
type EUR = Opaque<number, "EUR">;

function usd(amount: number): USD { return amount as USD; }
function eur(amount: number): EUR { return amount as EUR; }

function addUSD(a: USD, b: USD): USD {
  return (a + b) as USD;
}

// addUSD(usd(10), eur(20)); // ❌ No se puede mezclar monedas!
\`\`\``,
        exercise: {
          prompt: "Crea un branded type `NonEmptyString` (string con brand). Crea una función `validate(s: string): NonEmptyString | null` que retorne null si el string está vacío, o el branded type si no. Crea una función `greet(name: NonEmptyString): string` que retorne \"Hola, \" + name.",
          starterCode: `// Define los types y funciones aquí\n`,
          solution: `type NonEmptyString = string & { __brand: "NonEmptyString" };\n\nfunction validate(s: string): NonEmptyString | null {\n  return s.length > 0 ? (s as NonEmptyString) : null;\n}\n\nfunction greet(name: NonEmptyString): string {\n  return "Hola, " + name;\n}`,
          tests: [
            "validate('') === null",
            "validate('Sebas') !== null && greet(validate('Sebas')) === 'Hola, Sebas'"
          ],
          hints: ["Branded type: type X = string & { __brand: 'X' }", "Castea con 'as' solo después de validar"]
        },
        flashcards: [
          { front: "¿Qué son los Branded Types?", back: "Tipos que añaden una 'marca' invisible para diferenciar tipos estructuralmente iguales (como UserId vs OrderId)." },
          { front: "¿Por qué TS necesita branded types?", back: "Porque usa tipado estructural: dos types con la misma estructura son compatibles, incluso si semánticamente no deberían serlo." },
          { front: "¿Cómo crear un branded type?", back: "type Brand<T, B> = T & { __brand: B }; luego type UserId = Brand<string, 'UserId'>" }
        ]
      },
      {
        id: "declaration-files",
        title: "Declaration Files & Config",
        description: ".d.ts, tsconfig, module augmentation",
        content: `# Declaration Files y Configuración

## ¿Qué es un .d.ts?
Un archivo de declaración describe los **tipos** de un módulo JS:

\`\`\`typescript
// types/analytics.d.ts
declare module "analytics" {
  interface Event {
    name: string;
    properties?: Record<string, unknown>;
  }

  export function track(event: Event): void;
  export function identify(userId: string): void;
}
\`\`\`

## Global Type Declarations
\`\`\`typescript
// global.d.ts
declare global {
  interface Window {
    __APP_VERSION__: string;
    analytics: {
      track: (event: string) => void;
    };
  }
}

export {}; // necesario para que sea un módulo
\`\`\`

## Module Augmentation
Extender tipos de librerías existentes:

\`\`\`typescript
// Extender Express Request
declare module "express" {
  interface Request {
    user?: {
      id: string;
      role: "admin" | "user";
    };
  }
}
\`\`\`

## tsconfig.json claves importantes
\`\`\`typescript
{
  "compilerOptions": {
    "strict": true,          // activa todos los strict checks
    "noUncheckedIndexedAccess": true, // arr[0] es T | undefined
    "exactOptionalPropertyTypes": true, // undefined ≠ optional
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,

    // Módulos
    "moduleResolution": "bundler", // modern
    "esModuleInterop": true,
    "isolatedModules": true,

    // Paths
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
\`\`\`

## satisfies Operator (TS 4.9+)
\`\`\`typescript
type Color = "red" | "green" | "blue";
type ColorMap = Record<Color, string | number[]>;

const palette = {
  red: "#FF0000",
  green: [0, 255, 0],
  blue: "#0000FF"
} satisfies ColorMap;

// palette.red es string (no string | number[])
// Valida contra ColorMap PERO preserva el tipo estrecho
\`\`\``,
        exercise: {
          prompt: "Crea un type `Theme` con propiedades: primary (string), secondary (string), fontSize ('sm' | 'md' | 'lg'). Crea un objeto `myTheme` usando `satisfies Theme` para que TS valide la estructura pero preserve los tipos literales.",
          starterCode: `// Define el type y el objeto aquí\n`,
          solution: `type Theme = {\n  primary: string;\n  secondary: string;\n  fontSize: "sm" | "md" | "lg";\n};\n\nconst myTheme = {\n  primary: "#3B82F6",\n  secondary: "#6366F1",\n  fontSize: "md" as const\n} satisfies Theme;`,
          tests: [
            "myTheme.primary === '#3B82F6'",
            "myTheme.fontSize === 'md'"
          ],
          hints: ["satisfies valida sin ampliar el tipo", "Necesitas 'as const' en fontSize para preservar el literal"]
        },
        flashcards: [
          { front: "¿Qué es un archivo .d.ts?", back: "Un archivo de declaración que describe los tipos de un módulo JS sin implementación." },
          { front: "¿Qué hace 'satisfies'?", back: "Valida que un valor cumple con un tipo PERO preserva el tipo más estrecho del valor." },
          { front: "¿Qué hace strict: true en tsconfig?", back: "Activa todos los checks estrictos: noImplicitAny, strictNullChecks, strictFunctionTypes, etc." },
          { front: "¿Cómo extender tipos de una librería?", back: "Module augmentation: declare module 'librería' { interface Existente { nuevaProp: tipo } }" }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 9: DECORATORS
  // ─────────────────────────────────────────────
  {
    id: "decorators",
    title: "Decorators",
    emoji: "🎭",
    level: "expert",
    lessons: [
      {
        id: "decorators-intro",
        title: "Intro a Decorators",
        description: "Qué son, cómo funcionan, Stage 3 vs legacy",
        content: `# Decorators en TypeScript

Un **decorator** es una función especial que se puede adjuntar a clases, métodos, propiedades o parámetros para **modificar o extender su comportamiento**.

## Habilitarlos en tsconfig
\`\`\`typescript
{
  "compilerOptions": {
    "experimentalDecorators": true, // legacy decorators
    // o para Stage 3 (TS 5.0+): no necesita flag
  }
}
\`\`\`

## Decorator básico de clase
\`\`\`typescript
function Sellado(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sellado
class Vehiculo {
  marca: string;
  constructor(marca: string) {
    this.marca = marca;
  }
}
\`\`\`

## Stage 3 Decorators (TS 5.0+)
La nueva sintaxis estandarizada:

\`\`\`typescript
function logged<T extends new (...args: any[]) => any>(
  target: T,
  context: ClassDecoratorContext
) {
  return class extends target {
    constructor(...args: any[]) {
      super(...args);
      console.log(\`Instancia de \${context.name} creada\`);
    }
  };
}

@logged
class MiServicio {
  ejecutar() { return "hecho"; }
}
\`\`\`

## Orden de ejecución
Los decorators se ejecutan de **abajo hacia arriba** (bottom-up):

\`\`\`typescript
@primero
@segundo
@tercero
class MiClase {}
// Ejecución: tercero → segundo → primero
\`\`\`

## Decorator vs HOC (React)
\`\`\`typescript
// Decorator (class-based)
@withAuth
class AdminPage { }

// HOC (function-based, React pattern)
const AdminPage = withAuth(BaseAdminPage);
// Ambos son el mismo concepto: wrapping
\`\`\``,
        exercise: {
          prompt: "Crea una función `registrar` que actúe como decorator de clase: recibe un constructor y loguea \"Clase registrada: [nombre]\". Luego aplícalo a una clase `Servicio` usando @ syntax. (Nota: como el playground ejecuta JS, simula el decorator llamándolo manualmente).",
          starterCode: `// Simula el decorator (el playground no soporta @ syntax)\nfunction registrar(constructor) {\n  // Tu código aquí\n}\n\nclass Servicio {\n  ejecutar() { return "ok"; }\n}\n\n// Aplica manualmente:\nregistrar(Servicio);\n`,
          solution: `function registrar(constructor) {\n  console.log("Clase registrada: " + constructor.name);\n}\n\nclass Servicio {\n  ejecutar() { return "ok"; }\n}\n\nregistrar(Servicio);`,
          tests: [
            "typeof registrar === 'function'",
            "new Servicio().ejecutar() === 'ok'"
          ],
          hints: ["constructor.name te da el nombre de la clase", "Un decorator de clase recibe el constructor como argumento"]
        },
        flashcards: [
          { front: "¿Qué es un Decorator?", back: "Una función especial que modifica o extiende el comportamiento de clases, métodos, propiedades o parámetros." },
          { front: "¿Qué flag habilita decorators legacy?", back: "experimentalDecorators: true en tsconfig.json" },
          { front: "¿En qué orden se ejecutan múltiples decorators?", back: "De abajo hacia arriba (bottom-up): el más cercano a la clase se ejecuta primero." },
          { front: "¿Qué cambió en Stage 3 Decorators (TS 5.0)?", back: "Nueva API estandarizada con ClassDecoratorContext, no necesita flag experimental." }
        ]
      },
      {
        id: "method-decorators",
        title: "Method & Property Decorators",
        description: "Decorators de métodos, accessors y propiedades",
        content: `# Method Decorators

## Decorator de método
Recibe el target, el nombre del método y el property descriptor:

\`\`\`typescript
function Log(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(\`Llamando \${propertyKey} con args:\`, args);
    const result = original.apply(this, args);
    console.log(\`\${propertyKey} retornó:\`, result);
    return result;
  };
}

class Calculadora {
  @Log
  sumar(a: number, b: number): number {
    return a + b;
  }
}
\`\`\`

## Decorator de medición de performance
\`\`\`typescript
function MedirTiempo(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = original.apply(this, args);
    const end = performance.now();
    console.log(\`\${key} tomó \${(end - start).toFixed(2)}ms\`);
    return result;
  };
}
\`\`\`

## Property Decorator
\`\`\`typescript
function MinLength(min: number) {
  return function (target: any, propertyKey: string) {
    let value: string;

    Object.defineProperty(target, propertyKey, {
      get: () => value,
      set: (newVal: string) => {
        if (newVal.length < min) {
          throw new Error(\`\${propertyKey} debe tener al menos \${min} caracteres\`);
        }
        value = newVal;
      }
    });
  };
}

class Usuario {
  @MinLength(3)
  nombre: string = "";
}
\`\`\`

## Accessor Decorator
\`\`\`typescript
function Inmutable(
  target: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  descriptor.set = undefined; // quita el setter
}

class Config {
  private _version = "1.0";

  @Inmutable
  get version() { return this._version; }
  set version(v: string) { this._version = v; }
}
\`\`\``,
        exercise: {
          prompt: "Crea una función `memoize` que actúe como decorator de método: cachea resultados basándose en los argumentos (usa JSON.stringify de args como key). Simúlalo aplicándolo a un método de una clase Calculator.",
          starterCode: `function memoize(target, key, descriptor) {\n  const cache = {};\n  const original = descriptor.value;\n  // Tu código aquí: modifica descriptor.value\n  // para que cachee resultados\n}\n\nclass Calculator {\n  callCount = 0;\n\n  factorial(n) {\n    this.callCount++;\n    if (n <= 1) return 1;\n    return n * this.factorial(n - 1);\n  }\n}\n\n// Aplica memoize manualmente\nconst desc = Object.getOwnPropertyDescriptor(Calculator.prototype, 'factorial');\nmemoize(Calculator.prototype, 'factorial', desc);\nObject.defineProperty(Calculator.prototype, 'factorial', desc);\n\nconst calc = new Calculator();\n`,
          solution: `function memoize(target, key, descriptor) {\n  const cache = {};\n  const original = descriptor.value;\n  descriptor.value = function (...args) {\n    const cacheKey = JSON.stringify(args);\n    if (cache[cacheKey] !== undefined) return cache[cacheKey];\n    const result = original.apply(this, args);\n    cache[cacheKey] = result;\n    return result;\n  };\n}\n\nclass Calculator {\n  callCount = 0;\n\n  factorial(n) {\n    this.callCount++;\n    if (n <= 1) return 1;\n    return n * this.factorial(n - 1);\n  }\n}\n\nconst desc = Object.getOwnPropertyDescriptor(Calculator.prototype, 'factorial');\nmemoize(Calculator.prototype, 'factorial', desc);\nObject.defineProperty(Calculator.prototype, 'factorial', desc);\n\nconst calc = new Calculator();`,
          tests: [
            "calc.factorial(5) === 120",
            "calc.factorial(5) === 120"
          ],
          hints: ["Usa JSON.stringify(args) como cache key", "descriptor.value = function(...args) { ... } para reemplazar el método"]
        },
        flashcards: [
          { front: "¿Qué recibe un Method Decorator?", back: "target (prototype), propertyKey (nombre del método), descriptor (PropertyDescriptor)." },
          { front: "¿Cómo se preserva el 'this' en un method decorator?", back: "Usando function regular (no arrow) y original.apply(this, args)." },
          { front: "¿Qué es un Property Decorator?", back: "Un decorator que se aplica a propiedades de clase. Recibe target y propertyKey (sin descriptor)." },
          { front: "¿Cómo funciona un Accessor Decorator?", back: "Se aplica a getters/setters. Recibe el mismo triple que method decorators pero el descriptor tiene get/set." }
        ]
      },
      {
        id: "decorator-factories",
        title: "Decorator Factories & Composition",
        description: "Factories paramétricos y composición",
        content: `# Decorator Factories

Un factory es una **función que retorna un decorator**, permitiendo pasar parámetros:

## Factory básico
\`\`\`typescript
function Rol(rol: string) {
  return function (constructor: Function) {
    constructor.prototype.rol = rol;
  };
}

@Rol("admin")
class AdminController {}

@Rol("user")
class UserController {}
\`\`\`

## Validación con factories
\`\`\`typescript
function Rango(min: number, max: number) {
  return function (target: any, key: string) {
    let value: number;
    Object.defineProperty(target, key, {
      get: () => value,
      set: (v: number) => {
        if (v < min || v > max) {
          throw new Error(\`\${key} debe estar entre \${min} y \${max}\`);
        }
        value = v;
      }
    });
  };
}

class Producto {
  @Rango(0, 10000)
  precio: number = 0;

  @Rango(0, 100)
  descuento: number = 0;
}
\`\`\`

## Metadata con decorators
\`\`\`typescript
const metadata = new Map<string, any>();

function Controller(prefix: string) {
  return function (constructor: Function) {
    metadata.set(constructor.name, {
      prefix,
      routes: metadata.get(constructor.name)?.routes || []
    });
  };
}

function Get(path: string) {
  return function (target: any, key: string) {
    const className = target.constructor.name;
    const existing = metadata.get(className) || { routes: [] };
    existing.routes.push({ method: "GET", path, handler: key });
    metadata.set(className, existing);
  };
}

@Controller("/api/users")
class UserController {
  @Get("/")
  listar() { return []; }

  @Get("/:id")
  obtener() { return {}; }
}
// metadata contiene las rutas registradas
\`\`\`

## Composición de decorators
\`\`\`typescript
function compose(...decorators: MethodDecorator[]): MethodDecorator {
  return (target, key, descriptor) => {
    for (const decorator of decorators.reverse()) {
      decorator(target, key, descriptor);
    }
  };
}

class Api {
  @compose(Log, MedirTiempo, Cacheable(60))
  fetchData() { /* ... */ }
}
\`\`\`

## Pattern: Dependency Injection
\`\`\`typescript
const container = new Map<string, any>();

function Injectable(constructor: Function) {
  container.set(constructor.name, new (constructor as any)());
}

function Inject(serviceName: string) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      get: () => container.get(serviceName),
      enumerable: true
    });
  };
}

@Injectable
class LogService {
  log(msg: string) { console.log("[LOG]", msg); }
}

class App {
  @Inject("LogService")
  logger!: LogService;
}
\`\`\``,
        exercise: {
          prompt: "Crea un decorator factory `Retry(times: number)` que, cuando se aplica a un método, reintente la ejecución N veces si lanza un error. Si todos los intentos fallan, lanza el último error.",
          starterCode: `function Retry(times) {\n  return function(target, key, descriptor) {\n    const original = descriptor.value;\n    // Tu código: reemplaza descriptor.value\n    // con una versión que reintenta 'times' veces\n  };\n}\n\nclass Api {\n  intentos = 0;\n\n  fetch() {\n    this.intentos++;\n    if (this.intentos < 3) throw new Error("Fallo!");\n    return "Datos";\n  }\n}\n\nconst desc = Object.getOwnPropertyDescriptor(Api.prototype, 'fetch');\nRetry(5)(Api.prototype, 'fetch', desc);\nObject.defineProperty(Api.prototype, 'fetch', desc);\n\nconst api = new Api();\n`,
          solution: `function Retry(times) {\n  return function(target, key, descriptor) {\n    const original = descriptor.value;\n    descriptor.value = function (...args) {\n      let lastError;\n      for (let i = 0; i < times; i++) {\n        try {\n          return original.apply(this, args);\n        } catch (e) {\n          lastError = e;\n        }\n      }\n      throw lastError;\n    };\n  };\n}\n\nclass Api {\n  intentos = 0;\n\n  fetch() {\n    this.intentos++;\n    if (this.intentos < 3) throw new Error("Fallo!");\n    return "Datos";\n  }\n}\n\nconst desc = Object.getOwnPropertyDescriptor(Api.prototype, 'fetch');\nRetry(5)(Api.prototype, 'fetch', desc);\nObject.defineProperty(Api.prototype, 'fetch', desc);\n\nconst api = new Api();`,
          tests: [
            "api.fetch() === 'Datos'",
            "api.intentos === 3"
          ],
          hints: ["Usa un for loop con try/catch dentro", "Guarda el último error y si todos fallan, throw lastError"]
        },
        flashcards: [
          { front: "¿Qué es un Decorator Factory?", back: "Una función que recibe parámetros y retorna un decorator. Ejemplo: @Rol('admin') → Rol es el factory." },
          { front: "¿Para qué sirve Reflect.metadata?", back: "Para almacenar metadata asociada a clases/métodos, usado por frameworks como Angular y NestJS." },
          { front: "¿Qué es Dependency Injection con decorators?", back: "Un patrón donde @Injectable registra servicios y @Inject los inyecta automáticamente como propiedades." },
          { front: "¿Cómo componer múltiples decorators?", back: "Aplicándolos uno sobre otro (@A @B @C) o con una función compose() que los aplica en orden." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 10: TYPE SYSTEM DEEP DIVE
  // ─────────────────────────────────────────────
  {
    id: "type-system-deep",
    title: "Type System Profundo",
    emoji: "🧬",
    level: "expert",
    lessons: [
      {
        id: "variance",
        title: "Varianza de Tipos",
        description: "Covarianza, contravarianza y bivarianza",
        content: `# Varianza de Tipos

La varianza describe cómo la relación de subtipo entre tipos simples se traslada a tipos compuestos.

## Covarianza (out)
El subtipo se preserva: si Dog extends Animal, entonces Dog[] es subtipo de Animal[].

\`\`\`typescript
class Animal { nombre = "animal"; }
class Perro extends Animal { raza = "labrador"; }

// Arrays son covariantes en TS:
const perros: Perro[] = [new Perro()];
const animales: Animal[] = perros; // ✅ OK
\`\`\`

## Contravarianza (in)
La relación se **invierte** en parámetros de función (con strictFunctionTypes):

\`\`\`typescript
type Handler<T> = (item: T) => void;

const handleAnimal: Handler<Animal> = (a) => console.log(a.nombre);
const handlePerro: Handler<Perro> = (p) => console.log(p.raza);

// Con strictFunctionTypes:
const test: Handler<Perro> = handleAnimal; // ✅ OK (contravariante)
// const test2: Handler<Animal> = handlePerro; // ❌ Error
\`\`\`

## TS 4.7+: Anotaciones explícitas de varianza
\`\`\`typescript
interface Producer<out T> {
  produce(): T;         // T en posición de output → covariante
}

interface Consumer<in T> {
  consume(item: T): void; // T en posición de input → contravariante
}

interface Transformer<in T, out U> {
  transform(input: T): U; // T contravariante, U covariante
}
\`\`\`

## Bivarianza (el default sin strict)
Sin \`strictFunctionTypes\`, TS trata las funciones como **bivariantes** (acepta ambas direcciones). Esto es unsound pero pragmático para event handlers del DOM.

## Invarianza
Cuando un tipo aparece tanto en posición de input como output:

\`\`\`typescript
interface Caja<in out T> {
  get(): T;       // output (covariante)
  set(val: T): void; // input (contravariante)
  // Combinados → invariante: solo acepta el tipo exacto
}
\`\`\``,
        exercise: {
          prompt: "Crea una interface `ReadonlyBox<out T>` (covariante) con método `get(): T`, y una interface `WriteBox<in T>` (contravariante) con método `set(val: T): void`. Crea un objeto de tipo ReadonlyBox<string> y otro de tipo WriteBox<string>.",
          starterCode: `// Define las interfaces y objetos aquí\n// Nota: usa comentarios para las anotaciones in/out\n// ya que el playground no las soporta\n`,
          solution: `// ReadonlyBox es covariante en T (out)\nconst readBox = {\n  get() { return "hola"; }\n};\n\n// WriteBox es contravariante en T (in)\nconst writeBox = {\n  set(val) { console.log("Set:", val); }\n};`,
          tests: [
            "readBox.get() === 'hola'",
            "typeof writeBox.set === 'function'"
          ],
          hints: ["Covariante = T solo aparece en retornos (output)", "Contravariante = T solo aparece en parámetros (input)"]
        },
        flashcards: [
          { front: "¿Qué es covarianza?", back: "Si A extends B, entonces Container<A> extends Container<B>. El subtipo se preserva. Ejemplo: arrays." },
          { front: "¿Qué es contravarianza?", back: "Si A extends B, entonces Container<B> extends Container<A>. La relación se invierte. Ejemplo: parámetros de función." },
          { front: "¿Qué hacen 'in' y 'out' en genéricos (TS 4.7+)?", back: "'out T' = covariante (T en output). 'in T' = contravariante (T en input). 'in out T' = invariante." },
          { front: "¿Por qué importa strictFunctionTypes?", back: "Sin él, las funciones son bivariantes (unsound). Con él, son contravariantes en parámetros (correcto)." }
        ]
      },
      {
        id: "advanced-infer",
        title: "infer Avanzado",
        description: "Extracción profunda de tipos con infer",
        content: `# infer Avanzado

## Extraer tipos de funciones
\`\`\`typescript
type ParamsOf<T> = T extends (...args: infer P) => any ? P : never;
type ReturnOf<T> = T extends (...args: any[]) => infer R ? R : never;

type P = ParamsOf<(a: string, b: number) => void>; // [string, number]
type R = ReturnOf<(x: number) => string>;           // string
\`\`\`

## Extraer de Promises anidadas
\`\`\`typescript
type DeepAwaited<T> = T extends Promise<infer U>
  ? DeepAwaited<U>  // recursivo
  : T;

type A = DeepAwaited<Promise<Promise<Promise<string>>>>; // string
\`\`\`

## infer con template literals
\`\`\`typescript
type ParseRoute<T> = T extends \`\${string}:\${infer Param}/\${infer Rest}\`
  ? Param | ParseRoute<Rest>
  : T extends \`\${string}:\${infer Param}\`
  ? Param
  : never;

type Params = ParseRoute<"/api/:userId/posts/:postId">;
// "userId" | "postId"
\`\`\`

## infer con constraints (TS 4.7+)
\`\`\`typescript
type FirstString<T> = T extends [infer S extends string, ...any[]]
  ? S
  : never;

type A = FirstString<["hello", 42]>;  // "hello"
type B = FirstString<[42, "hello"]>;  // never (42 no es string)
\`\`\`

## Split recursivo
\`\`\`typescript
type Split<S extends string, D extends string> =
  S extends \`\${infer Head}\${D}\${infer Tail}\`
    ? [Head, ...Split<Tail, D>]
    : [S];

type Words = Split<"hello-world-foo", "-">;
// ["hello", "world", "foo"]
\`\`\`

## infer en posiciones condicionales
\`\`\`typescript
type GetArrayElementType<T> =
  T extends readonly (infer U)[] ? U : never;

type ValuesOf<T> = T extends Record<string, infer V> ? V : never;

type ConstructorParams<T> =
  T extends new (...args: infer P) => any ? P : never;

type InstanceOf<T> =
  T extends new (...args: any[]) => infer I ? I : never;
\`\`\``,
        exercise: {
          prompt: "Crea un type `ExtractPromise<T>` que extraiga el tipo interno de una Promise (incluso anidadas). ExtractPromise<Promise<Promise<number>>> debe ser number. Si no es Promise, retorna T.",
          starterCode: `// Define el type aquí\n`,
          solution: `type ExtractPromise<T> = T extends Promise<infer U> ? ExtractPromise<U> : T;`,
          tests: [
            "(() => { const x = 42; return typeof x === 'number'; })()",
            "(() => { const x = 'hello'; return typeof x === 'string'; })()"
          ],
          hints: ["Usa recursión: si T extends Promise<infer U>, aplica ExtractPromise<U>", "El caso base es cuando T no es una Promise"]
        },
        flashcards: [
          { front: "¿Cómo extraer params de una función con infer?", back: "T extends (...args: infer P) => any ? P : never" },
          { front: "¿Cómo hacer infer con constraints (TS 4.7)?", back: "[infer S extends string] — S se restringe a string." },
          { front: "¿Cómo parsear rutas con infer + template literals?", back: "T extends `${string}:${infer Param}/${infer Rest}` — extrae parámetros de la URL." },
          { front: "¿Cómo obtener el tipo de instancia de una clase?", back: "T extends new (...args: any[]) => infer I ? I : never" }
        ]
      },
      {
        id: "hkt-patterns",
        title: "Tipos Recursivos & HKT",
        description: "Higher-Kinded Types simulados, tipos recursivos profundos",
        content: `# Tipos Recursivos y Higher-Kinded Types

## JSON Type recursivo
\`\`\`typescript
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };
\`\`\`

## DeepReadonly robusto
\`\`\`typescript
type Primitive = string | number | boolean | null | undefined | symbol | bigint;

type DeepReadonly<T> =
  T extends Primitive ? T :
  T extends Array<infer U> ? ReadonlyArray<DeepReadonly<U>> :
  T extends Map<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> :
  T extends Set<infer U> ? ReadonlySet<DeepReadonly<U>> :
  T extends Function ? T :
  { readonly [K in keyof T]: DeepReadonly<T[K]> };
\`\`\`

## Paths de un objeto (type-safe dot notation)
\`\`\`typescript
type Paths<T, Prefix extends string = ""> =
  T extends object
    ? {
        [K in keyof T & string]:
          | \`\${Prefix}\${K}\`
          | Paths<T[K], \`\${Prefix}\${K}.\`>
      }[keyof T & string]
    : never;

interface Config {
  db: { host: string; port: number };
  app: { name: string };
}

type ConfigPaths = Paths<Config>;
// "db" | "db.host" | "db.port" | "app" | "app.name"
\`\`\`

## Simulando Higher-Kinded Types (HKT)
TypeScript no soporta HKT nativamente, pero se pueden simular:

\`\`\`typescript
interface TypeMap {
  Array: Array<any>;
  Promise: Promise<any>;
  Set: Set<any>;
}

type Kind<F extends keyof TypeMap, A> =
  F extends "Array" ? Array<A> :
  F extends "Promise" ? Promise<A> :
  F extends "Set" ? Set<A> :
  never;

// Functor genérico
type Functor<F extends keyof TypeMap> = {
  map: <A, B>(fa: Kind<F, A>, f: (a: A) => B) => Kind<F, B>;
};
\`\`\`

## Type-safe Event System
\`\`\`typescript
type EventMap = {
  "user:login": { userId: string; timestamp: number };
  "user:logout": { userId: string };
  "item:created": { itemId: string; name: string };
};

type EventHandler<T extends keyof EventMap> = (payload: EventMap[T]) => void;

class TypedBus {
  private handlers = new Map<string, Function[]>();

  on<E extends keyof EventMap>(event: E, handler: EventHandler<E>): void {
    const list = this.handlers.get(event) || [];
    list.push(handler);
    this.handlers.set(event, list);
  }

  emit<E extends keyof EventMap>(event: E, payload: EventMap[E]): void {
    this.handlers.get(event)?.forEach(h => h(payload));
  }
}
\`\`\``,
        exercise: {
          prompt: "Crea un type recursivo `DeepPartial<T>` que haga todas las propiedades opcionales a cualquier profundidad. Para primitivos y arrays, retorna el tipo tal cual. Crea un objeto test de tipo DeepPartial<{a: {b: {c: number}}}> con valor { a: {} }.",
          starterCode: `// Define DeepPartial aquí\n`,
          solution: `type DeepPartial<T> = T extends object\n  ? { [K in keyof T]?: DeepPartial<T[K]> }\n  : T;\n\nconst test: DeepPartial<{a: {b: {c: number}}}> = { a: {} };`,
          tests: [
            "test.a !== undefined",
            "JSON.stringify(test) === '{\"a\":{}}'"
          ],
          hints: ["Usa un conditional: si T es object, mapea recursivamente", "Para primitivos, retorna T directamente"]
        },
        flashcards: [
          { front: "¿Cómo crear un tipo JSON recursivo?", back: "type Json = string | number | boolean | null | Json[] | { [k: string]: Json }" },
          { front: "¿Qué son Higher-Kinded Types?", back: "Tipos que toman otros tipos como parámetros (como Array, Promise). TS no los soporta nativamente pero se pueden simular." },
          { front: "¿Cómo crear paths type-safe de un objeto?", back: "Con un mapped type recursivo que genera strings como 'db.host' usando template literal types." }
        ]
      }
    ]
  },
  // ─────────────────────────────────────────────
  // MODULE 11: DESIGN PATTERNS EN TS
  // ─────────────────────────────────────────────
  {
    id: "design-patterns",
    title: "Design Patterns en TS",
    emoji: "🏛️",
    level: "expert",
    lessons: [
      {
        id: "creational-patterns",
        title: "Patrones Creacionales",
        description: "Builder, Factory, Singleton tipados",
        content: `# Patrones Creacionales con Tipos

## Builder Pattern (type-safe)
\`\`\`typescript
class RequestBuilder {
  private config: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
  } = {};

  setUrl(url: string): this {
    this.config.url = url;
    return this;
  }

  setMethod(method: "GET" | "POST" | "PUT" | "DELETE"): this {
    this.config.method = method;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.config.headers = headers;
    return this;
  }

  setBody<T>(body: T): this {
    this.config.body = body;
    return this;
  }

  build(): Required<typeof this.config> {
    if (!this.config.url) throw new Error("URL requerida");
    if (!this.config.method) throw new Error("Method requerido");
    return this.config as Required<typeof this.config>;
  }
}

const req = new RequestBuilder()
  .setUrl("/api/users")
  .setMethod("POST")
  .setBody({ name: "Ana" })
  .build();
\`\`\`

## Abstract Factory
\`\`\`typescript
interface Button { render(): string; }
interface Input { render(): string; }

interface UIFactory {
  createButton(label: string): Button;
  createInput(placeholder: string): Input;
}

class DarkUIFactory implements UIFactory {
  createButton(label: string): Button {
    return { render: () => \`<button class="dark">\${label}</button>\` };
  }
  createInput(placeholder: string): Input {
    return { render: () => \`<input class="dark" placeholder="\${placeholder}" />\` };
  }
}

function buildUI(factory: UIFactory) {
  const btn = factory.createButton("Enviar");
  const input = factory.createInput("Email...");
  return [btn.render(), input.render()];
}
\`\`\`

## Singleton con generics
\`\`\`typescript
class Registry<T> {
  private static instances = new Map<string, any>();
  private items = new Map<string, T>();

  static getInstance<U>(key: string): Registry<U> {
    if (!this.instances.has(key)) {
      this.instances.set(key, new Registry<U>());
    }
    return this.instances.get(key);
  }

  register(name: string, item: T): void {
    this.items.set(name, item);
  }

  get(name: string): T | undefined {
    return this.items.get(name);
  }
}
\`\`\``,
        exercise: {
          prompt: "Crea una clase `QueryBuilder` con métodos encadenables: select(fields: string[]), from(table: string), where(condition: string). Cada uno retorna `this`. Método build() retorna el SQL string. Ejemplo: new QueryBuilder().select(['name']).from('users').where('active = true').build() → 'SELECT name FROM users WHERE active = true'",
          starterCode: `class QueryBuilder {\n  // Tu código aquí\n}\n`,
          solution: `class QueryBuilder {\n  _fields = "*";\n  _table = "";\n  _where = "";\n\n  select(fields) {\n    this._fields = fields.join(", ");\n    return this;\n  }\n\n  from(table) {\n    this._table = table;\n    return this;\n  }\n\n  where(condition) {\n    this._where = condition;\n    return this;\n  }\n\n  build() {\n    let sql = "SELECT " + this._fields + " FROM " + this._table;\n    if (this._where) sql += " WHERE " + this._where;\n    return sql;\n  }\n}`,
          tests: [
            "new QueryBuilder().select(['name']).from('users').where('active = true').build() === 'SELECT name FROM users WHERE active = true'",
            "new QueryBuilder().select(['id', 'email']).from('accounts').build() === 'SELECT id, email FROM accounts'"
          ],
          hints: ["Cada método guarda datos internos y retorna this", "build() concatena las partes del SQL"]
        },
        flashcards: [
          { front: "¿Qué hace 'return this' en un builder?", back: "Permite method chaining: obj.method1().method2().build()" },
          { front: "¿Qué es Abstract Factory?", back: "Una interface que define la creación de familias de objetos relacionados sin especificar las clases concretas." },
          { front: "¿Cómo hacer un Singleton type-safe?", back: "Constructor private + método static getInstance() que retorna siempre la misma instancia." }
        ]
      },
      {
        id: "behavioral-patterns",
        title: "Patrones de Comportamiento",
        description: "Observer, Strategy, Command tipados",
        content: `# Patrones de Comportamiento

## Observer Pattern (tipado)
\`\`\`typescript
type Listener<T> = (data: T) => void;

class Observable<T> {
  private listeners: Set<Listener<T>> = new Set();

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(data: T): void {
    this.listeners.forEach(l => l(data));
  }
}

// Uso type-safe:
const priceStream = new Observable<number>();
const unsub = priceStream.subscribe(price => {
  console.log(\`Nuevo precio: $\${price}\`);
});
priceStream.notify(42.5);
unsub(); // desuscribirse
\`\`\`

## Strategy Pattern
\`\`\`typescript
interface SortStrategy<T> {
  sort(data: T[]): T[];
}

class BubbleSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class Sorter<T> {
  constructor(private strategy: SortStrategy<T>) {}

  setStrategy(strategy: SortStrategy<T>) {
    this.strategy = strategy;
  }

  sort(data: T[]): T[] {
    return this.strategy.sort(data);
  }
}
\`\`\`

## Command Pattern
\`\`\`typescript
interface Command {
  execute(): void;
  undo(): void;
}

class AddTextCommand implements Command {
  constructor(
    private editor: { content: string },
    private text: string
  ) {}

  execute() { this.editor.content += this.text; }
  undo() { this.editor.content = this.editor.content.slice(0, -this.text.length); }
}

class CommandHistory {
  private history: Command[] = [];

  execute(cmd: Command): void {
    cmd.execute();
    this.history.push(cmd);
  }

  undo(): void {
    const cmd = this.history.pop();
    cmd?.undo();
  }
}
\`\`\`

## State Machine tipado
\`\`\`typescript
type OrderState = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

type Transitions = {
  pending: "confirmed" | "cancelled";
  confirmed: "shipped" | "cancelled";
  shipped: "delivered";
  delivered: never;
  cancelled: never;
};

class Order<S extends OrderState = "pending"> {
  constructor(public state: S) {}

  transition<Next extends Transitions[S]>(
    next: Next
  ): Order<Next & OrderState> {
    return new Order(next as any);
  }
}

const order = new Order("pending");
const confirmed = order.transition("confirmed");
const shipped = confirmed.transition("shipped");
// shipped.transition("pending"); // ❌ Error!
\`\`\``,
        exercise: {
          prompt: "Crea una clase `Observable<T>` con: método `subscribe(fn: (val: T) => void)` que retorne una función de unsub, y método `emit(val: T)` que notifique a todos los suscriptores. Pruébalo.",
          starterCode: `class Observable {\n  // Tu código aquí\n}\n`,
          solution: `class Observable {\n  listeners = [];\n\n  subscribe(fn) {\n    this.listeners.push(fn);\n    return () => {\n      this.listeners = this.listeners.filter(l => l !== fn);\n    };\n  }\n\n  emit(val) {\n    this.listeners.forEach(fn => fn(val));\n  }\n}`,
          tests: [
            "(() => { const o = new Observable(); let v = 0; o.subscribe(x => v = x); o.emit(42); return v === 42; })()",
            "(() => { const o = new Observable(); let v = 0; const unsub = o.subscribe(x => v = x); unsub(); o.emit(99); return v === 0; })()"
          ],
          hints: ["Guarda listeners en un array", "subscribe retorna una función que filtra el listener del array"]
        },
        flashcards: [
          { front: "¿Qué es el Observer Pattern?", back: "Un patrón donde un objeto (Observable) notifica a múltiples suscriptores cuando su estado cambia." },
          { front: "¿Qué es el Strategy Pattern?", back: "Encapsula algoritmos intercambiables detrás de una interface común." },
          { front: "¿Qué es el Command Pattern?", back: "Encapsula una acción como un objeto con execute() y undo(), permitiendo deshacer operaciones." },
          { front: "¿Cómo tipar una State Machine en TS?", back: "Con un mapped type que define transiciones válidas por estado, y generics que restringen las transiciones." }
        ]
      },
      {
        id: "fp-patterns",
        title: "Patrones Funcionales",
        description: "Pipe, compose, monads, discriminated unions avanzados",
        content: `# Patrones Funcionales en TypeScript

## Pipe type-safe
\`\`\`typescript
function pipe<A>(val: A): A;
function pipe<A, B>(val: A, fn1: (a: A) => B): B;
function pipe<A, B, C>(val: A, fn1: (a: A) => B, fn2: (b: B) => C): C;
function pipe<A, B, C, D>(val: A, fn1: (a: A) => B, fn2: (b: B) => C, fn3: (c: C) => D): D;
function pipe(val: any, ...fns: Function[]): any {
  return fns.reduce((acc, fn) => fn(acc), val);
}

const result = pipe(
  " Hello World ",
  (s: string) => s.trim(),
  (s: string) => s.toLowerCase(),
  (s: string) => s.split(" ")
);
// ["hello", "world"]
\`\`\`

## Option/Maybe Monad
\`\`\`typescript
class Option<T> {
  private constructor(private value: T | null) {}

  static some<T>(value: T): Option<T> { return new Option(value); }
  static none<T>(): Option<T> { return new Option<T>(null); }

  map<U>(fn: (val: T) => U): Option<U> {
    return this.value !== null ? Option.some(fn(this.value)) : Option.none();
  }

  flatMap<U>(fn: (val: T) => Option<U>): Option<U> {
    return this.value !== null ? fn(this.value) : Option.none();
  }

  getOrElse(defaultVal: T): T {
    return this.value !== null ? this.value : defaultVal;
  }

  match<U>(handlers: { some: (val: T) => U; none: () => U }): U {
    return this.value !== null ? handlers.some(this.value) : handlers.none();
  }
}

const userName = Option.some({ profile: { name: "Sebas" } })
  .map(user => user.profile)
  .map(profile => profile.name)
  .getOrElse("Anónimo");
\`\`\`

## Discriminated Unions como Pattern Matching
\`\`\`typescript
type Shape =
  | { tag: "circle"; radius: number }
  | { tag: "rect"; w: number; h: number }
  | { tag: "triangle"; base: number; height: number };

// Exhaustive pattern matching
function match<T extends { tag: string }, R>(
  value: T,
  handlers: { [K in T["tag"]]: (val: Extract<T, { tag: K }>) => R }
): R {
  return (handlers as any)[value.tag](value);
}

const area = match(
  { tag: "circle" as const, radius: 5 },
  {
    circle: (s) => Math.PI * s.radius ** 2,
    rect: (s) => s.w * s.h,
    triangle: (s) => (s.base * s.height) / 2
  }
);
\`\`\`

## Lens Pattern
\`\`\`typescript
type Lens<S, A> = {
  get: (s: S) => A;
  set: (a: A, s: S) => S;
};

function lens<S, A>(
  get: (s: S) => A,
  set: (a: A, s: S) => S
): Lens<S, A> {
  return { get, set };
}

function compose<A, B, C>(
  outer: Lens<A, B>,
  inner: Lens<B, C>
): Lens<A, C> {
  return {
    get: (s) => inner.get(outer.get(s)),
    set: (c, s) => outer.set(inner.set(c, outer.get(s)), s)
  };
}
\`\`\``,
        exercise: {
          prompt: "Crea una clase `Option<T>` con: static some(val), static none(), método map(fn), y método getOrElse(default). Option.some(5).map(x => x * 2).getOrElse(0) debe dar 10. Option.none().map(x => x * 2).getOrElse(0) debe dar 0.",
          starterCode: `class Option {\n  // Tu código aquí\n}\n`,
          solution: `class Option {\n  constructor(value) {\n    this._value = value;\n    this._hasValue = arguments.length > 0 && value !== null && value !== undefined;\n  }\n\n  static some(val) { \n    const o = new Option(val);\n    o._hasValue = true;\n    return o;\n  }\n\n  static none() {\n    const o = new Option(null);\n    o._hasValue = false;\n    return o;\n  }\n\n  map(fn) {\n    return this._hasValue ? Option.some(fn(this._value)) : Option.none();\n  }\n\n  getOrElse(def) {\n    return this._hasValue ? this._value : def;\n  }\n}`,
          tests: [
            "Option.some(5).map(x => x * 2).getOrElse(0) === 10",
            "Option.none().map(x => x * 2).getOrElse(0) === 0",
            "Option.some('hello').map(s => s.toUpperCase()).getOrElse('') === 'HELLO'"
          ],
          hints: ["Guarda un _value y un _hasValue boolean", "map retorna some(fn(value)) si tiene valor, none() si no"]
        },
        flashcards: [
          { front: "¿Qué es una Monad (simplificado)?", back: "Un contenedor con map (transforma valor interno) y flatMap (transforma y aplana). Ejemplos: Option, Result, Promise." },
          { front: "¿Qué es pipe type-safe?", back: "Una función que encadena transformaciones con overloads para preservar los tipos en cada paso." },
          { front: "¿Qué es un Lens?", back: "Un par get/set que permite acceder y modificar propiedades anidadas de forma inmutable y composable." },
          { front: "¿Cómo implementar pattern matching en TS?", back: "Con discriminated unions + una función match() que mapea cada tag a su handler." }
        ]
      }
    ]
  }
];
