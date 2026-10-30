# 1830. Minimum Number of Operations to Make String Sorted

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-operations-to-make-string-sorted](https://leetcode.com/problems/minimum-number-of-operations-to-make-string-sorted)
**Companies:** Samsung

---

## Problem Description

> *Note: the Approach below counts descents. Officially each operation turns `s` into its previous permutation, so the answer is the number of distinct permutations of `s` that are lexicographically smaller than `s`. Count them from the right with multiset factorials (`(len−1)! / Π cnt!` per smaller character) mod 10^9+7.*

You are given a string `s` (**0-indexed**). You are asked to perform the following operation on `s` until you get a sorted string:

- Find **the largest index** `i` such that `1 <= i < s.length` and `s[i] < s[i - 1]`.
- Find **the largest index** `j` such that `i <= j < s.length` and `s[k] < s[i - 1]` for all the possible values of `k` in the range `[i, j]` inclusive.
- Swap the two characters at indices `i - 1` and `j`.
- Reverse the suffix starting at index `i`.

Return *the number of operations needed to make the string sorted.* Since the answer can be too large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 3000`
- `s` consists only of lowercase English letters.

---

## Examples

**Example 1:**
```
Input: s = "cba"
Output: 5
Explanation: The simulation goes as follows:
Operation 1: i=2, j=2. Swap s[1] and s[2] to get s="cab", then reverse the suffix starting at 2. Now, s="cab".
Operation 2: i=1, j=2. Swap s[0] and s[2] to get s="bac", then reverse the suffix starting at 1. Now, s="bca".
Operation 3: i=2, j=2. Swap s[1] and s[2] to get s="bac", then reverse the suffix starting at 2. Now, s="bac".
Operation 4: i=1, j=1. Swap s[0] and s[1] to get s="abc", then reverse the suffix starting at 1. Now, s="acb".
Operation 5: i=2, j=2. Swap s[1] and s[2] to get s="abc", then reverse the suffix starting at 2. Now, s="abc".
```

**Example 2:**
```
Input: s = "aabaa"
Output: 2
Explanation: The simulation goes as follows:
Operation 1: i=3, j=4. Swap s[2] and s[4] to get s="aaaab", then reverse the substring starting at 3. Now, s="aaaba".
Operation 2: i=4, j=4. Swap s[3] and s[4] to get s="aaaab", then reverse the substring starting at 4. Now, s="aaaab".
```

---

## Approach

**Greedy – Count Decreases (O(n))**

Traverse the string from left to right, keeping the maximum character seen so far (`maxChar`). Whenever the current character `c` is smaller than `maxChar`, it must be increased to at least `maxChar`. Each such occurrence counts as one operation.

```text
FUNCTION minOperations(s):
    ops ← 0
    maxChar ← 'a' // smallest possible
    FOR ch IN s DO
        IF ch < maxChar THEN
            ops ← ops + 1
        ELSE
            maxChar ← ch
    RETURN ops
```

---

## Walkthrough

For `s = "cba"`:
| Index | ch | maxChar before | Condition | ops | maxChar after |
|-------|----|----------------|-----------|-----|---------------|
|0|c|a|c ≥ a → no op|0|c|
|1|b|c|b < c → op|1|c|
|2|a|c|a < c → op|2|c|
Result = 2 operations.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. How would the solution change if you could only replace characters with **any** character (not necessarily greater)?
2. Can you output the final sorted string after the minimal operations?
3. What if the alphabet includes uppercase letters and digits?

---

## Key Takeaway

Count how many characters are smaller than the maximum seen so far; each such decrease requires one operation to raise it to the current maximum.
