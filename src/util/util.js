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

window.pretty = pretty
