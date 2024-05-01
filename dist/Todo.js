export default class Todo {
    constructor(title, description) {
        this.id = this.randomId();
        this.title = title || "";
        this.description = description || "";
        this.isFinish = false;
    }
    randomId() {
        return Math.random() * 10000;
    }
}
