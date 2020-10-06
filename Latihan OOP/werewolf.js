class Time {
  constructor(time = "day") {
    this.time = time;
  }
}

class Moderator {
  setTime(name, time) {
    if (time === "day") {
      name.time = time;
      return `Current time is ${name.time}`;
    } else if (time === "night") {
      name.time = time;
      return `Current time is ${name.time}`;
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
        return `${name.name} is guarded this night!`;
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

/*
function countPlayer() {
  return players.length;
}

function countVillageAlive() {
  let counter = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].team === "village" && players[i].alive === true) {
      counter++;
    }
  }

  return counter;
}

function countWerewolfAlive() {
  let counter = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].team === "werewolf" && players[i].alive === true) {
      counter++;
    }
  }

  return counter;
}

function winner() {
  if (countWerewolfAlive() == 0) {
    return `Villager is the winner`;
  } else if (countWerewolfAlive() == countVillageAlive()) {
    return `Werewolf is the winner`;
  } else {
    return `Game still continue, finish the game first!`;
  }
}
*/

let time = new Time("day");
let mod = new Moderator();
let alvin = new Villager("Alvin");
let bayu = new Villager("Bayu");
let cindy = new Villager("Cindy");
let dody = new Guardian("Dody");
let eria = new Seer("Eria");
let fira = new Werewolf("Fira");

// let players = [alvin, bayu, cindy, dody, eria, fira];

// Perintah
console.log(time);

console.log(dody.guard(time, alvin)); // Gagal waktu masih siang
console.log(eria.see(time, dody)); // Gagal waktu masih siang
console.log(fira.kill(time, alvin)); // Gagal waktu masih siang
console.log(mod.setTime(time, "night")); // Set waktu jadi malam
console.log(time);

console.log(dody.guard(time, alvin)); // Berhasil melindungi
console.log(eria.see(time, dody)); // Berhasil melihat
console.log(fira.kill(time, alvin)); // Gagal Membunuh
console.log(alvin.setUnguarded(time)); // Gagal waktu masih malam
console.log(mod.setTime(time, "day")); // Set waktu jadi siang
console.log(time);

console.log(alvin.setUnguarded(time)); // Berhasil mengubah status guard
console.log(mod.setTime(time, "night"));
console.log(fira.kill(time, alvin));
console.log(fira.kill(time, bayu));
console.log(fira.kill(time, cindy));
console.log(fira.kill(time, dody));
console.log(mod.setTime(time, "day"));
