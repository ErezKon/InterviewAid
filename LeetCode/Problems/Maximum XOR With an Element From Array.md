# 1707. Maximum XOR With an Element From Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-xor-with-an-element-from-array](https://leetcode.com/problems/maximum-xor-with-an-element-from-array)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and queries `[x_i, m_i]`, for each query find the maximum `x_i XOR nums[j]` where `nums[j] ≤ m_i`. If no such element exists, return `-1`.

**Constraints:**
- `1 ≤ nums.length, queries.length ≤ 10⁵`
- `0 ≤ nums[j], x_i, m_i ≤ 10⁹`

---

## Examples

**Example 1:**
```
Input:  nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
Output: [3, 3, 7]
Explanation:
  Query [3,1]: elements ≤ 1 are {0,1}. 3^0=3, 3^1=2. Max=3.
  Query [1,3]: elements ≤ 3 are {0,1,2,3}. 1^3=2, 1^2=3. Max=3.
  Query [5,6]: all elements qualify. 5^4=1, 5^3=6, 5^2=7. Max=7.
```

---

## Key Insight

> Sort `nums` and sort queries by `m_i`. Process queries in order of increasing `m_i`, progressively inserting elements into a **binary trie**. For each query, all valid elements (≤ m_i) are already in the trie, enabling greedy max-XOR lookup.

---

## Approach

```
FUNCTION maximizeXor(nums, queries):
    SORT nums
    // Attach original indices to queries, then sort by m_i
    sortedQueries ← [(x, m, originalIndex) for each query], SORTED BY m
    
    result ← ARRAY[LEN(queries)] filled with -1
    trie ← new BinaryTrie()
    j ← 0
    
    FOR (x, m, idx) IN sortedQueries DO
        // Insert all nums ≤ m into trie
        WHILE j < LEN(nums) AND nums[j] ≤ m DO
            trie.INSERT(nums[j])
            j ← j + 1
        
        // Query trie for max XOR with x
        IF trie IS NOT EMPTY THEN
            result[idx] ← trie.maxXorWith(x)
    
    RETURN result
```

---

## Walkthrough

```
nums = [0,1,2,3,4] (already sorted)
queries sorted by m: [[3,1,0], [1,3,1], [5,6,2]]

Query [3,1,0]: insert 0,1 into trie. maxXor(3) → 3^0=3. result[0]=3
Query [1,3,1]: insert 2,3.           maxXor(1) → 1^2=3. result[1]=3  
Query [5,6,2]: insert 4.             maxXor(5) → 5^2=7. result[2]=7

Return [3, 3, 7] ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Offline sort + Trie | **O((n + q) · 30)** | **O(n · 30)** |

Where 30 = number of bits.

---

## Follow-Up Questions

1. **Why offline processing?** Sorting queries by `m_i` lets us incrementally build the trie, avoiding rebuilding for each query.
2. **Can we answer queries online?** Yes, with a persistent trie or by storing sorted elements and using binary search + trie per prefix — but more complex.
3. **What if we want minimum XOR instead?** Same trie structure, but greedily choose the **same** bit (not opposite) at each level.

---

## Key Takeaway

> **Offline queries + sorted insertion into a binary trie** — sort queries by constraint, progressively build the trie, and answer each query with an O(30) greedy traversal.

---
