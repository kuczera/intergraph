import cytoscape from 'cytoscape';
import {GraphBuilder} from "../GraphBuilder";
import {graphContainer} from "../../main";



export function initiateGraph(this: GraphBuilder){
    const regestaToBeLoaded = graphContainer!.innerText;
    graphContainer!.innerText = "";
    this.cy = cytoscape({
        container: graphContainer,
        elements: [

        ],
        layout: {
            name: 'cola'
        },
        style: [
            {
                selector: 'node',
                style: {
                    label: 'data(displayToken)'
                }
            },
            {
                selector: '.IndexPerson',
                style: {
                    shape: 'hexagon',
                    'background-color': 'red',
                }
            },
            {
                selector: 'edge',
                style: {
                    label: 'data(displayToken)'
                }
            },
            {
                selector: '.Regesta',
                style: {
                    shape: 'round-diamond',
                    'background-color': 'green',
                }
            }
        ]
    });
    // console.log(regestaToBeLoaded);
    this.addByIdWithRelations(regestaToBeLoaded);
}
