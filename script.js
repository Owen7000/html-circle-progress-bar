
/**
 * Set the value of a radial progress bar
 * 
 * @param {int} i  The starting value. If none is provided, it is assumed to be 0
 * @param {int} target  The target value. If none is provuded, it is assumed to be 100
 * @param {int} delay  The delay(In milliseconds) between each increment. Defaults to 2
 * @param {boolean} smooth  If true, the animation will play. If false, the value is immediatelly set. Defaults to true
 * @param {string} elementId The id of the progress bar you are targetting
 * @param {int} hueAtComplete If this is defined, the value provided will be applied to the --hue attribute of the style tag when i=target+1. If not provided, nothing will happen
 * @returns 
 */
function setValue(i=0, target = 100, delay = 2, smooth = true, elementId, hueAtComplete) {
    const radialProgress = document.getElementById(elementId);
  
    if (!radialProgress) {
      console.error(`Element with ID ${elementId} not found.`);
      return;
    }
  
    if (!smooth) {
      const value = `${target}%`;
      radialProgress.style.setProperty("--progress", value);
      radialProgress.innerHTML = value;
      radialProgress.setAttribute("aria-valuenow", value);
      return;
    }
  
    if (i <= target) {
      const value = `${i}%`;
      radialProgress.style.setProperty("--progress", value);
      radialProgress.innerHTML = value;
      radialProgress.setAttribute("aria-valuenow", value);
      i++;
  
      setTimeout(() => setValue(i, target, delay, smooth, elementId, hueAtComplete), delay);
    } else if (i == target+1 && hueAtComplete) {
      radialProgress.style.setProperty("--hue", hueAtComplete);
      radialProgress.style.setProperty("--holesize", "0%");
    }
  }
  
  setValue(0, 100, 0, true, 'prog1');