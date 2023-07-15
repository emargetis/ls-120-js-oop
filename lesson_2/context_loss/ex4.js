const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

/* 
No, the output will be:
Undefined: Arena
Undefined: Daggerfall
Undefined: Morrowind
Undefined: Oblivion
Undefined: Skyrim

The reason is that the callback function passed in to for each will lose context.
The titles park wil work because the outer function will be executed with `TESgames`
as its context object, but the inner function will lose its surrounding context and its
context will be the global object.
*/