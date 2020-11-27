import * as cy from 'cytoscape';
export const styleOptions: cy.StylesheetStyle[] = [
  {
    selector: 'node',
    style: {
      label: 'id',
      'text-wrap': 'ellipsis',
      'text-max-width': '150px',
    }
  },
  {
    selector: 'edge',
    style: {
      'curve-style': 'bezier',
      label: 'data(type)',
      // 'edge-text-rotation': 'autorotate',  // This line makes the server fail compilation; but still works when the server is already running
      'font-size': 7,
      'text-background-color': 'white',
      'text-background-opacity': 1,
    }
  },
  {
    selector: '.Action',
    style: {
      shape: 'ellipse',
      'background-color': 'salmon',
      label: 'data(action)'
    }
  },
  {
    selector: '.Regesta',
    style: {
      shape: 'round-diamond',
      'background-color': 'green',
      label: 'data(action)'
    }
  },
  {
    selector: '.ExternalResource',
    style: {
      shape: 'ellipse',
      'background-color': 'red',
      label: 'data(title)'
    }
  },
  {
    selector: '.IndexEntry',
    style: {
      shape: 'ellipse',
      'background-color': 'red',
      label: 'data(label)'
    }
  },
  {
    selector: '.IndexEvent',
    style: {
      shape: 'ellipse',
      'background-color': 'red',
      label: 'data(label)'
    }
  },
  {
    selector: '.IndexThing',
    style: {
      shape: 'ellipse',
      'background-color': 'red',
      label: 'data(label)'
    }
  },
  {
    selector: '.IndexPerson',
    style: {
      shape: 'ellipse',
      'background-color': '#3E8DD7',
      label: 'data(label)'
    }
  },
  {
    selector: '.IndexPlace',
    style: {
      shape: 'ellipse',
      'background-color': '#8B6935',
      label: 'data(label)'
    }
  },
  {
    selector: '.Literature',
    style: {
      shape: 'ellipse',
      'background-color': 'red',
      label: 'data(title)'
    }
  },
  {
    selector: '.Place',
    style: {
      shape: 'ellipse',
      'background-color': 'red',
      label: 'data(normalizedGerman)'
    }
  },
  {
    selector: '.Reference',
    style: {
      shape: 'ellipse',
      'background-color': 'red',
      label: 'data(title)'
    }
  },
  {
    selector: '.Regesta',
    style: {
      shape: 'ellipse',
      'background-color': '#BC2E2E',
      label: 'data(identifier)'
    }
  },
  {
    selector: ':selected',
    style: {
      'background-color': '#DCCE4F',
    }
  },
];
