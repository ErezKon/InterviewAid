# 3900. Longest Balanced Substring After One Swap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-after-one-swap](https://leetcode.com/problems/longest-balanced-substring-after-one-swap)
**Companies:** Google

---

## 1. Problem Description

Find the longest balanced substring (equal count of '0' and '1') achievable after swapping at most one pair of characters.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `"1100"` | `4` | Swapping the second `'1'` with the third `'0'` yields `"1010"`, which is fully balanced.
| `"1110"` | `2` | No swap can create a longer balanced substring than the existing `"10"`.

---

## 3. Approach

**Prefix Balance + Greedy**

```text
FUNCTION longestBalancedAfterSwap(s):
    SET n ← LENGTH(s)
    SET prefix ← ARRAY[0..n] INITIALIZED TO 0
    FOR i ← 1 TO n:
        SET delta ← IF s[i-1] = '1' THEN 1 ELSE -1
        SET prefix[i] ← prefix[i-1] + delta
    // Map first occurrence of each balance
    SET firstSeen ← EMPTY MAP
    SET maxLen ← 0
    FOR i ← 0 TO n:
        IF prefix[i] NOT IN firstSeen:
            SET firstSeen[prefix[i]] ← i
        // No swap case: balance 0
        IF prefix[i] = 0:
            SET maxLen ← MAX(maxLen, i)
        // One swap case: look for balance ±2
        IF (prefix[i] + 2) IN firstSeen:
            SET maxLen ← MAX(maxLen, i - firstSeen[prefix[i] + 2])
        IF (prefix[i] - 2) IN firstSeen:
            SET maxLen ← MAX(maxLen, i - firstSeen[prefix[i] - 2])
    RETURN maxLen
```

---

## 4. Walkthrough

Consider `s = "1100"`:

| i | char | delta | prefix[i] | firstSeen[prefix] |
|---|------|-------|-----------|-------------------|
|0| - | - | 0 | {0:0}
|1| 1 | +1 | 1 | {0:0,1:1}
|2| 1 | +1 | 2 | {0:0,1:1,2:2}
|3| 0 | -1 | 1 | (already seen)
|4| 0 | -1 | 0 | (balance 0 → length 4)

The algorithm also checks balances `±2` to account for a single swap, confirming the full length 4.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 6. Follow-Up Questions

1. How would the solution change if up to `k` swaps were allowed?
2. Can the same technique be applied to strings with more than two distinct characters?
3. What is the impact of allowing character deletions instead of swaps?

---

## 7. Key Takeaway

> A swap changes the balance by ±2. Look for longest subarray where prefix balance difference is 0 (no swap) or ±2 (one swap). Hash map of first occurrence of each balance.
