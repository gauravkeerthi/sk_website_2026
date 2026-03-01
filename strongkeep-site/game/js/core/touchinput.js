// Touch input handler - integrates virtual buttons with InputManager
export class TouchInputHandler {
    constructor(inputManager) {
        this.previousState = {
            leftPressed: false,
            rightPressed: false,
            jumpPressed: false,
            throwPressed: false,
        };
        this.inputManager = inputManager;
        this.setupTouchInputSimulation();
    }
    setupTouchInputSimulation() {
        // Always run the update loop
        const updateTouchInput = () => {
            const tc = window.touchControls;
            if (tc) {
                // Check each button state and trigger events on state changes
                this.handleButtonStateChange("leftPressed", tc.leftPressed, "KeyA");
                this.handleButtonStateChange("rightPressed", tc.rightPressed, "KeyD");
                this.handleButtonStateChange("jumpPressed", tc.jumpPressed, "KeyW");
                this.handleButtonStateChange("throwPressed", tc.throwPressed, "Space");
            }
            // Update again next frame
            requestAnimationFrame(updateTouchInput);
        };
        // Start the update loop immediately
        updateTouchInput();
    }
    handleButtonStateChange(buttonName, isPressed, keyCode) {
        const wasPressed = this.previousState[buttonName];
        // Only dispatch events when state changes
        if (isPressed && !wasPressed) {
            // Button pressed
            this.dispatchKeyEvent("keydown", keyCode);
            this.previousState[buttonName] = true;
        }
        else if (!isPressed && wasPressed) {
            // Button released
            this.dispatchKeyEvent("keyup", keyCode);
            this.previousState[buttonName] = false;
        }
    }
    dispatchKeyEvent(eventType, keyCode) {
        const event = new KeyboardEvent(eventType, {
            code: keyCode,
            bubbles: true,
            cancelable: true,
        });
        window.dispatchEvent(event);
    }
}
