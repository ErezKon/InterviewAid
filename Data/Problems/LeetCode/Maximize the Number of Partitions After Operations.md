# 3003. Maximize the Number of Partitions After Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations](https://leetcode.com/problems/maximize-the-number-of-partitions-after-operations)
**Companies:** Hilabs, Thoughtworks

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Prefix/Suffix Bitmask — O(26n)](#approach-prefixsuffix-bitmask--o26n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string `s` and an integer `k`.

First, you are allowed to change **at most** **one** index in `s` to another lowercase English letter.

After that, do the following partitioning operation until `s` is **empty**:

- Choose the **longest** **prefix** of `s` containing at most `k` **distinct** characters.
- **Delete** the prefix from `s` and increase the number of partitions by one. The remaining characters (if any) in `s` maintain their initial order.

Return an integer denoting the **maximum** number of resulting partitions after the operations by optimally choosing at most one index to change.

**Constraints:**
- `1 <= s.length <= 10^4`
- `s` consists only of lowercase English letters.
- `1 <= k <= 26`

---

## Examples

**Example 1:**
```
Input: s = "accca", k = 2
Output: 3
Explanation: The optimal way is to change s[2] to something other than a and c, for example, b. then it becomes "acbca".
Then we perform the operations:
- The longest prefix containing at most 2 distinct characters is "ac", we remove it and s becomes "bca".
- Now The longest prefix containing at most 2 distinct characters is "bc", so we remove it and s becomes "a".
- Finally, we remove "a" and s becomes empty, so the procedure ends.
Doing the operations, the string is divided into 3 partitions, so the answer is 3.
```

**Example 2:**
```
Input: s = "aabaab", k = 3
Output: 1
Explanation: Initially s contains 2 distinct characters, so whichever character we change, it will contain at most 3 distinct characters, so the longest prefix with at most 3 distinct characters would always be all of it, therefore the answer is 1.
```

**Example 3:**
```
Input: s = "xxyz", k = 1
Output: 4
Explanation: The optimal way is to change s[0] or s[1] to something other than characters in s, for example, to change s[0] to w.
Then s becomes "wxyz", which consists of 4 distinct characters, so as k is 1, it will divide into 4 partitions.
```

---

## Key Insight

> Without any change, greedily partition left-to-right. With one change, try changing each position to each of the 26 letters and see which change maximizes partitions. Optimize with prefix and suffix partition counts: precompute partition counts from the left and right, then for each change position, combine.

---

## Approach: Prefix/Suffix Bitmask — O(26n) ✅

```text
FUNCTION maxPartitions(s, k):
    // Precompute prefix partition count and state
    // Precompute suffix partition count and state
    // For each position i, try changing s[i] to each char
    //   Combine prefix[0..i-1] + adjusted partition at i + suffix[i+1..n-1]
    
    baseline = greedyPartition(s, k)
    best = baseline
    FOR i ← 0 TO n - 1:
        FOR c ← 'a' TO 'z':
            IF c == s[i]: CONTINUE
            modified = s with s[i] = c
            best = MAX(best, greedyPartition(modified, k))
    RETURN best
```

Optimized to O(26n) using precomputed prefix/suffix states with bitmasks tracking distinct characters.

---

## Walkthrough

Consider `s = "abac"`, `k = 2`.
1. **Baseline greedy partition** (no change):
   - Start with empty set, add `'a'` → `{a}`.
   - Add `'b'` → `{a,b}` (still ≤2).
   - Add `'a'` → `{a,b}` (still ≤2).
   - Add `'c'` would exceed distinct count, so cut partition before `'c'`.
   - Resulting partitions: `"aba"`, `"c"` → 2 partitions.
2. **Enumerate change at position 2 (`'a'`) to `'b'`** → string becomes `"abbc"`.
   - Greedy scan: `'a'` → `{a}`; `'b'` → `{a,b}`; next `'b'` keeps `{a,b}`; `'c'` would exceed, cut.
   - Partitions: `"ab"`, `"b"`, `"c"` → 3 partitions.
3. This is the maximum achievable, so answer is 3.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Prefix/suffix + enumerate changes | **O(26n)** | O(n) |

---

## Follow-Up Questions

- How would the solution change if you could modify up to **two** characters?
- Can the algorithm be adapted for a streaming setting where the string is received character by character?
- What if the cost of changing a character varies and you have a budget for total change cost?

---

## Key Takeaway

> **"Change one character to maximize partitions" = precompute prefix/suffix partition states and enumerate all single-character changes.** Bitmasks of distinct characters enable efficient state tracking.
