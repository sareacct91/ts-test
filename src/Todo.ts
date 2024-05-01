export default class Todo {
  id: number;
  title: string;
  description: string;
  isFinish: boolean;

  constructor(title: string, description: string) {
    this.id = this.randomId();
    this.title = title || "";
    this.description = description || "";
    this.isFinish = false;
  }

  private randomId(): number {
    return Math.random() * 10000;
  }
}
