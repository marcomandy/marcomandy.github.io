/*
TO DO:
-> identify and highlight arrows  with two heads (arrows that links two types which are the first strong against the second and the second not very effective against the first);
-> an option to show only "strong against" arrows;
-> an option to show only "not very effective against" arrows;
-> an option to show only double headed arrows;
*/

class Coordinates
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

const doublePi = Math.PI * 2;
const typesNumber = 18;
const center = new Coordinates(650, 650);
const innerRadius = 500;
const middleRadius = 1.15 * innerRadius;
const outerRadius = 1.25 * innerRadius;
const typeRadius = 30;
const typeOpacity = 1;
const outerTypeRadius = typeRadius + 30;
const outerTypeStrokeWidth = 2;
const outerTypeStrokeDasharray = 10;
const outerTypeOpacity = 0.25;
const superEffectiveArrowDistance = 10;
const notVeryEffectiveArrowDistance = 40;
const arrowOpacity = 0.1;
const arrowStrokeWidth = 2.5;

const superEffectiveArrowValues = [0, 7.5, 4, 7.5, 2, 0, 0, 7.5];
const superEffectiveMarkerValues = [0, 0, 10, 10, 0, 3.75];

const notVeryEffectiveArrowValues = [0, 10, 5, 10, 4.75, 7.5, 3.75, 5.5, 2.5, 4.5, 1.125, 5.5, 0.25, 7.5, 0, 10];
const notVeryEffectiveMarkerValues = [0, 0, 20, 20, 0, 7.125];

const url = "https://marcomandy.github.io/SEPGOTEC/";
const imageFileFormat = ".svg";

const colors = ["#CCBC67", "#89C900", "#FF8B7B", "#1E73B8", "#5FBADF", "#7A95DE", "#E766D7", "#8277C8", "#FFA223", "#2C9599", "#FFD347", "#545567", "#D85163", "#CF783B", "#4BCE7B", "#93938F", "#F7A7E0", "#81E2DD"];

const superEffectiveAgainst = [[5, 1, 8, 17], [14, 2, 11], [12, 6], [3], [13, 0, 8], [12, 1, 14], [14, 16], [7, 2], [1, 9, 14, 17], [0, 17, 16], [5, 4], [7, 2], [15, 0, 9, 17, 11], [6, 0, 9, 8, 10], [13, 0, 4], [], [12, 11, 3], [5, 13, 14, 3]];

const notVeryEffectiveAgainst = [[12, 13, 9], [12, 5, 6, 7, 9, 8, 16], [9, 2, 11], [9, 16], [4, 14, 3], [0, 9, 10], [6, 13, 0, 7, 9], [15, 11], [0, 8, 4, 3], [9, 8, 4, 10], [13, 14, 10, 3], [12, 11, 16], [5, 6, 1, 7, 2, 16], [5, 1, 14], [5, 6, 1, 9, 8, 14, 3], [0, 9, 7], [6, 9, 8], [9, 8, 4, 17]];

var innerCircleCoord = [];
var middleCircleLeftCoord = [];
var middleCircleRightCoord = [];
var outerCircleCoord = [];
var typeCircleGroups = [];
var superEffectiveArrows = [];
var notVeryEffectiveArrows = [];
for (let i = 0; i < typesNumber; i++)
{
    superEffectiveArrows[i] = [];
    notVeryEffectiveArrows[i] = [];
}

main();

function main()
{
    let paper = Snap("#paper");

    for (let i = 0; i < typesNumber; i++)
    {
        let slice = 1 / typesNumber;
        let angle = slice * i;
        let x = center.x + innerRadius * Math.cos(angle * doublePi);
        let y = center.y + innerRadius * Math.sin(angle * doublePi);

        innerCircleCoord[i] = new Coordinates(x, y);
    }

    for (let i = 1; i < (typesNumber * 4) + 1; i++)
    {
        let slice = 1 / (typesNumber * 4);
        let angle = slice * i;

        if (i % 2 !== 0)
        {
            let x = center.x + middleRadius * Math.cos(angle * doublePi);
            let y = center.y + middleRadius * Math.sin(angle * doublePi);
            if (((i + 1) % 4) === 0)
            {
                middleCircleLeftCoord[Math.floor(((i + 1) % (typesNumber * 4)) / 4)] = new Coordinates(x, y);
            }
            else
            {
                middleCircleRightCoord[Math.floor(((i + 1) % (typesNumber * 4)) / 4)] = new Coordinates(x, y);
            }
        }
        else if (i % 4 === 0)
        {
            let x = center.x + outerRadius * Math.cos(angle * doublePi);
            let y = center.y + outerRadius * Math.sin(angle * doublePi);
            outerCircleCoord[(i % (typesNumber * 4)) / 4] = new Coordinates(x, y);
        }
    }

    for (i = 0; i < superEffectiveAgainst.length; i++)
    {
        for (j = 0; j < superEffectiveAgainst[i].length; j++)
        {
            let line = drawLine(paper, (innerCircleCoord[i]).x, (innerCircleCoord[i]).y, (innerCircleCoord[(superEffectiveAgainst[i][j])]).x, (innerCircleCoord[(superEffectiveAgainst[i][j])]).y, typeRadius, typeRadius + superEffectiveArrowDistance, i, superEffectiveArrowValues, superEffectiveMarkerValues);
            superEffectiveArrows[i].push(line);
            superEffectiveArrows[(superEffectiveAgainst[i][j])].push(line);
        }
    }


    for (i = 0; i < notVeryEffectiveAgainst.length; i++)
    {
        for (j = 0; j < notVeryEffectiveAgainst[i].length; j++)
        {
            let line = drawLine(paper, (innerCircleCoord[i]).x, (innerCircleCoord[i]).y, (innerCircleCoord[(notVeryEffectiveAgainst[i][j])]).x, (innerCircleCoord[(notVeryEffectiveAgainst[i][j])]).y, typeRadius, typeRadius + notVeryEffectiveArrowDistance, i, notVeryEffectiveArrowValues, notVeryEffectiveMarkerValues);
            notVeryEffectiveArrows[i].push(line);
            notVeryEffectiveArrows[(notVeryEffectiveAgainst[i][j])].push(line);
        }
    }

    let iconDelta = outerTypeRadius * 0.5;

    for (let i = 0; i < typesNumber; i++)
    {
        let crf = paper.circle((innerCircleCoord[i]).x, (innerCircleCoord[i]).y, typeRadius);
        crf.attr({
            fill: colors[i],
            opacity: typeOpacity
        });

        let outerCrf = paper.circle((innerCircleCoord[i]).x, (innerCircleCoord[i]).y, outerTypeRadius);
        outerCrf.attr({
            fill: colors[i],
            stroke: "#000000",
            strokeWidth: outerTypeStrokeWidth,
            strokeDasharray: outerTypeStrokeDasharray,
            opacity: outerTypeOpacity
        });

        let img = paper.image(url + i + imageFileFormat, (innerCircleCoord[i]).x - iconDelta, (innerCircleCoord[i]).y - iconDelta, outerTypeRadius, outerTypeRadius).attr({ fill: "#FF" });

        let group = paper.group(crf, outerCrf, img);
        group.attr({
            opacity: 0.75
        });

        typeCircleGroups[i] = group;

        let callback = function ()
        {
            for (let i = 0; i < typesNumber; i++)
            {
                if (typeCircleGroups[i] == group)
                {
                    onClick(i);
                }
            }
        };
        
        group.click(callback);
    }
}

