# 1946. Largest Number After Mutating Substring

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-number-after-mutating-substring](https://leetcode.com/problems/largest-number-after-mutating-substring)
**Companies:** Infosys

---

## 1. Problem Description

You are given a string `num`, which represents a large integer. You are also given a **0-indexed** integer array `change` of length `10` that maps each digit `0-9` to another digit. More formally, digit `d` maps to digit `change[d]`.

You may **choose** to **mutate a single substring** of `num`. To mutate a substring, replace each digit `num[i]` with the digit it maps to in `change` (i.e. replace `num[i]` with `change[num[i]]`).

Return *a string representing the **largest** possible integer after **mutating** (or choosing not to) a **single substring** of* `num`.

A **substring** is a contiguous sequence of characters within the string.

**Constraints:**
- `1 <= num.length <= 10^5`
- `num` consists of only digits `0-9`.
- `change.length == 10`
- `0 <= change[d] <= 9`

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

```
Example 1:
  Input: num = "132", change = [9,8,5,0,3,6,4,2,6,8]
  Output: "832"
  Explanation: Replace the substring "1":
  - 1 maps to change[1] = 8.
  Thus, "132" becomes "832".
  "832" is the largest number that can be created, so return it.
```

```
Example 2:
  Input: num = "021", change = [9,4,3,5,7,2,1,9,0,6]
  Output: "934"
  Explanation: Replace the substring "021":
  - 0 maps to change[0] = 9.
  - 2 maps to change[2] = 3.
  - 1 maps to change[1] = 4.
  Thus, "021" becomes "934".
  "934" is the largest number that can be created, so return it.
```

```
Example 3:
  Input: num = "5", change = [1,4,7,5,3,2,5,6,9,4]
  Output: "5"
  Explanation: "5" is already the largest number that can be created, so return it.
```

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
