class PersonasDaoMem {
  constructor() {
    this.personas = [];
    // arreglo para almacenar los datos de personas
  }
  // método para almacenar una nueva persona
  async crearPersona(persona) {
    this.personas.push(persona);
  }
  // método para obtener todas las personas
  async obtenerPersonas() {
    return this.personas;
  }
  // método para obtener una persona por su ID
  async obtenerPersonaPorId(id) {
    return this.personas.find((persona) => persona.id === id);
  }
  // método para modificar una persona por su ID
  async modificarPersonaPorId(id, persona) {
    const index = this.personas.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.personas[index] = { ...persona, id };
      return true;
    }
    return false;
  }
  // método para borrar una persona por su ID
  async borrarPersonaPorId(id) {
    const index = this.personas.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.personas.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default PersonasDaoMem;
