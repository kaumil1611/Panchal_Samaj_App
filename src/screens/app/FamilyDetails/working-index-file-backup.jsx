
import * as d3 from 'd3';
import React, { useRef, useState } from 'react';
import { Dimensions, PanResponder, ScrollView, View } from 'react-native';
import Svg, { G, Line, Rect, Text } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const treeData = {
    name: "Root",
    spouse: {
        name: "Root's wife"
    },
    children: [
        {
            name: "Child 1",
            data: "hey data",
            spouse: {
                name: "Child 1's wife"
            },
            children: [
                { name: "Grandchild 1.1" },
                {
                    name: "Grandchild 1.2",
                    spouse: {
                        name: "Grandchild 1.2's wife"
                    },
                    children: [
                        { name: "Great-Grandchild 1.2.1" }
                    ]
                },
            ],
        },
        {
            name: "Child 2",
            spouse: {
                name: "Child 2's wife"
            },
            children: [
                { name: "Grandchild 2.1" },
                { name: "Grandchild 2.2" },
            ],
        },
        {
            name: "Child 3",
            spouse: {
                name: "Child 3's wife"
            },
            children: [
                {
                    name: "Grandchild 3.1", spouse: {
                        name: "Grandchild 3.1's wife"
                    },
                },
                { name: "Grandchild 3.2" }
            ]
        }
    ],
};

const nodeWidth = 100;
const nodeHeight = 40;
const horizontalSpacing = 60;
const verticalSpacing = 100;

const TreeNode = ({ node, x, y, children, onPress }) => (
    <>
        <Rect x={x} y={y} width={nodeWidth} onPress={() => onPress(node)} height={nodeHeight} fill="white" stroke="black" />
        <Text x={x + nodeWidth / 2} y={y + nodeHeight / 2} textAnchor="middle" alignmentBaseline="middle">
            {node.name}
        </Text>
        {node.spouse && (
            <>
                <Rect x={x + nodeWidth + horizontalSpacing / 2} y={y} width={nodeWidth} height={nodeHeight} fill="white" stroke="black" onPress={() => onPress(node.spouse)} />
                <Text x={x + nodeWidth + horizontalSpacing / 2 + nodeWidth / 2} y={y + nodeHeight / 2} textAnchor="middle" alignmentBaseline="middle">
                    {node.spouse.name}
                </Text>
                <Line x1={x + nodeWidth} y1={y + nodeHeight / 2} x2={x + nodeWidth + horizontalSpacing / 2} y2={y + nodeHeight / 2} stroke="black" />
            </>
        )}
        {children}
    </>
);

const FamilyTree = ({ data, navigation }) => {
    const root = d3.hierarchy(data);
    const treeLayout = d3.tree().nodeSize([nodeWidth + horizontalSpacing, nodeHeight + verticalSpacing]);
    treeLayout(root);

    const [pan, setPan] = useState({ x: 0, y: 0 });
    const panResponder = useRef(
        PanResponder.create({
            onPanResponderMove: (evt, gestureState) => {
                setPan(prevPan => ({
                    x: prevPan.x + gestureState.dx,
                    y: prevPan.y + gestureState.dy
                }));
            },
            onPanResponderRelease: () => {
                // Add any cleanup code here if necessary
            },
        })
    ).current;
    const handleNodePress = (node) => {
        navigation.navigate('NodeDetails', { node });
    };
    // Calculate the required width and height for the SVG
    const nodes = root.descendants();
    const minX = Math.min(...nodes.map(d => d.x));
    const maxX = Math.max(...nodes.map(d => d.x));
    const minY = Math.min(...nodes.map(d => d.y));
    const maxY = Math.max(...nodes.map(d => d.y));

    const svgWidth = maxX - minX + nodeWidth + horizontalSpacing;
    const svgHeight = maxY - minY + nodeHeight + verticalSpacing;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.parentScrollViewStyle} horizontal>
                <ScrollView style={styles.childScrollViewStyle}>
                    <Svg width={svgWidth} height={svgHeight} {...panResponder.panHandlers}>
                        <G transform={`translate(${pan.x},${pan.y})`}>
                            {root?.descendants()?.map((d, i) => {
                                const x = d.x - minX;
                                const y = d.y - minY;

                                return (
                                    <TreeNode
                                        key={i}
                                        node={d.data}
                                        x={x}
                                        y={y}
                                        onPress={handleNodePress}
                                        children={
                                            d.children && d.children?.map((child, j) => {
                                                const childX = child.x - minX;
                                                const childY = child.y - minY;
                                                return (
                                                    <Line
                                                        key={j}
                                                        x1={x + nodeWidth / 2}
                                                        y1={y + nodeHeight}
                                                        x2={childX + nodeWidth / 2}
                                                        y2={childY}
                                                        stroke="black"
                                                    />
                                                );
                                            })
                                        }
                                    />
                                );
                            })}
                        </G>
                    </Svg>
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const ViewFamilyTree = ({ navigation }) => (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <FamilyTree data={treeData} navigation={navigation} />
    </View>
);

const styles = {
    parentScrollViewStyle: {
        flex: 1,
    },
    childScrollViewStyle: {
        flex: 1,
    },
};

export default ViewFamilyTree;
