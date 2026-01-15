import { abcFlow } from './abcFlow';
import { sosFlow } from './sosFlow';
import { stopPauseFlow } from './stopPauseFlow';
import { groundingFlow } from './groundingFlow';
import { decatastrophizeFlow } from './decatastrophizeFlow';
import { dichotomyFlow } from './dichotomyFlow';
import { morningFlow } from './morningFlow';
import { eveningFlow } from './eveningFlow';
import { viewFromAboveFlow } from './viewFromAboveFlow';

export {
  abcFlow,
  sosFlow,
  stopPauseFlow,
  groundingFlow,
  decatastrophizeFlow,
  dichotomyFlow,
  morningFlow,
  eveningFlow,
  viewFromAboveFlow,
};

// Flow map for easy access by ID
export const flowsById = {
  'abc-diary': abcFlow,
  'sos': sosFlow,
  'stop-pause': stopPauseFlow,
  'grounding': groundingFlow,
  'decatastrophize': decatastrophizeFlow,
  'dichotomy': dichotomyFlow,
  'morning': morningFlow,
  'evening': eveningFlow,
  'view-from-above': viewFromAboveFlow,
};

export function getFlowById(id) {
  return flowsById[id] || null;
}
