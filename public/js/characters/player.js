import Phaser from "phaser";
const spriteSpeed = 100;

export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    update(keyUp, keyDown, keyLeft, keyRight, jUp, jDown, jLeft, jRight, type, self) {
        let velY = 0;

        if (keyUp.isDown || jUp.isDown) {
            velY = -spriteSpeed;
        }
        if (keyDown.isDown || jDown.isDown) {
            velY = spriteSpeed;
        }

        if (keyUp.isDown || jUp.isDown) {
            //this.setVelocity(0, -spriteSpeed)
            this.setVelocity(0, -spriteSpeed);
        }
        if (keyDown.isDown || jDown.isDown) {
            this.setVelocity(0, +spriteSpeed)
            //this.y += spriteSpeed;
        }
        if (keyLeft.isDown || jLeft.isDown) {
            this.setVelocity(-spriteSpeed, velY);
            //this.x -= spriteSpeed;
        }
        if (keyRight.isDown || jRight.isDown) {
            this.setVelocity(+spriteSpeed, velY);
            //this.x += spriteSpeed;
        }
        if (this.anims) {
            if (keyUp.isDown || jUp.isDown) {
                this.anims.play(`player-walk-up${type}`, true);
            } else if (keyDown.isDown || jDown.isDown) {
                this.anims.play(`player-walk-down${type}`, true);
            } else if (keyLeft.isDown || jLeft.isDown) {
                this.anims.play(`player-walk-left${type}`, true);
            } else if (keyRight.isDown || jRight.isDown) {
                this.anims.play(`player-walk-right${type}`, true);
            }      

            if (!(keyUp.isDown || jUp.isDown) && !(keyDown.isDown || jDown.isDown) && !(keyLeft.isDown || jLeft.isDown) && !(keyRight.isDown || jRight.isDown)) {
                this.anims.stop();
                this.setVelocity(0, 0)
            }
        }
    }
}

Phaser.GameObjects.GameObjectFactory.register('player', function (x, y, texture,  frame) {
	var sprite = new Player(this.scene, x, y, texture, frame).setScale(1);
	this.displayList.add(sprite);
	this.updateList.add(sprite);

    this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);
    sprite.setOffset(0, sprite.height * 0.7);
    sprite.setBodySize(sprite.width * 0.85, sprite.height * 0.3, false);
	return sprite;
})