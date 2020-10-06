// Make voteStatus true and voted = 0 after Game.endVoting()
function refreshVoteStatus() {
  for (let i = 0; i < players.length; i++) {
    players[i].voteStatus = true;
    players[i].voted = 0;
  }
}

// Count alive impostor(s) left
function countImpostorAlive() {
  let counter = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].role === "impostor" && players[i].alive === true) {
      counter++;
    }
  }

  return counter;
}

// Count alive crewmate(s) left
function countCrewmateAlive() {
  let counter = 0;
  for (let i = 0; i < players.length; i++) {
    if (players[i].role === "crewmate" && players[i].alive === true) {
      counter++;
    }
  }

  return counter;
}

function eject() {
  // First thing first, find the highest voted player
  let getMax = 0;
  let getIndex = [];

  // Find the highest voted value of every players
  for (let i = 0; i < players.length; i++) {
    if (players[i].voted > getMax) {
      getMax = players[i].voted;
    }
  }

  // Find Index(es) of highest voted player(s)
  for (let i = 0; i < players.length; i++) {
    if (players[i].voted === getMax) {
      getIndex.push(i);
    }
  }

  // If more than 1 player get highest voted value => empty getIndex
  if (getIndex.length > 1) {
    getIndex = [];
  }

  // Now, eject the player
  let eject = getIndex[0];
  // If getIndex = [], eject no one
  if (getIndex.length === 0) {
    return `No one was ejected! ${countImpostorAlive()} impostor(s) remains.`;
  } else {
    // Set ejected player => dead
    players[eject].alive = false;
    // Check if ejected player is impostor or crewmate
    if (players[eject].role === "impostor") {
      return `${
        players[eject].name
      } was an Impostor! ${countImpostorAlive()} impostor(s) remains.`;
    } else {
      return `${
        players[eject].name
      } was not the Impostor! ${countImpostorAlive()} impostor(s) remains`;
    }
  }
}

// Check who win the game
function whoWin() {
  let winner = null;
  if (countImpostorAlive() === 0) {
    winner = "Crewmate";
    return winner;
  } else if (countImpostorAlive() === countCrewmateAlive()) {
    winner = "Impostor";
    return winner;
  } else if (countCrewmateAlive() >= countImpostorAlive()) {
    winner = null;
    return winner;
  }
}

class Game {
  constructor(
    meetingStatus = false,
    votingStatus = false,
    winner = null,
    end = false
  ) {
    this.meetingStatus = meetingStatus; // Emergency Meeting or Report meeting
    this.votingStatus = votingStatus; // Voting time to eject player
    this.winner = winner; // Store winner of the game
    this.end = end; // If end = true => Game has ended
  }

  endMeeting() {
    if (this.meetingStatus === true) {
      this.meetingStatus = false;
      console.log(`Meeting is done. Begin voting...`);
      return this.voting();
    } else {
      return `It's not meeting time`;
    }
  }

  voting() {
    if (this.meetingStatus === false && this.votingStatus === false) {
      this.votingStatus = true;
      return `Begin voting!`;
    }
  }

  endVoting() {
    this.votingStatus = false;
    let msg = eject(); // Eject player
    refreshVoteStatus(); // Refresh

    // Check whoWin() in the end of voting time
    if (whoWin() !== null) {
      // If there's a winner, end the game
      this.end = true;
      // Store the game winner
      this.winner = whoWin();
      return `${msg}. ${this.winner} WIN`;
    } else {
      return `${msg}`;
    }
  }

  endByKilling() {
    if (whoWin() !== null) {
      // If there's a winner, end the game
      this.end = true;
      // Store the game winner
      this.winner = whoWin();
      return `${this.winner} WIN by killing crewmates!`;
    }
  }
}

class Player {
  constructor(
    name,
    role, // Impostor or Crewmate
    alive = true, // False => dead
    meetingChance = 1, // Only 1 chance per player to do emergency meeting
    voteStatus = true, // Toggle to vote players when voting time
    voted = 0 // Count how many this.player get voted when voting time
  ) {
    this.name = name;
    this.role = role;
    this.alive = alive;
    this.meetingChance = meetingChance;
    this.voteStatus = voteStatus;
    this.voted = voted;
  }

  // Both impostors and crewmates can call Emergency Meeting once
  emergencyMeeting(game) {
    // Check if the game hasn't ended yet
    if (game.end === false) {
      // Check if this.player still alive
      if (this.alive === true) {
        // Check this.player meeting chance left
        if (this.meetingChance === 1) {
          game.meetingStatus = true;
          this.meetingChance = null; // No more chance to call meeting for this.player
          return `${this.name} calls EMERGENCY MEETING!`;
        } else {
          return `Can't do meeting! ${this.name} has no chance left!`;
        }
      } else {
        return `Can't do meeting! ${this.name} has already dead.`;
      }
    } else {
      return `Game has ended.`;
    }
  }

