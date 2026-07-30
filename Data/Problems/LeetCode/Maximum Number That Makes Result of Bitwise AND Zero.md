# 3125. Maximum Number That Makes Result of Bitwise AND Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-that-makes-result-of-bitwise-and-zero](https://leetcode.com/problems/maximum-number-that-makes-result-of-bitwise-and-zero)
**Companies:** Salesforce

---

## Problem Description
Given an integer array `nums`, you may remove any number of elements (possibly none). After removal, compute the bitwise AND of the remaining elements. Return the maximum possible size of the remaining array such that the resulting AND equals `0`. If it is impossible to achieve an AND of `0`, return `0`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[1,2,3]` | `3` | `1 & 2 & 3 = 0`, so all three can be kept. |
| `[4,5,6]` | `2` | Removing `4` leaves `[5,6]` with `5 & 6 = 4` (not zero). Keeping `[4,5]` gives `4 & 5 = 4`. The best we can do is keep any two numbers that include `6` and `5`? Actually `[4,6]` gives `4 & 6 = 4`. No pair yields `0`, so the maximum size is `1` (any single element). |
| `[0,7,8]` | `3` | Presence of `0` forces the AND to `0` regardless of other numbers.

## Approach
The bitwise AND of a set is `0` iff for every bit position there exists at least one element with that bit cleared. Therefore, we need to select the largest subset where the union of zero‑bits covers all 32 (or 64) bit positions.

A greedy strategy works:
1. Count for each bit how many numbers have that bit set.
2. Any number that has a unique set bit (i.e., that bit count is `1`) is **essential** for achieving a non‑zero AND; removing it may help reach `0`.
3. Remove all numbers that are *necessary* to keep a set bit; the remaining numbers form the maximal subset with AND `0`.

Implementation steps:
- Compute `bitCount[0..31]` for the whole array.
- Initialize `removable = []`.
- For each number `x`:
    - If for every bit where `x` has a `1`, `bitCount[bit] > 1`, then `x` can be removed without making any bit become uniquely set.
    - Otherwise, keep `x`.
- The answer is the size of the kept set.

```text
FUNCTION maxSubsetSizeZeroAND(nums):
    // Step 1: count set bits
    bitCount ← ARRAY[32] INITIALIZED TO 0
    FOR num IN nums:
        FOR b FROM 0 TO 31:
            IF (num >> b) & 1 = 1:
                bitCount[b] ← bitCount[b] + 1
    // Step 2: determine keepable numbers
    keep ← 0
    FOR num IN nums:
        canRemove ← TRUE
        FOR b FROM 0 TO 31:
            IF (num >> b) & 1 = 1 AND bitCount[b] = 1:
                canRemove ← FALSE
                BREAK
        IF NOT canRemove:
            keep ← keep + 1
    RETURN keep
```
If the array contains a `0`, the answer is the full length because the AND is already `0`.

## Walkthrough
For `[1,2,3]` (binary `01,10,11`):
- Bit counts: bit0 → 2 (1 and 3), bit1 → 2 (2 and 3).
- No number has a uniquely set bit, so all three are kept → answer `3`.
For `[4,5,6]` (`100,101,110`):
- Bit2 count = 3, bit0 count = 1 (only 5), bit1 count = 2 (6 and 5).
- Number `5` has a unique bit0, so it must be kept. After keeping `5`, the AND of any larger subset still has bit0 set, preventing zero. The maximal zero‑AND subset is just `[0]` if present, otherwise size `1`.

## Complexity Analysis
*Time*: **O(n·B)** where `B` is the number of bits (constant 32/64). → effectively **O(n)**.
*Space*: **O(B)** for the bit counters.

## Follow‑Up Questions
1. How would the solution change if numbers are up to `10^9` (still 32 bits) but you need to output the actual subset?
2. Can you extend the approach to achieve a target AND value `k` instead of `0`?
3. What is the complexity if the array length is up to `10^5` and you must handle updates (add/remove numbers) dynamically?

## Key Takeaway
Achieving an AND of zero requires that every bit be cleared by at least one element; counting set bits lets you identify indispensable numbers and compute the largest feasible subset in linear time.
