# 1946. Largest Number After Mutating Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-number-after-mutating-substring](https://leetcode.com/problems/largest-number-after-mutating-substring)
**Companies:** Infosys

---

## 1. Problem Description

Given a numeric string `num` and an array `change` of length 10 where `change[d]` gives the digit to replace `d` with, you may select at most one contiguous substring of `num` and replace each digit `d` in that substring with `change[d]`. Return the maximum possible number as a string.

---

## 2. Approach: Greedy — O(n) ✅

```text
FUNCTION maximumNumber(num, change):
    // Convert to mutable list of characters
    arr ← LIST_OF_CHARACTERS(num)
    started ← FALSE
    FOR i ← 0 TO LENGTH(arr) - 1:
        d ← INTEGER(arr[i])
        IF change[d] > d:
            // Begin or continue mutation
            arr[i] ← STRING(change[d])
            started ← TRUE
        ELSE IF change[d] < d AND started:
            // Mutation would decrease value, stop
            BREAK
        // If change[d] == d, keep as is (mutation optional)
    RETURN JOIN(arr)
```

---

## Examples

| num | change (partial) | output |
|-----|------------------|--------|
| "123456" | [0,1,2,3,4,5,6,7,8,9] | "123456" |
| "123456" | [0,5,2,3,4,5,6,7,8,9] | "523456" |
| "999" | [9,9,9,9,9,9,9,9,9,9] | "999" |

*Explanation*: In the second example, the first digit `1` can be changed to `5` (since `change[1]=5`). After that, the next digits do not improve the number, so mutation stops, yielding `523456`.

---

## Walkthrough

Take `num = "123456"` and `change = [0,5,2,3,4,5,6,7,8,9]`:
1. Convert to list → `["1","2","3","4","5","6"]`.
2. Index 0: `d=1`, `change[1]=5` > 1 → replace → `"5"`, `started=TRUE`.
3. Index 1: `d=2`, `change[2]=2` = 2 → keep.
4. Index 2: `d=3`, `change[3]=3` = 3 → keep.
5. Index 3: `d=4`, `change[4]=4` = 4 → keep.
6. Index 4: `d=5`, `change[5]=5` = 5 → keep.
7. Index 5: `d=6`, `change[6]=6` = 6 → keep.
8. No further improvement possible, stop.
9. Join list → `"523456"`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) – single pass through the string | O(n) – storing character list |

---

## Follow-Up Questions

1. How would you modify the algorithm to allow multiple non‑overlapping substrings to be mutated?
2. Can the solution be adapted to work with very large numbers where storing the entire string is infeasible?
3. What changes are needed if `change[d]` could be smaller than `d` and you still want the maximum result?

---

## Key Takeaway

> Start mutating at the first digit where the replacement is larger, continue while replacements do not decrease the value, and stop at the first detrimental digit.
