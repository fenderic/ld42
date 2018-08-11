class Actor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.children = [];
    this.parent = null;
  }

  addChild(child) {
    this.children.push(child);
    if (child.parent) {
      child.parent.removeChild(child);
    }
    child.parent = this;
  }

  removeChild(removeChild) {
    const index = this.children.findIndex(
        child => child === removeChild);
    if (index) {
      this.children.splice(index, 1);
    }
    removeChild.parent = null;
  }

  removeFromParent() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  setPoint(x, y) {
    this.x = x;
    this.y = y;
  }

  getPoint() {
    let point = [this.x, this.y];
    if (this.parent) {
      const parentPoint = this.parent.getPoint();
      point = [
        point[0] + parentPoint[0],
        point[1] + parentPoint[1],
      ];
    }
    return point;
  }

  update(timeDelta) {

  }

  draw(ctx) {

  }
}

Actor.traverse = (actor, cb) => {
  cb(actor);
  for (let child of actor.children) {
    Actor.traverse(child, cb);
  }
};

ld42.Actor = Actor;