function onClick(index)
{
    isActive = typeCircleGroups[index].attr("opacity") == 1;

    typeCircleGroups[index].attr({
        opacity: isActive ? 0.75 : 1
    });

    
    for (let i = 0; i < superEffectiveArrows[index].length; i++)
    {
        superEffectiveArrows[index][i].attr({
            opacity: isActive ? 0.1 : 1
        });
    }

    for (let i = 0; i < notVeryEffectiveArrows[index].length; i++)
    {
        notVeryEffectiveArrows[index][i].attr({
            opacity: isActive ? 0.1 : 1
        });
    }
}

function drawLine(paper, x1, y1, x2, y2, smallRadius, bigRadius, index, arrowValues, markerValues)
{
    let line;

    if (x1 === x2 && y1 === y2)
    {
         let destCoord = getPointCoordinatesOnSegmentAtDistance((middleCircleRightCoord[index]).x, (middleCircleRightCoord[index]).y, x2, y2, bigRadius);

        line = paper.path(
            "M" + x1 + "," + y1 +
            "L" + (middleCircleLeftCoord[index]).x  + "," + (middleCircleLeftCoord[index]).y +
            "L" + (outerCircleCoord[index]).x + "," + (outerCircleCoord[index]).y +
            "L" + (middleCircleRightCoord[index]).x + "," + (middleCircleRightCoord[index]).y +
            "L" + destCoord.x                         + "," + destCoord.y
        );
    }
    else
    {
			  let startCoord = getPointCoordinatesOnSegmentAtDistance(x2, y2, x1, y1, smallRadius);
        let destCoord = getPointCoordinatesOnSegmentAtDistance(x1, y1, x2, y2, bigRadius);

        line = paper.line(startCoord.x, startCoord.y, destCoord.x, destCoord.y);
    }

    let arrow = paper.polygon(arrowValues).attr({ fill: colors[index] }).transform('r90');
    let marker = arrow.marker(markerValues[0], markerValues[1], markerValues[2], markerValues[3], markerValues[4], markerValues[5]);

    line.attr({
        stroke: colors[index],
        strokeWidth: arrowStrokeWidth,
        markerEnd: marker,
        opacity: arrowOpacity,
        fill: '#ffffff00'
    });

    return line;
}

function getPointCoordinatesOnSegmentAtDistance(x1, y1, x2, y2, radius)
{
    let x;
    let y;

    if (Math.abs(x1 - x2) < 0.01)
    {
        x = x2;
        y = y2 + ((y1 < y2 ? -1 : +1) * radius);
    }
    else if (Math.abs(y1 - y2) < 0.01)
    {
        y = y2;
        x = x2 + ((x1 < x2 ? -1 : +1) * radius);
    }
    else
    {
        x = ((x1 < x2 ? -1 : +1) * Math.sqrt(Math.pow(radius, 2) * Math.pow((x1 - x2), 2) * (Math.pow(x1, 2) - 2 * x1 * x2 + Math.pow(x2, 2) + Math.pow((y1 - y2), 2))) + Math.pow(x1, 2) * x2 - 2 * x1 * Math.pow(x2, 2) + Math.pow(x2, 3) + x2 * Math.pow((y1 - y2), 2)) / (Math.pow(x1, 2) - 2 * x1 * x2 + Math.pow(x2, 2) + Math.pow((y1 - y2), 2));

        y = (x1 * y2 - x2 * y1 + x * (y1 - y2)) / (x1 - x2);
    }

    return new Coordinates(x, y);
}


