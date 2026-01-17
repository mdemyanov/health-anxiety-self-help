import { abcFlow } from './abcFlow';
import { sosFlow } from './sosFlow';
import { stopPauseFlow } from './stopPauseFlow';
import { groundingFlow } from './groundingFlow';
import { decatastrophizeFlow } from './decatastrophizeFlow';
import { dichotomyFlow } from './dichotomyFlow';
import { morningFlow } from './morningFlow';
import { eveningFlow } from './eveningFlow';
import { viewFromAboveFlow } from './viewFromAboveFlow';
import { doubleStandardFlow } from './doubleStandardFlow';
import { tripleColumnFlow } from './tripleColumnFlow';
import { factsVsFeelingsFlow } from './factsVsFeelingsFlow';
import { shouldStatementsFlow } from './shouldStatementsFlow';
import { impostorSyndromeFlow } from './impostorSyndromeFlow';
import { decisionFlow } from './decisionFlow';

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
  doubleStandardFlow,
  tripleColumnFlow,
  factsVsFeelingsFlow,
  shouldStatementsFlow,
  impostorSyndromeFlow,
  decisionFlow,
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
  'double-standard': doubleStandardFlow,
  'triple-column': tripleColumnFlow,
  'facts-vs-feelings': factsVsFeelingsFlow,
  'should-statements': shouldStatementsFlow,
  'impostor-syndrome': impostorSyndromeFlow,
  'decision': decisionFlow,
};

export function getFlowById(id) {
  return flowsById[id] || null;
}
