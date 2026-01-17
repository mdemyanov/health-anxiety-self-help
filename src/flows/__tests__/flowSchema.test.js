import { describe, it, expect } from 'vitest';
import {
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
  flowsById,
  getFlowById,
} from '../index';

// All flows for testing
const allFlows = [
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
];

// Flow names for readable test output
const flowNames = [
  'abcFlow',
  'sosFlow',
  'stopPauseFlow',
  'groundingFlow',
  'decatastrophizeFlow',
  'dichotomyFlow',
  'morningFlow',
  'eveningFlow',
  'viewFromAboveFlow',
  'doubleStandardFlow',
  'tripleColumnFlow',
  'factsVsFeelingsFlow',
  'shouldStatementsFlow',
  'impostorSyndromeFlow',
  'decisionFlow',
];

describe('Flow Schema Validation', () => {
  describe.each(flowNames.map((name, i) => [name, allFlows[i]]))(
    '%s',
    (name, flow) => {
      it('should have required top-level properties', () => {
        expect(flow).toHaveProperty('id');
        expect(flow).toHaveProperty('title');
        expect(flow).toHaveProperty('steps');
      });

      it('should have valid id (string)', () => {
        expect(typeof flow.id).toBe('string');
        expect(flow.id.length).toBeGreaterThan(0);
      });

      it('should have valid title (string)', () => {
        expect(typeof flow.title).toBe('string');
        expect(flow.title.length).toBeGreaterThan(0);
      });

      it('should have non-empty steps array', () => {
        expect(Array.isArray(flow.steps)).toBe(true);
        expect(flow.steps.length).toBeGreaterThan(0);
      });

      it('should have valid step structure', () => {
        flow.steps.forEach((step, stepIndex) => {
          expect(step).toHaveProperty(
            'id',
            expect.any(String)
          );
          expect(step).toHaveProperty('messages');
          expect(Array.isArray(step.messages)).toBe(true);
        });
      });

      it('should have valid message structure in all steps', () => {
        flow.steps.forEach((step) => {
          step.messages.forEach((msg) => {
            expect(msg).toHaveProperty('type');
            expect(typeof msg.type).toBe('string');

            // delay should be number if present
            if ('delay' in msg) {
              expect(typeof msg.delay).toBe('number');
              expect(msg.delay).toBeGreaterThanOrEqual(0);
            }

            // content should be string if present
            if ('content' in msg && msg.content !== null && msg.content !== undefined) {
              expect(typeof msg.content).toBe('string');
            }
          });
        });
      });

      it('should have unique step IDs within flow', () => {
        const stepIds = flow.steps.map((s) => s.id);
        const uniqueIds = new Set(stepIds);
        expect(uniqueIds.size).toBe(stepIds.length);
      });
    }
  );

  describe('all flows', () => {
    it('should have unique IDs across all flows', () => {
      const allIds = allFlows.map((f) => f.id);
      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });

    it('should have 15 flows total', () => {
      expect(allFlows).toHaveLength(15);
    });
  });
});

describe('flowsById', () => {
  it('should contain all 15 flows', () => {
    expect(Object.keys(flowsById)).toHaveLength(15);
  });

  it('should have correct mappings', () => {
    expect(flowsById['abc-diary']).toBe(abcFlow);
    expect(flowsById['sos']).toBe(sosFlow);
    expect(flowsById['stop-pause']).toBe(stopPauseFlow);
    expect(flowsById['grounding']).toBe(groundingFlow);
    expect(flowsById['decatastrophize']).toBe(decatastrophizeFlow);
    expect(flowsById['dichotomy']).toBe(dichotomyFlow);
    expect(flowsById['morning']).toBe(morningFlow);
    expect(flowsById['evening']).toBe(eveningFlow);
    expect(flowsById['view-from-above']).toBe(viewFromAboveFlow);
    expect(flowsById['double-standard']).toBe(doubleStandardFlow);
    expect(flowsById['triple-column']).toBe(tripleColumnFlow);
    expect(flowsById['facts-vs-feelings']).toBe(factsVsFeelingsFlow);
    expect(flowsById['should-statements']).toBe(shouldStatementsFlow);
    expect(flowsById['impostor-syndrome']).toBe(impostorSyndromeFlow);
    expect(flowsById['decision']).toBe(decisionFlow);
  });

  it('should have IDs that match flow.id property', () => {
    Object.entries(flowsById).forEach(([key, flow]) => {
      expect(flow.id).toBe(key);
    });
  });
});

describe('getFlowById', () => {
  it('should return correct flow for valid ID', () => {
    expect(getFlowById('abc-diary')).toBe(abcFlow);
    expect(getFlowById('sos')).toBe(sosFlow);
    expect(getFlowById('morning')).toBe(morningFlow);
  });

  it('should return null for invalid ID', () => {
    expect(getFlowById('nonexistent')).toBeNull();
    expect(getFlowById('')).toBeNull();
    expect(getFlowById('random-id')).toBeNull();
  });

  it('should return null for undefined/null', () => {
    expect(getFlowById(undefined)).toBeNull();
    expect(getFlowById(null)).toBeNull();
  });
});

describe('specific flow validations', () => {
  describe('sosFlow', () => {
    it('should have SOS-specific properties', () => {
      expect(sosFlow.id).toBe('sos');
      expect(sosFlow.title).toContain('SOS');
    });

    it('should have breathing exercise step', () => {
      const hasBreathing = sosFlow.steps.some((step) =>
        step.messages.some((msg) => msg.type === 'breathing')
      );
      expect(hasBreathing).toBe(true);
    });
  });

  describe('abcFlow', () => {
    it('should have ABC-diary specific properties', () => {
      expect(abcFlow.id).toBe('abc-diary');
    });

    it('should collect A, B, C data points', () => {
      const saveAsKeys = [];
      abcFlow.steps.forEach((step) => {
        step.messages.forEach((msg) => {
          if (msg.saveAs) {
            saveAsKeys.push(msg.saveAs);
          }
        });
      });
      expect(saveAsKeys).toContain('A');
      expect(saveAsKeys).toContain('B');
      expect(saveAsKeys).toContain('C');
    });
  });

  describe('groundingFlow', () => {
    it('should have grounding-specific structure', () => {
      expect(groundingFlow.id).toBe('grounding');
    });
  });

  describe('morningFlow', () => {
    it('should have morning practice properties', () => {
      expect(morningFlow.id).toBe('morning');
      expect(morningFlow.title.toLowerCase()).toContain('утр');
    });
  });

  describe('eveningFlow', () => {
    it('should have evening reflection properties', () => {
      expect(eveningFlow.id).toBe('evening');
      expect(eveningFlow.title.toLowerCase()).toContain('вечер');
    });
  });
});
