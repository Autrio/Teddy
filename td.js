let bambooImage = null; // Variable to hold the bamboo image
let pandaFace = document.querySelector(".face"); // The face of the panda (assumes .face exists)
let mouth = document.querySelector(".mouth");
let nose = document.querySelector(".nose");
let isHappy = false; // Track the happy state of the panda

// Define mouth position and size (adjust based on your specific setup)
const mouthArea = document.querySelector(".mouth_area"); // Assuming there's an element with class "mouth"

// Create bamboo image when mouse button is pressed down
document.addEventListener("mousedown", () => {
    if (!bambooImage) {
        bambooImage = document.createElement("img");
        bambooImage.src = "bamboo.svg"; // Use your bamboo.svg here
        bambooImage.style.position = "absolute";
        bambooImage.style.pointerEvents = "none"; // Prevent it from blocking interactions with other elements
        bambooImage.style.width = "50px"; // Set a fixed size for the bamboo image (adjust as needed)
        bambooImage.style.height = "50px"; // Same here
        bambooImage.style.zIndex = "9999"; // Ensure it's on top of other elements
        document.body.appendChild(bambooImage);
    }
});

// Remove bamboo image when mouse button is released and check for mouth area
document.addEventListener("mouseup", () => {
    if (bambooImage && mouthArea) {
        const bambooRect = bambooImage.getBoundingClientRect();
        const mouthRect = mouthArea.getBoundingClientRect(); // Recalculate mouthRect during mouseup

        // Check if the bamboo is within the mouth area
        if (
            bambooRect.left >= mouthRect.left &&
            bambooRect.right <= mouthRect.right &&
            bambooRect.top >= mouthRect.top &&
            bambooRect.bottom <= mouthRect.bottom
        ) {
            // Panda is happy, change expression (for example, add a class or change appearance)
            if (!isHappy && pandaFace) {
                pandaFace.classList.add("happy"); // Add a "happy" class to the panda face
                isHappy = true;
                mouth.classList.remove("open");
                nose.classList.remove("noseup");
                setTimeout(() => {
                    pandaFace.classList.remove("happy");
                    isHappy = false;
                }, 5000); // Remove after 3 seconds
            }
        } else {
            // Panda is not happy, reset expression immediately
            if (isHappy && pandaFace) {
                pandaFace.classList.remove("happy");
                isHappy = false;
            }
        }

        // Remove bamboo image
        document.body.removeChild(bambooImage);
        bambooImage = null; // Reset the variable
    }
});

// Update bamboo position on mousemove while mouse button is held
document.addEventListener("mousemove", (event) => {
    if (bambooImage) {
        const x = event.clientX;
        const y = event.clientY;
        
        // Position the bamboo image to follow the cursor
        bambooImage.style.left = `${x - bambooImage.width / 2}px`;
        bambooImage.style.top = `${y - bambooImage.height / 2}px`;
    }

    if (bambooImage && mouthArea) {
        const bambooRect = bambooImage.getBoundingClientRect();
        const mouthRect = mouthArea.getBoundingClientRect(); // Recalculate mouthRect during mousemove

        // Check if the bamboo is within the mouth area
        if (
            bambooRect.left >= mouthRect.left &&
            bambooRect.right <= mouthRect.right &&
            bambooRect.top >= mouthRect.top &&
            bambooRect.bottom <= mouthRect.bottom
        ) {
            mouth.classList.add("open");
            nose.classList.add("noseup");
        } else {
            mouth.classList.remove("open");
            nose.classList.remove("noseup");
        }
    }
    
    const eyes = document.querySelectorAll(".inner-eye");

    const face = document.querySelector(".face");
    const faceRect = face.getBoundingClientRect();
    const faceCenterX = faceRect.left + faceRect.width / 2;
    const faceCenterY = faceRect.top + faceRect.height / 2;

    if (bambooImage) {
        eyes.forEach(eye => {
            const eyeRect = eye.getBoundingClientRect();
            const eyeCenterX = eyeRect.left + eyeRect.width / 2;
            const eyeCenterY = eyeRect.top + eyeRect.height / 2;

            const deltaX = event.clientX - eyeCenterX;
            const deltaY = event.clientY - eyeCenterY;
            const angle = Math.atan2(deltaY, deltaX);

            const maxOffset = 10; // Maximum movement of the pupil
            const offsetX = Math.cos(angle) * maxOffset;
            const offsetY = Math.sin(angle) * maxOffset;

            eye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    } else {
        eyes.forEach(eye => {
            eye.style.transform = "none";
        });
    }
});
