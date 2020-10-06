function refreshVoteStatus() {
  for (let i = 0; i < players.length; i++) {
    players[i].voteStatus = true;
    players[i].voted = 0;
  }
}

/* STILL BROKEN FUNCTION
function countVote(players) {
  if (players.length === 0) {
    return -1;
  }

  let max = players[0];
  let maxIndex = 0;

  for (let i = 0; i < players.length; i++) {
    if (players[i].voted > max) {
      maxIndex = i;
      max = players[i];
    }
  }

  return maxIndex;
} */

class Game {
  constructor(meetingStatus = false, votingStatus = false, winner = null) {
    this.meetingStatus = meetingStatus;
    this.votingStatus = votingStatus;
    this.winner = winner;
  }

  endMeeting() {
    this.meetingStatus = false;
    return `Meeting is done. Begin voting...`;
  }

  voting() {
    this.votingStatus = true;
    return `Voting time...`;
  }

  endVoting() {
    this.votingStatus = false;
    refreshVoteStatus();
    return `Voting time is up!`;
  }
}

class Player {
  constructor(
    name,
    role,
    alive = true,
    meeting = 1,
    voteStatus = true,
    voted = 0
  ) {
    this.name = name;
    this.role = role;
    this.alive = alive;
    this.meeting = meeting;
    this.voteStatus = voteStatus;
    this.voted = voted;
  }

  doMeeting(game) {
    if (this.alive === true) {
      if (this.meeting === 1) {
        game.meetingStatus = true;
        this.meeting = null;
        return `${this.name} calls EMERGENCY MEETING!`;
      } else {
        return `Can't do meeting! ${this.name} has no chance left!`;
      }
    } else {
      return `Can't do meeting! ${this.name} has already dead.`;
    }
  }

  vote(game, name) {
    if (game.votingStatus === true) {
      if (this.alive === true) {
        if (name.alive === true) {
          if (this.voteStatus === true) {
            name.voted++;
            this.voteStatus = false;
            return `${this.name} votes ${name.name}`;
          } else {
            return `Can't vote! ${this.name} has no vote chance!`;
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
  }
}

class Impostor extends Player {
  constructor(name, role = "impostor", alive, meeting, voteStatus) {
    super(name, role, alive, meeting, voteStatus);
  }

  kill(game, name) {
    if (game.meetingStatus === false && game.votingStatus === false) {
      if (name.role === "crewmate") {
        if (name.alive === true) {
          name.alive = false;
          name.voteStatus = false;
          return `${this.name} kills ${name.name}.`;
        } else {
          return `${name.name} has already dead.`;
        }
      } else {
        return `Impostor only can kill crewmate!`;
      }
    } else {
      return `Still meeting, can't kill right now!`;
    }
  }
}

class Crewmate extends Player {
  constructor(name, role = "crewmate", alive, meeting, voteStatus) {
    super(name, role, alive, meeting, voteStatus);
  }
}

// Object Declaration
const game = new Game();
const cyan = new Impostor("Cyan");
const pink = new Crewmate("Pink");
const green = new Crewmate("Green");
const yellow = new Crewmate("Yellow");

let players = [cyan, pink, green, yellow];

// Test in Console
console.log(cyan); // Check status
console.log(pink); // Check status
console.log(green); // Check status
console.log(yellow); // Check status

console.log(cyan.kill(game, pink)); // Cyan kills Pink.
console.log(pink.doMeeting(game)); // Can't do meeting! Pink has already dead.
console.log(cyan.doMeeting(game)); // Cyan calls EMERGENCY MEETING!
console.log(cyan.kill(game, yellow)); // Still meeting, can't kill right now!
console.log(game); // Check game status

console.log(game.endMeeting()); // Meeting is done. Begin voting...
console.log(game); // Check game status

console.log(green.vote(game, yellow)); // Can't vote! It's not voting time.
console.log(game.voting()); // Voting time...
console.log(game); // Check game status

console.log(cyan.vote(game, pink)); // Can't vote! Pink has already dead!
console.log(pink.vote(game, cyan)); // Can't vote! Pink has already dead!
console.log(green.vote(game, yellow)); // Green votes Yellow
console.log(cyan.vote(game, yellow)); // Cyan votes Yellow
console.log(yellow.vote(game, cyan)); // Yellow votes Cyan

console.log(cyan); // Check status
console.log(pink); // Check status
console.log(green); // Check status
console.log(yellow); // Check status
console.log(countVote(players));
console.log(game.endVoting()); // Voting time is up!
console.log(game); // Check game status

console.log(cyan.doMeeting(game)); // Can't do meeting! Cyan has no chance left!
console.log(cyan); // Check status
console.log(pink); // Check status
console.log(green); // Check status
console.log(yellow); // Check status
