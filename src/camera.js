class Camera extends ld42.Actor {
  constructor(canvas) {
    super(0, 0);
    this.canvas = canvas;
  }

  updateAndDraw(root, timeDelta, ctx) {
    ld42.Actor.traverse(root, actor => actor.update(timeDelta / 1000));
    ld42.Actor.traverse(root, actor => this.project(actor));
    ld42.Actor.traverse(root, actor => actor.transformAndDraw(ctx));
  }

  project(actor) {
    const relative = ld42.Point.difference(actor.getPoint(), this.getPoint());
    if (relative.x > this.canvas.width || relative.x < 0 || relative.y < 0 ||
        relative.y > this.canvas.height) {
      actor.setProjectedPoint(null);
    } else {
      actor.setProjectedPoint(relative);
    }
  }
}

ld42.Camera = Camera;
