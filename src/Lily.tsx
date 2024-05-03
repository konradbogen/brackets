function lily(text: string) {
  // Define a regular expression pattern to match variable assignments
  const pattern = /(\w+)\s*=\s*{([^}]*)}/g;
  let map = new Map();
  // Use a loop to iterate over all matches in the input string
  let match;
  while ((match = pattern.exec(text)) !== null) {
    let variableName = match[1]; // Capture the variable name
    let value = match[2]; // Capture the value inside curly braces
    let newValue = value.replace(/\n/g, "");
    // Output the matched variable assignment
    console.log(`Variable Name: ${variableName}, Value: ${value}`);
    if (map.has(variableName)) {
      map.set(variableName, map.get(variableName) + " " + newValue);
    } else {
      map.set(variableName, newValue);
    }
  }
  console.log(map);

  /*   musicOne = \relative {
      c''4 b8. a16 g4. f8 e4 d c2
    }
    verseOne = \lyricmode {
      Joy to the world, the Lord is come.
    }
    \score {
      <<
        \new Voice = "one" {
          \time 2/4
          \musicOne
        }
        \new Lyrics \lyricsto "one" {
          \verseOne
        }
      >>
    } */
  let syntax = "";
  map.forEach((value, key) => {
    if (key === "lirics") {
      syntax += `${key} = \\lyricmode { ${value} } \n`;
    } else {
      syntax += `${key} = { ${value} } \n`;
    }
  });

  // Build the score block
  syntax += `\\score { \n<<\n`;
  map.forEach((value, key) => {
    if (key !== "lirics") {
      syntax += `\\new Voice = "${key}" { \\${key} } \n`;
    } else {
      syntax += `\\new Lyrics \\lyricsto "melody" { \\${key} } \n`;
    }
  });
  syntax += " >> \n}";

  console.log(syntax); // Output the generated LilyPond syntax
  console.log(syntax);
  return syntax;
}

export default lily;
