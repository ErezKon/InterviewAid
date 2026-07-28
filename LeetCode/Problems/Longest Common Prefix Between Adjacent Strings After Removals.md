# 3598. Longest Common Prefix Between Adjacent Strings After Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals](https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals)
**Companies:** Amazon

---

## 1. Problem Description

Given an array of strings, for each removal of one string, find the max LCP between any pair of adjacent strings in the resulting array.

---

## 2. Approach: Precompute Adjacent LCPs ✅

```
// Precompute lcp[i] = LCP(words[i], words[i+1]) for all adjacent pairs
// For each removal of words[j]:
//   New adjacent pairs: (j-1, j+1) replaces (j-1,j) and (j,j+1)
//   Compute LCP(words[j-1], words[j+1]) on the fly
//   Answer = max of all remaining lcp values
// Use prefix/suffix max for efficiency
```

| Time | Space |
|------|-------|
| O(n · L) where L = max string length | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: words = ["flower","flow","flight","flute"]
Output: [2,3,2]
Explanation:
- Remove "flower": remaining ["flow","flight","flute"], max LCP is between "flow" and "flight" → "fl" (length 2).
- Remove "flow": remaining ["flower","flight","flute"], max LCP is between "flower" and "flight" → "fl" (length 2).
- Remove "flight": remaining ["flower","flow","flute"], max LCP is between "flower" and "flow" → "flow" (length 4).
```

**Example 2:**
```
Input: words = ["abc","ab","a","abcd"]
Output: [2,2,3]
Explanation:
- Removing each element changes the adjacent pairs; the longest common prefix lengths are shown.
```

---

## 4. Walkthrough

| Step | Action | Resulting Adjacent Pairs | Max LCP |
|------|--------|--------------------------|---------|
| 1 | Precompute LCPs for original array | (flower,flow)=4, (flow,flight)=2, (flight,flute)=2 | 4 |
| 2 | Remove index 0 ("flower") | New pair (flow,flight)=2, (flight,flute)=2 | 2 |
| 3 | Remove index 2 ("flight") | New pair (flower,flow)=4, (flow,flute)=2 | 4 |
| ... | Continue for each removal | … | … |

The prefix‑max and suffix‑max arrays let us retrieve the maximum LCP among unchanged pairs in O(1), and we only recompute the LCP for the newly adjacent pair.

---

## 5. Complexity Analysis

- **Time:** O(n·L) to pre‑compute all adjacent LCPs, plus O(1) per removal query using prefix/suffix maxima.
- **Space:** O(n) for storing LCP values and the two auxiliary max arrays.

---

## 6. Follow‑Up Questions

- How would the solution change if we needed the **second** longest LCP after each removal?
- Can we extend the approach to handle **non‑adjacent** pairs efficiently?
- What if the strings are extremely long; can we use hashing to speed up LCP computation?

---

## Key Takeaway

> Precompute all adjacent LCPs. On removal, only two pairs change. Use prefix and suffix max arrays to query the max over remaining pairs in O(1).
