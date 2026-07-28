# 1850. Minimum Adjacent Swaps to Reach the Kth Smallest Number

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number](https://leetcode.com/problems/minimum-adjacent-swaps-to-reach-the-kth-smallest-number)
**Companies:** Google, Meta

---

## Problem Description

You are given a numeric string `num` and an integer `k`. Starting from `num`, apply the **next permutation** operation exactly `k` times to obtain a target string. Return the minimum number of adjacent swaps required to transform the original string into this target string.

Constraints:
- `1 <= num.length <= 1000`
- `num` consists of digits `'0'`‑`'9'`.
- `1 <= k <= 1000`

---

## Examples

**Example 1:**
```
Input: num = "5489355142", k = 4
Output: 2
Explanation: After 4 next‑permutations the target is "5489355421". Only two adjacent swaps are needed to reach it.
```

**Example 2:**
```
Input: num = "11112", k = 4
Output: 4
Explanation: The target after 4 permutations is "21111". Four swaps move the leading `2` to the front.
```

---

## Approach

**Algorithm:**
1. **Generate target permutation** – repeatedly apply the standard next‑permutation algorithm `k` times on a mutable copy of `num`.
2. **Count swaps** – iterate over the original string, and for each position where the character differs from the target, locate the matching character later in the original, then bubble it leftwards using adjacent swaps (greedy).

Both steps are straightforward and run in polynomial time.

Pseudocode:
```text
FUNCTION minAdjSwapsToKth(num, k):
    // step 1: compute target permutation
    original ← LIST(num)
    target ← LIST(num)
    REPEAT k TIMES:
        // next permutation on target
        i ← LEN(target) - 2
        WHILE i >= 0 AND target[i] >= target[i+1] DO i ← i - 1
        IF i < 0 THEN REVERSE(target)   // wrap around
        ELSE
            j ← LEN(target) - 1
            WHILE target[j] <= target[i] DO j ← j - 1
            SWAP(target[i], target[j])
            REVERSE_SUBARRAY(target, i+1, END)
    // step 2: count adjacent swaps
    swaps ← 0
    FOR pos ← 0 TO LEN(original)-1 DO
        IF original[pos] = target[pos] THEN CONTINUE
        // find the needed character later in original
        nxt ← pos + 1
        WHILE original[nxt] ≠ target[pos] DO nxt ← nxt + 1
        // bubble it leftwards
        WHILE nxt > pos DO
            SWAP(original[nxt], original[nxt-1])
            nxt ← nxt - 1
            swaps ← swaps + 1
    RETURN swaps
```
---

## Walkthrough

For `num = "5489355142"`, `k = 4`:
1. After four next‑permutations the target becomes `"5489355421"`.
2. Scanning from the left, the first mismatch occurs at index 7 (`original[7] = '1'`, `target[7] = '4'`).
3. Locate `'4'` at index 9, bubble it left two positions → two swaps total.
---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Generate + greedy swaps | O(k·n + n²) in worst case | O(n) |
---

## Follow‑Up Questions

1. Can the swap counting be improved to O(n log n) using a Fenwick tree to track moved positions?
2. How would the solution change if swaps could be performed between any two positions (not just adjacent)?
3. What if the digits were allowed to repeat many times – does the greedy bubble still produce the optimal count?
---

## Key Takeaway

> Generate the k‑th permutation, then greedily bubble each needed character into place; the total number of adjacent swaps equals the sum of distances each character moves.
