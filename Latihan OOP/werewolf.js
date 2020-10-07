class Time {
  constructor(time = "day") {
    this.time = time;
  }
}

class Moderator {
  setTime(time, cycle) {
    if (cycle === "day") {
      time.time = cycle;
      return `Current time is ${time.time}`;
    } else if (cycle === "night") {
      time.time = cycle;
      return `Current time is ${time.time}`;
    } else {
      return `Time inputed is wrong`;
    }
  }
}

class Player {
  constructor(name, role, team, alive = true, guarded = false) {
    this.name = name;
    this.role = role;
    this.team = team;
    this.alive = alive;
    this.guarded = guarded;
  }

  setUnguarded(time) {
    if (time.time === "day") {
      this.guarded = false;
      return `${this.name} is unguarded!`;
    } else {
      return `Current time still night! This activity can only be done in daytime!`;
    }
  }
}

class Villager extends Player {
  constructor(
    name,
    role = "villager",
    team = "village",
    alive = true,
    guarded = false
  ) {
    super(name, role, team, alive, guarded);
  }
}

class Guardian extends Player {
  constructor(
    name,
    role = "guardian",
    team = "village",
    alive = true,
    guarded = false
  ) {
    super(name, role, team, alive, guarded);
  }

  guard(time, name) {
    if (time.time === "night") {
      if (name.alive === true) {
        name.guarded = true;
        return `${name.name} is guarded tonight!`;
      } else {
        return `${name.name} is already dead.`;
      }
    } else {
      return `Current time still day! Guard can only be done in night`;
    }
  }
}

class Seer extends Player {
  constructor(
    name,
    role = "seer",
    team = "village",
    alive = true,
    guarded = false
  ) {
    super(name, role, team, alive, guarded);
  }

  see(time, name) {
    if (time.time === "night") {
      if (name.alive === true) {
        return `${name.name}'s team is ${name.team}`;
      } else {
        return `${name.name} is already dead.`;
      }
    } else {
      return `Current time still day! See can only be done in night`;
    }
  }
}

class Werewolf extends Player {
  constructor(
    name,
    role = "werewolf",
    team = "werewolf",
    alive = true,
    guarded = false
  ) {
    super(name, role, team, alive, guarded);
  }

  kill(time, name) {
    if (time.time === "night") {
      if (name.alive === true) {
        if (name.team === "village") {
          if (name.guarded === false) {
            name.alive = false;
            return `${name.name} is dead`;
          } else {
            return `You failed to kill ${name.name}. ${name.name} is guarded!`;
          }
        } else {
          return `Can't kill same team!`;
        }
      } else {
        return `${name.name} is already dead.`;
      }
    } else {
      return `Current time still day! Kill can only be done in night`;
    }
  }
}

let time = new Time("day");
let mod = new Moderator();
let alvin = new Villager("Alvin");
let bayu = new Villager("Bayu");
let cindy = new Villager("Cindy");
let dody = new Guardian("Dody");
let eria = new Seer("Eria");
let fajar = new Werewolf("Fajar");

// let players = [alvin, bayu, cindy, dody, eria, fajar];

// Perintah
console.log(time);

console.log(dody.guard(time, alvin)); // Current time still day! Guard can only be done in night
console.log(eria.see(time, dody)); // Current time still day! See can only be done in night
console.log(fajar.kill(time, alvin)); // Current time still day! Kill can only be done in night
console.log(mod.setTime(time, "night")); // Current time is night
console.log(time);

console.log(dody.guard(time, alvin)); // Alvin is guarded tonight!
console.log(eria.see(time, dody)); // Dody's team is village
console.log(fajar.kill(time, alvin)); // You failed to kill Alvin. Alvin is guarded!
console.log(alvin.setUnguarded(time)); // Current time still night! This activity can only be done in daytime!
console.log(mod.setTime(time, "day")); // Current time is day
console.log(time);

console.log(alvin.setUnguarded(time)); // Alvin is unguarded!
console.log(mod.setTime(time, "night")); // Current time is night
console.log(dody.guard(time, dody)); // Dody is guarded tonight!
console.log(eria.see(time, fajar)); // Fajar's team is werewolf
console.log(fajar.kill(time, alvin)); // Alvin is dead
console.log(mod.setTime(time, "day")); // Current time is day
