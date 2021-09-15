import Matter from "matter-js"
import Bird from "../components/Bird";

export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    engine.gravity.y = 0.4;

    let world = engine.world

    return {
        physics: {engine,world},
        Bird: Bird(world, 'red', {x: 50, y: 300}, {height: 40, width: 40})
    }

}