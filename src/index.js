import Phaser from 'phaser';
import WorkLogo from './assets/sprites/sprite-sheets/work-logo-sheet.png'
import WorkStationSpriteSheet from './assets/sprites/sprite-sheets/work-station-12x.png'
import WorkStationSpriteSheet2 from './assets/sprites/sprite-sheets/work-station-empty2x.png'
import Font from './assets/fonts/VCR_OSD_MONO_1.001.ttf'

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }
    
     preload ()
    {
        this.load.spritesheet('work-logo', WorkLogo, { frameWidth: 493, frameHeight: 107, endFrame: 0 });
        this.load.spritesheet('work-station', WorkStationSpriteSheet, { frameWidth: 128, frameHeight: 128, endFrame: 14 });
        this.load.spritesheet('work-station-empty2x', WorkStationSpriteSheet2, { frameWidth: 128, frameHeight: 128, endFrame: 41 });    
    }
    
    
     create ()
    {

        var config = {
            key: 'work-station-animation',
            frames: this.anims.generateFrameNumbers('work-station', { start: 0, end: 13, first: 0 }),
            frameRate: 20,
            repeat: -1
        };
    
        var config2 = {
            key: 'work-station-empty-animation',
            frames: this.anims.generateFrameNumbers('work-station-empty2x', { start: 1, end: 11, first: 0 }),
            frameRate: 20,
            repeat: -1
        };
    
        var config3 = {
            key: 'work-station-empty-animation-unplugged',
            frames: this.anims.generateFrameNumbers('work-station-empty2x', { start: 12, end: 12, first: 0 }),
            frameRate: 20,
            repeat: -1
        };
    
        var config4 = {
            key: 'work-station-empty-animation-horned-god',
            frames: this.anims.generateFrameNumbers('work-station-empty2x', { start: 21, end: 41, first: 0 }),
            frameRate: 20,
            repeat: -1
        };
    
        var config5 = {
            key: 'work-logo',
            frames: this.anims.generateFrameNumbers('work-logo', { start: 0, end: 1, first: 0 }),
            frameRate: 20,
            repeat: 1
        };
    
        this.anims.create(config);
        this.anims.create(config2);
        this.anims.create(config3);
        this.anims.create(config4);
        this.anims.create(config5);
    
    
        this.add.sprite(100, 300, 'work-station-empty2x').play('work-station-empty-animation');
        this.add.sprite(250, 300, 'work-station-empty2x').play('work-station-empty-animation-unplugged');
        this.add.sprite(400, 300, 'work-station').play('work-station-animation');
        this.add.sprite(550, 300, 'work-station-empty2x').play('work-station-empty-animation-horned-god');
        this.add.sprite(700, 300, 'work-station-empty2x').play('work-station-empty-animation-unplugged');
    
        tagline = this.add.text(50, 400, '', { font: '80px Arial' });
        tagline.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
        label = this.add.text(100, 100, '', { fontFamily: Font, fontSize: 60 })
        label.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
        this.typewriteText([['Life '], [' '], ['is ', 'a ', 'jerk'], ['Be ', 'a ', 'bigger ', 'jerk'],[' '],[' ']], ['400', '100', '300', '300', '100', '2000'])
        // timedEvent = this.time.addEvent({ delay: 3000, callback: this.onLogoEvent, callbackScope: this, loop: false });
    
    }

    typewriteText(text, delay)
    {
        const length = text.length
        let i = 0
        let j = 0
        var timer = this.time.addEvent({
            callback: () => {
                timer.delay = parseInt(delay[i])
                if (i < length && j < text[i].length) {
                    label.text += text[i][j]
                    ++j
                } else {
                    label.text = ''
                    i = ++i % 6
                    j = 0
                    if (i === text.length - 1) {
                        this.onLogoEvent()
                    }
                }

                if (i === 0) tagline.destroy()
                
            },
            repeat: -1,
            delay: parseInt(delay[i])
        })
    }


    onLogoEvent ()
    {
        console.log("CALLED 3 ONEVENT")
        tagline = this.add.sprite(400, 100, 'work-logo').play('work-logo');
        tagline.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000)
        return
        
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: MyGame
};

var timedEvent;
var tagline;
var label;
const game = new Phaser.Game(config);