  // Vote to eject players
  vote(game, name) {
    // Check if the game hasn't ended yet
    if (game.end === false) {
      // Check game voting time status
      if (game.votingStatus === true) {
        // Check if this.player still alive
        if (this.alive === true) {
          // Check if voted player still alive
          if (name.alive === true) {
            // Check if this.player hasn't vote yet in this voting time
            if (this.voteStatus === true) {
              name.voted++; // Counter of voted player
              this.voteStatus = false; // Make this.player can't vote again in this voting time
              return `${this.name} votes ${name.name}`;
            } else {
              return `Can't vote! ${this.name} has no vote chance left!`;
            }
          } else {
            return `Can't vote! ${name.name} has already dead!`;
          }
        } else {
          return `Can't vote! ${this.name} has already dead!`;
        }
      } else {
        return `Can't vote! It's not voting time.`;
      }
    } else {
      return `Game has ended.`;
    }
  }
}

class Impostor extends Player {
  constructor(name, role = "impostor", alive, meetingChance, voteStatus) {
    super(name, role, alive, meetingChance, voteStatus);
  }

  // Impostor can kill crewmate
  kill(game, name) {
    // Check if the game hasn't ended yet
    if (game.end === false) {
      // Check if game is not in meeting or voting time
      if (game.meetingStatus === false && game.votingStatus === false) {
        // Check if this.player still alive
        if (this.alive === true) {
          // Check if player's role who want to be killed is crewmate
          if (name.role === "crewmate") {
            // Check if player who want to be killed is still alive
            if (name.alive === true) {
              name.alive = false; // kill
              // check if impostor win or not
              if (whoWin() === "Impostor") {
                return game.endByKilling();
              } else {
                return `${this.name} kills ${name.name}.`;
              }
            } else {
              return `${name.name} has already dead.`;
            }
          } else {
            return `Impostor only can kill crewmate!`;
          }
        } else {
          return `${this.name} has already dead.`;
        }
      } else {
        return `Still meeting, can't kill right now!`;
      }
    } else {
      return `Game has ended.`;
    }
  }
}

class Crewmate extends Player {
  constructor(name, role = "crewmate", alive, meetingChance, voteStatus) {
    super(name, role, alive, meetingChance, voteStatus);
  }
}

// Object Declaration
const game = new Game();
const cyan = new Impostor("Cyan");
const orange = new Impostor("Orange");
const pink = new Crewmate("Pink");
const green = new Crewmate("Green");
const yellow = new Crewmate("Yellow");
const black = new Crewmate("Black");
const brown = new Crewmate("Brown");

// Store to array of objects
let players = [cyan, orange, pink, green, yellow, black, brown];

// Example of Game //

console.log(cyan.kill(game, pink)); // Cyan kills Pink.
console.log(pink.emergencyMeeting(game)); // Can't do meeting! Pink has already dead.
console.log(cyan.emergencyMeeting(game)); // Cyan calls EMERGENCY MEETING!
console.log(cyan.kill(game, yellow)); // Still meeting, can't kill right now!

console.log(game.endMeeting()); // Meeting is done. Begin voting...

// Change who vote who and see the result
console.log(pink.vote(game, cyan)); // Can't vote! Pink has already dead!
console.log(cyan.vote(game, pink)); // Can't vote! Pink has already dead!
console.log(cyan.vote(game, yellow)); // Cyan votes Yellow
console.log(cyan.vote(game, green)); // Can't vote! Cyan has no vote chance left!
console.log(green.vote(game, yellow)); // Can't vote! It's not voting time.
console.log(orange.vote(game, cyan)); // Orange votes Yellow
console.log(yellow.vote(game, cyan)); // Yellow votes Cyan
console.log(black.vote(game, cyan)); // Black votes Cyan
console.log(brown.vote(game, cyan)); // Brown votes Cyan

console.log(game.endVoting()); // RESULT!

console.log(cyan.emergencyMeeting(game)); // Can't do meeting! Cyan has no chance left!
console.log(cyan.kill(game, green)); // Cyan has already dead.
console.log(orange.kill(game, brown)); // Orange kills Brown.
console.log(orange.kill(game, black)); // Orange kills Black.
console.log(orange.kill(game, yellow)); // Impostor WIN by killing crewmates!
console.log(orange.vote(game, yellow)); // Game has ended.
