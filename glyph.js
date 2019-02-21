

class Glyph {
  constructor(char, foreground, background) {
    this._char = char || '  ';
    this._foreground = foreground || 'white';
    this._background = background || 'black';
  }

  getChar() {
    return this._char;
  }
  
  getBackground() {
    return this._background;
  }

  getForeground() {
    return this._foreground;
  }
  
}

exports.Glyph = Glyph;