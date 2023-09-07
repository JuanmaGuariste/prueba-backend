import cluster from 'cluster';
import os from 'os';
import { Server } from 'socket.io';
import productsController from './controllers/products.controller.js';
import chatsController from './controllers/chats.controller.js';
import { logger } from './middleware/logger.middleware.js';
import { setupMaster, setupWorker } from '@socket.io/sticky';
import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';
// import { io } from "./socketio.js";
import socketio from "./socketio.js";
import { emitter } from './emiter.js';


export let io;
if (cluster.isPrimary) {    
    logger.info(`Primary ${process.pid} is running`);
    import('./config/environment.js')
        .then((module) => {
            const environment = module.default;
            import("./app.js")
                .then((module) => {
                    const app = module.default;
                    const webServer = app.listen(3000);
                    setupMaster(webServer, {
                        loadBalancingMethod: "least-connection",
                    });

                    setupPrimary();

                    cluster.setupPrimary({
                        serialization: "advanced",
                    });

                    const cpuCount = os.cpus().length;

                    for (let i = 0; i < cpuCount; i++) {
                        cluster.fork();
                    }

                    cluster.on("exit", (worker) => {
                        logger.error(`Worker ${worker.process.pid} died`);
                        cluster.fork();
                    });
                })
        });
} else {
    logger.info(`Worker ${process.pid} started`);
    io = await socketio.socketio();
    io.adapter(createAdapter());
    setupWorker(io);
    emitter.on ("new-product", async (product) => {
        let totalProducts = [];

        try {
            // await productsController.addProduct(product)
            totalProducts = await productsController.getAllProducts()
            io.emit('totalProducts', JSON.stringify(totalProducts));
        } catch (err) {
            logger.error(err)
        }
      
    })
}