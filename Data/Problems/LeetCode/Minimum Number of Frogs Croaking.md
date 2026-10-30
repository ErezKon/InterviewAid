# 1419. Minimum Number of Frogs Croaking

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-frogs-croaking](https://leetcode.com/problems/minimum-number-of-frogs-croaking)
**Companies:** Roblox, Zoox

---

## Problem Description

You are given the string `croakOfFrogs`, which represents a combination of the string `"croak"` from different frogs, that is, multiple frogs can croak at the same time, so multiple `"croak"` are mixed.

*Return the minimum number of *different* frogs to finish all the croaks in the given string.*

A valid `"croak"` means a frog is printing five letters `'c'`, `'r'`, `'o'`, `'a'`, and `'k'` **sequentially**. The frogs have to print all five letters to finish a croak. If the given string is not a combination of a valid `"croak"` return `-1`.

**Constraints:**
- `1 <= croakOfFrogs.length <= 10^5`
- `croakOfFrogs` is either `'c'`, `'r'`, `'o'`, `'a'`, or `'k'`.

## Examples

**Example 1:**
```
Input: croakOfFrogs = "croakcroak"
Output: 1
Explanation: One frog yelling "croak" twice.
```

**Example 2:**
```
Input: croakOfFrogs = "crcoakroak"
Output: 2
Explanation: The minimum number of frogs is two.
The first frog could yell "crcoakroak".
The second frog could yell later "crcoakroak".
```

**Example 3:**
```
Input: croakOfFrogs = "croakcrook"
Output: -1
Explanation: The given string is an invalid combination of "croak" from different frogs.
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

**Example 1:**
```
Input: croakOfFrogs = "croakcroak"
Output: 1
Explanation: One frog yelling "croak" twice.
```

**Example 2:**
```
Input: croakOfFrogs = "crcoakroak"
Output: 2
Explanation: The minimum number of frogs is two.
The first frog could yell "crcoakroak".
The second frog could yell later "crcoakroak".
```

**Example 3:**
```
Input: croakOfFrogs = "croakcrook"
Output: -1
Explanation: The given string is an invalid combination of "croak" from different frogs.
```

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
