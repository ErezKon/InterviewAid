# 672. Bulb Switcher II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulb-switcher-ii](https://leetcode.com/problems/bulb-switcher-ii)
**Companies:** Microsoft

---

## 1. Problem Description

There is a room with `n` bulbs labeled from `1` to `n` that all are turned on initially, and **four buttons** on the wall. Each of the four buttons has a different functionality where:

- **Button 1:** Flips the status of all the bulbs.
- **Button 2:** Flips the status of all the bulbs with even labels (i.e., `2, 4, ...`).
- **Button 3:** Flips the status of all the bulbs with odd labels (i.e., `1, 3, ...`).
- **Button 4:** Flips the status of all the bulbs with a label `j = 3k + 1` where `k = 0, 1, 2, ...` (i.e., `1, 4, 7, 10, ...`).

You must make **exactly** `presses` button presses in total. For each press, you may pick **any** of the four buttons to press.

Given the two integers `n` and `presses`, return *the number of **different possible statuses** after performing all* `presses` *button presses*.

**Constraints:**
- `1 ≤ n ≤ 1000`
- `0 ≤ presses ≤ 1000`

---

## 2. Key Insight

> Each button is an involution (pressing twice cancels). Only the **parity** of each button's press count matters → at most 2^4 = 16 combinations. But buttons have dependencies: the pattern repeats with period 3, so only the first 3 bulbs matter. The answer depends on `min(n, 3)` and `presses`.

---

## 3. Approach: Case Analysis — O(1) ✅

```text
FUNCTION flipLights(n, presses):
    IF presses == 0:
        RETURN 1
    IF n == 1:
        RETURN 2
    IF n == 2:
        IF presses == 1:
            RETURN 3
        ELSE:
            RETURN 4
    // n >= 3
    IF presses == 1:
        RETURN 4
    IF presses == 2:
        RETURN 7
    RETURN 8  // presses >= 3
```

---

## 4. Examples

```
Example 1:
  Input: n = 1, presses = 1
  Output: 2
  Explanation: Status can be:
  - [off] by pressing button 1
  - [on] by pressing button 2

Example 2:
  Input: n = 2, presses = 1
  Output: 3
  Explanation: Status can be:
  - [off, off] by pressing button 1
  - [on, off] by pressing button 2
  - [off, on] by pressing button 3

Example 3:
  Input: n = 3, presses = 1
  Output: 4
  Explanation: Status can be:
  - [off, off, off] by pressing button 1
  - [on, off, on] by pressing button 2
  - [off, on, off] by pressing button 3
  - [off, on, on] by pressing button 4
```

---

## 5. Walkthrough

Consider `n = 2` and `presses = 1`.
1. Start with both bulbs off: `[0,0]`.
2. Press **Button 1** (toggle all) → `[1,1]`.
3. Press **Button 2** (toggle even) → `[0,1]`.
4. Press **Button 3** (toggle odd) → `[1,0]`.
5. Press **Button 4** (toggle 3k+1) has no effect for `k=0` (first bulb) → `[1,0]` again.
Collecting unique states gives three configurations: `[0,0]`, `[1,1]`, `[1,0]` (or `[0,1]`).

---

## 6. Complexity Analysis

- **Time:** O(1) – constant-time case analysis.
- **Space:** O(1) – only a few integer variables.

---

## 7. Follow-Up Questions

- How would the solution change if the buttons could be pressed any number of times (not limited by parity)?
- Can you extend the analysis to support `n` up to 10^9 efficiently?
- What if additional button types with different toggle patterns are introduced?

---

## Key Takeaway

> When operations are involutions, only parities matter. With 4 buttons and period-3 patterns, the answer space is small enough for complete case analysis.
