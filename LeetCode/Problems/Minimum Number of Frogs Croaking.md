# 1419. Minimum Number of Frogs Croaking

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-frogs-croaking](https://leetcode.com/problems/minimum-number-of-frogs-croaking)
**Companies:** Roblox, Zoox

---

## Problem Description

You are given a string `croakOfFrogs` that represents the sequence of sounds made by a group of frogs. Each frog must croak the characters in the exact order `"c" → "r" → "o" → "a" → "k"`. Multiple frogs can croak simultaneously, and their sounds may interleave. Return the minimum number of frogs that must be present to produce the given sequence. If the sequence is invalid (cannot be formed by any combination of frogs), return `-1`.

Constraints:
- `1 ≤ croakOfFrogs.length ≤ 10^5`
- `croakOfFrogs` consists only of the characters `'c', 'r', 'o', 'a', 'k'`.

## Examples

**Example 1**
```
Input: croakOfFrogs = "croakcroak"
Output: 1
Explanation: One frog can croak twice sequentially.
```

**Example 2**
```
Input: croakOfFrogs = "crcoakroak"
Output: 2
Explanation: Two frogs are needed; their croaks interleave.
```

## Approach

**Algorithm:** Greedy counting of active croaks

Maintain counters for each stage of the croak (`c`, `r`, `o`, `a`). When a `'c'` is seen, a new frog starts (or an idle frog becomes active). For each subsequent character, move a frog from the previous stage to the current stage. When a `'k'` is encountered, a frog finishes its croak and becomes idle again.

The maximum number of frogs simultaneously in the middle of a croak (i.e., the sum of counters for `c`, `r`, `o`, `a`) is the answer.
If at any point a character appears without a frog in the required previous stage, the sequence is invalid.

```text
FUNCTION minNumberOfFrogs(croak):
    // stage counters
    c ← r ← o ← a ← 0
    maxFrogs ← 0
    FOR ch IN croak DO
        IF ch = 'c' THEN
            c ← c + 1
        ELSE IF ch = 'r' THEN
            IF c = 0 THEN RETURN -1 END IF
            c ← c - 1; r ← r + 1
        ELSE IF ch = 'o' THEN
            IF r = 0 THEN RETURN -1 END IF
            r ← r - 1; o ← o + 1
        ELSE IF ch = 'a' THEN
            IF o = 0 THEN RETURN -1 END IF
            o ← o - 1; a ← a + 1
        ELSE IF ch = 'k' THEN
            IF a = 0 THEN RETURN -1 END IF
            a ← a - 1
            // frog finishes, becomes idle; update max
            maxFrogs ← MAX(maxFrogs, c + r + o + a + 1) // +1 for the finishing frog
        END IF
    END FOR
    // after processing, all stage counters must be zero
    IF c + r + o + a ≠ 0 THEN RETURN -1 END IF
    RETURN maxFrogs
```

## Walkthrough (Example 2)

| Char | c | r | o | a | Active frogs (c+r+o+a) | maxFrogs |
|------|---|---|---|---|-----------------------|----------|
| c    | 1 | 0 | 0 | 0 | 1 | 1 |
| r    | 0 | 1 | 0 | 0 | 1 | 1 |
| c    | 1 | 1 | 0 | 0 | 2 | 2 |
| o    | 1 | 0 | 1 | 0 | 2 | 2 |
| a    | 1 | 0 | 0 | 1 | 2 | 2 |
| k    | 1 | 0 | 0 | 0 | 1 | 2 |
| r    | 0 | 1 | 0 | 0 | 1 | 2 |
| o    | 0 | 0 | 1 | 0 | 1 | 2 |
| a    | 0 | 0 | 0 | 1 | 1 | 2 |
| k    | 0 | 0 | 0 | 0 | 0 | 2 |
The maximum simultaneous active frogs is 2.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n)** – single pass over the string |
| Space  | **O(1)** – constant counters |

## Follow‑Up Questions

1. How would the algorithm change if the croak order could be any permutation of the five letters?
2. Can we extend the solution to report the exact time intervals during which each frog is active?
3. What if each frog has a cooldown period before it can start a new croak?

## Key Takeaway

By tracking how many frogs are at each stage of the required `c→r→o→a→k` sequence and taking the peak number of concurrent active frogs, we obtain the minimal number of frogs needed, with invalid sequences detected instantly.
