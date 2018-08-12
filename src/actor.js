class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

Point.sum = (a, b) => {
  return new Point(a.x + b.x, a.y + b.y);
};

Point.difference = (a, b) => {
  return new Point(a.x - b.x, a.y - b.y);
};

ld42.Point = Point;

class Actor {
  constructor(x = 0, y = 0) {
    this.point = new Point(x, y);
    this.children = [];
    this.parent = null;
    this.projectedPoint = null;
  }

  setProjectedPoint(projectedPoint) {
    this.projectedPoint = projectedPoint;
  }

  getProjectedPoint() {
    return this.projectedPoint;
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
    this.point = new Point(x, y);
  }

  getPoint() {
    let point = this.point;
    if (this.parent) {
      const parentPoint = this.parent.getPoint();
      point = Point.sum(parentPoint, point);
    }
    return point;
  }

  update(timeDelta) {

  }

  draw(ctx) {

  }

  transformAndDraw(ctx) {
    if (!this.getProjectedPoint()) {
      return;
    }
    ctx.save();
    ctx.translate(
        Math.round(this.getProjectedPoint().x),
        Math.round(this.getProjectedPoint().y));
    this.draw(ctx);
    ctx.restore();
  }
}

Actor.traverse = (actor, cb) => {
  cb(actor);
  for (let child of actor.children) {
    Actor.traverse(child, cb);
  }
};

ld42.Actor = Actor;
