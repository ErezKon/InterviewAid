# 3347. Maximum Frequency of an Element After Performing Operations II

**Difficulty:** 🔴 Hard
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Each element in the array can be increased or decreased by at most `k`. Additionally, you may perform at most `numOperations` changes across the entire array. After applying any number of such operations (subject to the limit), determine the maximum possible frequency of any single value.

---

## Examples

| nums | k | numOperations | Output |
|------|---|---------------|--------|
| [1,2,4] | 1 | 2 | 2 |
| [3,3,3] | 0 | 0 | 3 |
| [1,5,9] | 3 | 1 | 1 |

*Explanation*: In the first example, we can change `1` to `2` (cost 1) and `4` to `3` (cost 1) using two operations, achieving two `2`s. The second example already has all elements equal. In the third example, the allowed range for each element does not overlap enough to create a duplicate within a single operation.

---

## Approach

Each element `x` defines an interval `[x‑k, x+k]` of values it can become. The problem reduces to finding a target value where the number of intervals covering it (i.e., elements that can reach it) is maximized, but we can only actually change at most `numOperations` of those elements. A sweep‑line (difference‑array) over all interval endpoints gives the count of elements that can reach each target. For each target value we compute:

```
reachable ← sweepHeightAt(target)
already   ← countExact[target]
canChange ← MIN(reachable - already, numOperations)
candidate ← already + canChange
```
The answer is the maximum candidate across all targets.

```text
FUNCTION maxFrequency(nums, k, numOperations):
    // Build difference events for intervals
    events ← []
    FOR num IN nums:
        events.ADD((num - k, +1))
        events.ADD((num + k + 1, -1))
    SORT events BY first element

    // Count exact occurrences of each value
    exactCount ← MAP()
    FOR num IN nums:
        exactCount[num] ← exactCount.get(num, 0) + 1

    sweep ← 0
    answer ← 0
    FOR each (pos, delta) IN events:
        sweep ← sweep + delta
        // Evaluate at this position (pos) as a possible target
        already ← exactCount.get(pos, 0)
        canChange ← MIN(sweep - already, numOperations)
        answer ← MAX(answer, already + canChange)
    RETURN answer
```

---

## Walkthrough

Take `nums = [1,2,4]`, `k = 1`, `numOperations = 2`.

1. Build events:
   - For `1`: (+1 at 0), (‑1 at 3)
   - For `2`: (+1 at 1), (‑1 at 4)
   - For `4`: (+1 at 3), (‑1 at 6)
2. Sorted events: (0,+1), (1,+1), (3,-1), (3,+1), (4,-1), (6,-1)
3. Sweep:
   - pos 0: sweep=1 → reachable=1, already=0 → candidate=0+MIN(1,2)=1
   - pos 1: sweep=2 → reachable=2, already=0 → candidate=2
   - pos 3: sweep=1 (after -1) then 2 (after +1) → reachable=2, already=0 → candidate=2
   - pos 4: sweep=1 → candidate=1
   - pos 6: sweep=0 → candidate=0
   Maximum candidate = 2.

Thus the answer is 2.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sweep line (difference array) | **O(n log n)** (sorting events) | O(n) |

---

## Follow-Up Questions

1. How would the algorithm adapt if each element had its own individual `k_i` range?
2. Can we retrieve the actual target value that yields the maximum frequency, not just the count?
3. What changes if the cost of modifying an element is proportional to the magnitude of the change rather than a fixed operation count?

---

## Key Takeaway

> By turning each element into an interval `[x‑k, x+k]` and sweeping across all interval boundaries, we can efficiently count how many elements can converge on any target value, then apply the operation budget to compute the maximal achievable frequency.
