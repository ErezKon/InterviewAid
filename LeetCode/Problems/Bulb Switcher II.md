# 672. Bulb Switcher II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulb-switcher-ii](https://leetcode.com/problems/bulb-switcher-ii)
**Companies:** Microsoft

---

## 1. Problem Description

There are `n` bulbs and 4 button types (toggle all, toggle even, toggle odd, toggle 3k+1). After pressing buttons exactly `presses` times total, how many distinct bulb configurations are possible?

---

## 2. Key Insight

> Each button is an involution (pressing twice cancels). Only the **parity** of each button's press count matters → at most 2^4 = 16 combinations. But buttons have dependencies: the pattern repeats with period 3, so only the first 3 bulbs matter. The answer depends on `min(n, 3)` and `presses`.

---

## 3. Approach: Case Analysis — O(1) ✅

```
FUNCTION flipLights(n, presses):
    IF presses == 0: RETURN 1
    IF n == 1: RETURN 2
    IF n == 2: RETURN 3 IF presses == 1 ELSE 4
    // n >= 3
    IF presses == 1: RETURN 4
    IF presses == 2: RETURN 7
    RETURN 8  // presses >= 3
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## Key Takeaway

> When operations are involutions, only parities matter. With 4 buttons and period-3 patterns, the answer space is small enough for complete case analysis.
