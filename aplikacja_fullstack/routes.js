

import * as url from "url";
import * as Task from "./models/task.model.js";
import { TasksController } from "./controllers/TasksController.js";
import { serveStaticFile, serveJsonObj, getPostData } from "./util/serverHelper.js";
import * as HtmlRenderer from "./util/htmlRenderer.js";

const tasksController = new TasksController();

export async function handleRequest(req, res) {
    let path = url.parse(req.url).pathname;
    console.log("req.url", req.url);
    console.log("path:", path);

    if (req.url === "/" && req.method === "GET") {
        const tasks = await Task.getAll();
        const props = {
            title: "Lista zadań",
            heading: "Lista zadań",
            tasksHtml: HtmlRenderer.tasksListHtml(tasks)
        };

        HtmlRenderer.render("./static/index.html", res, props);
        res.end();
    } else
    if (req.url === "/api/tasks" && req.method === "GET") {
        const tasksData = await tasksController.getAll();
        serveJsonObj(res, tasksData);
    } else
    if (req.url.match(/\/api\/task\/([a-z0-9]+)/) && req.method === "GET" ) {
        const id = req.url.split("/")[3];
        const taskData = await tasksController.getById(id);
        serveJsonObj(res, taskData);
    } else
    if (req.url === "/api/task/delete" && req.method === "POST" ) {
        let data = await getPostData(req);
        let result = {};

        if (!data || !data.id) {
            result = { message: "Bad id" };
            serveJsonObj(res, result);
            return;
        }

        result = await tasksController.deleteById(data.id);
        serveJsonObj(res, result);
    } else {
        serveStaticFile(req, res);
    }
}





