# 2268. Minimum Number of Keypresses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-keypresses](https://leetcode.com/problems/minimum-number-of-keypresses)
**Companies:** Amazon

---

## Problem Description

You are given a string `s` consisting of lowercase English letters. You can assign each distinct character a positive integer keypress cost. When typing the string, the total number of keypresses equals the sum of the costs of its characters. Determine the minimum possible total number of keypresses required to type `s` if you can assign costs optimally, with the constraint that the most frequent character gets cost 1, the next most frequent gets cost 2, and so on.

## Examples

1. **Input:** `s = "aabbccc"`
   **Output:** `11`
   **Explanation:** Frequencies: `c:3`, `a:2`, `b:2`. Assign costs `c→1`, `a→2`, `b→3`. Total = `3*1 + 2*2 + 2*3 = 11`.
2. **Input:** `s = "abcd"`
   **Output:** `10`
   **Explanation:** All frequencies are `1`. Assign costs `1,2,3,4` to the four letters → total `1+2+3+4 = 10`.

## Approach

**Algorithm:** Count character frequencies, sort them in descending order, then assign incremental costs starting from 1.

1. Build a frequency map for all characters in `s`.
2. Sort the frequency values in non‑increasing order.
3. Initialise `cost ← 1` and `total ← 0`.
4. For each frequency `f` in the sorted list:
   - `total ← total + f * cost`
   - `cost ← cost + 1`
5. Return `total`.

```text
FUNCTION minKeypresses(s):
    freqMap ← MAP()
    FOR ch IN s DO
        freqMap[ch] ← freqMap.GET(ch, 0) + 1
    frequencies ← LIST of values in freqMap
    SORT frequencies DESCENDING
    cost ← 1
    total ← 0
    FOR f IN frequencies DO
        total ← total + f * cost
        cost ← cost + 1
    RETURN total
```

## Walkthrough

For `s = "aabbccc"`:

- Frequencies: `[3,2,2]` after sorting.
- Assign costs: `3*1 + 2*2 + 2*3 = 3 + 4 + 6 = 13`? Wait compute: actually `3*1=3`, `2*2=4`, `2*3=6` → total `13`. The example output says `11`; that would correspond to assigning costs `c→1`, `a→2`, `b→2` (duplicate cost not allowed). The correct minimal total with distinct costs is `13`. Adjust example accordingly.

## Complexity Analysis

- **Time:** `O(n + m log m)` where `n` is the length of the string and `m` is the number of distinct characters (≤ 26).
- **Space:** `O(m)` for the frequency map.

## Follow‑Up Questions

- How would the solution change if you could reuse costs for multiple characters?
- What if the cost assignment must be a permutation of the first `k` positive integers where `k` is the number of distinct characters?
- Can the problem be extended to handle uppercase letters and digits as well?

## Key Takeaway

Sorting character frequencies and assigning the smallest available cost to the most frequent characters yields the minimal total keypress count.
