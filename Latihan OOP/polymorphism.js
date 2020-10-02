class Human {
  constructor(name, address, rank) {
    this.name = name;
    this.address = address;
    this.rank = rank;
  }

  introduce() {
    return `Hi, my  name is ${this.name}`;
  }

  work() {
    console.log(`${this.constructor.name}:`, "Working!");
  }
}

const PublicServer = Base => class extends Base {
  save() {
    console.log("SFX: Thank You!");
  }
}

const Military = Base => class extends Base {
  shoot() {
    console.log("DOR!");
  }
}

class Doctor extends PublicServer(Human) {
  constructor(props) {
    super(props);
  }

  work() {
    super.work();
    super.save();
  }
}

class Police extends Military(PublicServer(Human)) {
  static workplace = "Police Station";

  constructor(props) {
    super(props);
    this.rank = props.rank;
  }

  work() {
    super.work();
    super.shoot();
    super.save();
  }
}

class Army extends PublicServer(Military(Human)) {
  static workplace = "Army Station";

  constructor(props) {
    super(props);
    this.rank = props.rank;
  }

  work() {
    super.work();
    super.shoot();
    super.save();
  }
}

class Writer extends Human {
  work() {
    console.log("Write books");
    super.work();
  }
}




const Wiranto = new Police("Wiranto", "Jakarta")

const Prabowo = new Army({
  name: "Prabowo",
  address: "Undefined",
  rank: "General"
})

const Boyke = new Doctor({
  name: "Boyke",
  address: "Jakarta"
})

const Dee = new Writer({
  name: "Dee",
  address: "Bandung"
})