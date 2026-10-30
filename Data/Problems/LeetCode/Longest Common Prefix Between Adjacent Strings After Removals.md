# 3598. Longest Common Prefix Between Adjacent Strings After Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals](https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals)
**Companies:** Amazon

---

## 1. Problem Description

You are given an array of strings `words`. For each index `i` in the range `[0, words.length - 1]`, perform the following steps:

- Remove the element at index `i` from the `words` array.
- Compute the **length** of the **longest common prefix** among all **adjacent** pairs in the modified array.

Return an array `answer`, where `answer[i]` is the length of the longest common prefix between the adjacent pairs after removing the element at index `i`. If **no** adjacent pairs remain or if **none** share a common prefix, then `answer[i]` should be 0.

**Constraints:**
- `1 <= words.length <= 10^5`
- `1 <= words[i].length <= 10^4`
- `words[i]` consists of lowercase English letters.
- The sum of `words[i].length` is smaller than or equal `10^5`.

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
Input: words = ["jump","run","run","jump","run"]
Output: [3,0,0,3,3]
Explanation: - Removing index 0:
- words becomes ["run", "run", "jump", "run"]
- Longest adjacent pair is ["run", "run"] having a common prefix "run" (length 3)
- Removing index 1:
- words becomes ["jump", "run", "jump", "run"]
- No adjacent pairs share a common prefix (length 0)
- Removing index 2:
- words becomes ["jump", "run", "jump", "run"]
- No adjacent pairs share a common prefix (length 0)
- Removing index 3:
- words becomes ["jump", "run", "run", "run"]
- Longest adjacent pair is ["run", "run"] having a common prefix "run" (length 3)
- Removing index 4:
- words becomes ["jump", "run", "run", "jump"]
- Longest adjacent pair is ["run", "run"] having a common prefix "run" (length 3)
```

**Example 2:**
```
Input: words = ["dog","racer","car"]
Output: [0,0,0]
Explanation: - Removing any index results in an answer of 0.
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
