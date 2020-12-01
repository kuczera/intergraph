export const style = JSON.stringify([
  {
    selector: 'node',
    style: {
      label: 'id'
    }
  },
  {
    selector: 'edge',
    style: {
      //label: 'data(displayToken)'
    }
  },
  {
    selector: '.Action',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(action)'
    }
  },
  {
    selector: '.Regesta',
    style: {
      shape: 'round-diamond',
      'background-color': 'green',
      label: 'properties(action)'
    }
  },
  {
    selector: '.ExternalResource',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(title)'
    }
  },
  {
    selector: '.IndexEntry',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(label)'
    }
  },
  {
    selector: '.IndexEvent',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(label)'
    }
  },
  {
    selector: '.IndexPerson',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(label)'
    }
  },
  {
    selector: '.IndexPlace',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(label)'
    }
  },
  {
    selector: '.Literature',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(title)'
    }
  },
  {
    selector: '.Place',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(normalizedGerman)'
    }
  },
  {
    selector: '.Reference',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(title)'
    }
  },
  {
    selector: '.Regesta',
    style: {
      shape: 'hexagon',
      'background-color': 'red',
      label: 'properties(identifier)'
    }
  },
]);
