import Matter from "matter-js"

export default restart => {
    let engine = Matter.Engine.create({enableSleeping: false})

    engine.gravity.y = 0.4;

    let world = engine.world

    return {
        physics: {engine,world}
    }

}