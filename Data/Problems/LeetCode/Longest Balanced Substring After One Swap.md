# 3900. Longest Balanced Substring After One Swap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-balanced-substring-after-one-swap](https://leetcode.com/problems/longest-balanced-substring-after-one-swap)
**Companies:** Google

---

## 1. Problem Description

You are given a binary string `s` consisting only of characters `'0'` and `'1'`.

A string is **balanced** if it contains an **equal** number of `'0'`s and `'1'`s.

You can perform **at most one** swap between any two characters in `s`. Then, you select a **balanced** substring from `s`.

Return an integer representing the **maximum** length of the **balanced** substring you can select.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s` consists only of the characters `'0'` and `'1'`.

---

## 2. Examples

**Example 1:**
```
Input: s = "100001"
Output: 4
Explanation: - Swap "100001". The string becomes "101000".
- Select the substring "101000", which is balanced because it has two '0's and two '1's.
```

**Example 2:**
```
Input: s = "111"
Output: 0
Explanation: - Choose not to perform any swaps.
- Select the empty substring, which is balanced because it has zero '0's and zero '1's.
```

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
