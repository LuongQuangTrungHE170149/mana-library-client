import { createNavigationContainerRef } from "@react-navigation/native";

// Create a navigation reference that can be used outside of React components
export const navigationRef = createNavigationContainerRef();

/**
 * Navigate to a specific screen
 * @param {string} name - The name of the route
 * @param {object} params - Parameters to pass to the route
 */
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    console.warn("Navigation attempted before navigator was ready");
  }
}

/**
 * Reset the navigation state to the provided state
 * @param {number} index - The active route's index
 * @param {string|array} routes - Route name or array of route objects
 */
export function reset(index, routes) {
  if (navigationRef.isReady()) {
    if (typeof routes === "string") {
      navigationRef.reset({
        index: index || 0,
        routes: [{ name: routes }],
      });
    } else {
      navigationRef.reset({
        index: index || 0,
        routes,
      });
    }
  } else {
    console.warn("Navigation reset attempted before navigator was ready");
  }
}

/**
 * Go back to the previous screen
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  } else {
    console.warn("Cannot go back or navigator not ready");
  }
}

/**
 * Get the current route name
 * @returns {string} Current route name
 */
export function getCurrentRoute() {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute().name;
  }
  return null;
}

/**
 * Get current navigation state
 * @returns {object} Current navigation state
 */
export function getState() {
  if (navigationRef.isReady()) {
    return navigationRef.getState();
  }
  return null;
}

/**
 * Navigate to a nested screen
 * @param {Array<string>} screenNames - Array of screen names to navigate through
 * @param {object} params - Parameters for the final screen
 */
export function navigateNested(screenNames, params) {
  if (!navigationRef.isReady() || !screenNames || !screenNames.length) {
    return;
  }

  let navigateAction = { name: screenNames[0] };

  if (screenNames.length > 1) {
    for (let i = screenNames.length - 1; i > 0; i--) {
      navigateAction = {
        name: screenNames[i - 1],
        params: {
          screen: screenNames[i],
          ...(i === screenNames.length - 1 ? { params } : {}),
        },
      };
    }
  } else if (params) {
    navigateAction.params = params;
  }

  navigationRef.navigate(navigateAction.name, navigateAction.params);
}
