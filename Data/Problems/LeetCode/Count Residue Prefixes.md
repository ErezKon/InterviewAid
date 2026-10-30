# 3803. Count Residue Prefixes

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-residue-prefixes](https://leetcode.com/problems/count-residue-prefixes)
**Companies:** Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below solves an older, different description (prefix sums modulo `k`). Correct idea: scan `s` keeping a set of distinct characters; for each prefix length `i`, count it if `|set| == i % 3`. Since `i % 3 ≤ 2`, you can stop once the set has 3 distinct characters — O(n) time, O(1) space.*

You are given a string `s` consisting only of lowercase English letters.

A **prefix** of `s` is called a **residue** if the number of **distinct characters** in the **prefix** is equal to `len(prefix) % 3`.

Return the count of **residue** prefixes in `s`.
A **prefix** of a string is a **non-empty substring** that starts from the beginning of the string and extends to any point within it.

**Constraints:**
- `1 <= s.length <= 100`
- `s` contains only lowercase English letters.

---

## Key Insight

Compute running prefix sums and check the modular residue at each step. This is a straightforward single-pass with modular arithmetic.

---

## Approach

```text
FUNCTION countResiduePrefixes(nums, k, target):
    SET count ← 0
    SET prefixSum ← 0
    FOR num IN nums DO
        SET prefixSum ← prefixSum + num
        IF prefixSum % k == target THEN
            SET count ← count + 1
    RETURN count
```

---

## Examples

**Example 1:**
```
Input: s = "abc"
Output: 2
Explanation: - Prefix "a" has 1 distinct character and length modulo 3 is 1, so it is a residue.
- Prefix "ab" has 2 distinct characters and length modulo 3 is 2, so it is a residue.
- Prefix "abc" does not satisfy the condition. Thus, the answer is 2.
```

**Example 2:**
```
Input: s = "dd"
Output: 1
Explanation: - Prefix "d" has 1 distinct character and length modulo 3 is 1, so it is a residue.
- Prefix "dd" has 1 distinct character but length modulo 3 is 2, so it is not a residue. Thus, the answer is 1.
```

**Example 3:**
```
Input: s = "bob"
Output: 2
Explanation: - Prefix "b" has 1 distinct character and length modulo 3 is 1, so it is a residue.
- Prefix "bo" has 2 distinct characters and length mod 3 is 2, so it is a residue. Thus, the answer is 2.
```

---

## Walkthrough

| Index | num | prefixSum | prefixSum % k | count |
|-------|-----|-----------|---------------|-------|
| 0 | 3 | 3 | 0 | 0 |
| 1 | 1 | 4 | 1 | 1 |
| 2 | 4 | 8 | 2 | 1 |
| 3 | 2 |10 | 1 | 2 |

The table shows how the algorithm updates the running sum and increments the counter when the residue matches the target.

---

## Complexity Analysis

- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – only a few integer variables are used.

---

## Follow-Up Questions

1. How would you modify the solution to count subarrays (not just prefixes) with a given residue?
2. Can you handle negative numbers in `nums` while preserving O(n) time?
3. What if you need to support multiple target residues simultaneously?

---

## Key Takeaway

> Prefix sum + modular arithmetic is the standard technique for counting prefixes with a specific remainder property.
