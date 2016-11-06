export function idToCell(idx) {
  let coordinates = idx.split('_')
  return {
    row: parseInt(coordinates[0]),
    col: parseInt(coordinates[1])
  }
}

export function cellToId(cell) {
  return cell.row + '_' + cell.col
}

export function pretty(grid) {
  return grid
          .map((row) =>
            row.map((col) => col.char ? col.char : col)
            .map((col) => col === '' ? ' ' : col)
            .join(' '))
          .join('\n')
}

export function clearConsole() {
  console.API;

  if (typeof console._commandLineAPI !== 'undefined') {
      console.API = console._commandLineAPI; //chrome
  } else if (typeof console._inspectorCommandLineAPI !== 'undefined') {
      console.API = console._inspectorCommandLineAPI; //Safari
  } else if (typeof console.clear !== 'undefined') {
      console.API = console;
  }

  console.API.clear();
}

window.pretty = pretty
