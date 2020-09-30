class Binatang {
  constructor(voice, position = 0) {
    this.voice = voice;
    this.position = position;
  }

  say() {
    return this.voice;
  }

  walk(step) {
    this.position += step;
    return `Berjalan ${step} langkah`;
  }

  getPosition() {
    return `Saya sekarang di ${this.position}`;
  }
}

class Ayam extends Binatang {
  constructor() {
    super();
    this.voice = 'kukuruyuk';
  }
}

class Anjing extends Binatang {
  constructor() {
    super();
    this.voice = 'guguk';
  }
}

class Kucing extends Binatang {
  constructor() {
    super();
    this.voice = 'meong';
  }
}
