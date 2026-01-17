import { abcFlow } from './abcFlow';
import { sosFlow } from './sosFlow';
import { sosQuickFlow } from './sosQuickFlow';
import { stopPauseFlow } from './stopPauseFlow';
import { groundingFlow } from './groundingFlow';
import { decatastrophizeFlow } from './decatastrophizeFlow';
import { dichotomyFlow } from './dichotomyFlow';
import { morningFlow } from './morningFlow';
import { morningQuickFlow } from './morningQuickFlow';
import { eveningFlow } from './eveningFlow';
import { eveningQuickFlow } from './eveningQuickFlow';
import { viewFromAboveFlow } from './viewFromAboveFlow';
import { doubleStandardFlow } from './doubleStandardFlow';
import { tripleColumnFlow } from './tripleColumnFlow';
import { factsVsFeelingsFlow } from './factsVsFeelingsFlow';
import { shouldStatementsFlow } from './shouldStatementsFlow';
import { impostorSyndromeFlow } from './impostorSyndromeFlow';
import { decisionFlow } from './decisionFlow';
import { workLifeBalanceFlow } from './workLifeBalanceFlow';

export {
  abcFlow,
  sosFlow,
  sosQuickFlow,
  stopPauseFlow,
  groundingFlow,
  decatastrophizeFlow,
  dichotomyFlow,
  morningFlow,
  morningQuickFlow,
  eveningFlow,
  eveningQuickFlow,
  viewFromAboveFlow,
  doubleStandardFlow,
  tripleColumnFlow,
  factsVsFeelingsFlow,
  shouldStatementsFlow,
  impostorSyndromeFlow,
  decisionFlow,
  workLifeBalanceFlow,
};

// Flow map for easy access by ID
export const flowsById = {
  'abc-diary': abcFlow,
  'sos': sosFlow,
  'sos-quick': sosQuickFlow,
  'stop-pause': stopPauseFlow,
  'grounding': groundingFlow,
  'decatastrophize': decatastrophizeFlow,
  'dichotomy': dichotomyFlow,
  'morning': morningFlow,
  'morning-quick': morningQuickFlow,
  'evening': eveningFlow,
  'evening-quick': eveningQuickFlow,
  'view-from-above': viewFromAboveFlow,
  'double-standard': doubleStandardFlow,
  'triple-column': tripleColumnFlow,
  'facts-vs-feelings': factsVsFeelingsFlow,
  'should-statements': shouldStatementsFlow,
  'impostor-syndrome': impostorSyndromeFlow,
  'decision': decisionFlow,
  'work-life-balance': workLifeBalanceFlow,
};

export function getFlowById(id) {
  return flowsById[id] || null;
}
